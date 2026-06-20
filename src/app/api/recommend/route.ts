import { NextRequest, NextResponse } from "next/server";
import { DbService } from "@/services/dbService";

export async function POST(req: NextRequest) {
  try {
    const { query, role, category, userId, history, isVoice } = await req.json();

    if (!query) {
      return NextResponse.json({ success: false, error: "Query is required." }, { status: 400 });
    }

    // 1. Fetch Candidates from Database
    const allTools = await DbService.getTools({ category: category || null });

    // 2. Score and Rank Tools Programmatically
    const scoredTools = allTools.map((tool) => {
      let score = 0;
      const q = query.toLowerCase();

      // A. Semantic Match (max 40 pts)
      if (tool.name.toLowerCase() === q) {
        score += 40;
      } else if (
        tool.use_cases.some((u) => u.toLowerCase().includes(q)) ||
        tool.pros.some((p) => p.toLowerCase().includes(q))
      ) {
        score += 30;
      } else if (tool.description.toLowerCase().includes(q)) {
        score += 25;
      } else {
        score += 5;
      }

      // B. Role Match (max 30 pts)
      if (role && tool.best_for_role.some((r) => r.toLowerCase() === role.toLowerCase())) {
        score += 30;
      } else {
        score += 5;
      }

      // C. Category Match (max 20 pts)
      if (
        (category && tool.category?.toLowerCase() === category.toLowerCase()) ||
        (tool.category && q.includes(tool.category.toLowerCase()))
      ) {
        score += 20;
      } else {
        score += 5;
      }

      // D. Popularity Weight (max 10 pts)
      score += (tool.popularity_score / 100) * 10;

      return { tool, score };
    });

    const sortedCandidates = scoredTools
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const candidatesList = sortedCandidates.map((c) => c.tool);

    if (candidatesList.length === 0) {
      return NextResponse.json({ success: true, recommendations: [] });
    }

    // 3. OpenRouter / Nemotron AI Layer
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "OPENROUTER_API_KEY is not configured in the environment." },
        { status: 500 }
      );
    }

    const formattedCandidates = candidatesList.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      category: c.category,
      pricing: c.pricing_model,
      use_cases: c.use_cases,
      pros: c.pros,
    }));

    // Voice queries slice to max 3 recommendations, text slices to 5
    const limit = isVoice ? 3 : 5;

    const systemPrompt = `You are AI-Dicto. You are an AI tool recommender.
Only recommend tools provided in the candidate list. Never invent tools. Never search the internet.
Return exactly ${limit} recommendations in JSON format. Do not write any explanations before or after the JSON.
Return a valid JSON array of objects, each containing:
- "tool": (string) Exact name of the tool from the candidate list
- "why_it_fits": (string) Practical, concise explanation (max 120 chars) of why this fits the user's goal. Do not use marketing hype or buzzwords.
- "best_use_case": (string) Single specific use case from the tool's use cases list
- "confidence": (number) Confidence score from 0-100 based on fit`;

    const userPrompt = `User Goal: "${query}"
Active User Role: "${role || "None"}"
Selected Category Context: "${category || "None"}"

Candidate Tools List:
${JSON.stringify(formattedCandidates, null, 2)}`;

    const openrouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-4-340b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
      }),
    });

    if (!openrouterResponse.ok) {
      throw new Error(`OpenRouter returned status ${openrouterResponse.status}`);
    }

    const aiResult = await openrouterResponse.json();
    const content = aiResult.choices?.[0]?.message?.content || "";

    let parsedRecommendations: any[] = [];
    const jsonStart = content.indexOf("[");
    const jsonEnd = content.lastIndexOf("]") + 1;
    if (jsonStart !== -1 && jsonEnd !== -1) {
      parsedRecommendations = JSON.parse(content.substring(jsonStart, jsonEnd));
    } else {
      parsedRecommendations = JSON.parse(content);
    }

    const validatedRecs = parsedRecommendations
      .map((item: any) => {
        const matchedTool = candidatesList.find(
          (c) => c.name.toLowerCase() === item.tool.toLowerCase()
        );
        if (!matchedTool) return null;

        return {
          tool: matchedTool.name,
          why_it_fits: item.why_it_fits,
          best_use_case: item.best_use_case,
          confidence: item.confidence,
          details: matchedTool,
        };
      })
      .filter((item) => item !== null)
      .slice(0, limit);

    if (validatedRecs.length === 0) {
      throw new Error("No validated recommendations found from AI parser.");
    }

    // 4. Log the conversation & logs to Supabase
    const conversationId = await DbService.logConversation(
      userId,
      query,
      { text: content },
      validatedRecs.map((v: any) => v.details.id)
    );

    for (let i = 0; i < validatedRecs.length; i++) {
      const rec: any = validatedRecs[i];
      await DbService.logRecommendationItem(
        userId,
        conversationId,
        rec.details.id,
        i + 1,
        rec.confidence
      );
      await DbService.logAnalytics(userId, "recommendation_generated", {
        tool_id: rec.details.id,
        rank: i + 1,
        query,
      });
    }

    return NextResponse.json({
      success: true,
      recommendations: validatedRecs,
    });
  } catch (err: any) {
    console.error("Recommendation Engine Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to generate recommendations.",
      },
      { status: 500 }
    );
  }
}
