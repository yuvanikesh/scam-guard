import { NextRequest, NextResponse } from "next/server";
import { DbService } from "@/services/dbService";

export async function POST(req: NextRequest) {
  try {
    const { toolA, toolB, userId } = await req.json();

    if (!toolA || !toolB) {
      return NextResponse.json(
        { success: false, error: "Both Tool A and Tool B are required for comparison." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "OPENROUTER_API_KEY is not configured in the environment." },
        { status: 500 }
      );
    }

    // Track analytics event
    await DbService.logAnalytics(userId, "tool_compared", {
      tool_a_id: toolA.id,
      tool_b_id: toolB.id,
    });

    const systemPrompt = `You are AI-Dicto, a professional AI concierge tool comparator.
Compare the two provided tools objectively. Write exactly one JSON object containing:
- "strengths": (array of strings) 2 key comparative advantages for each tool
- "weaknesses": (array of strings) 2 comparative limitations or cost considerations
- "best_for": (string) A concise conclusion on which tool to choose under what context.

Avoid marketing hype. Keep statements practical, short (max 100 characters per item).`;

    const userPrompt = `Compare Tool A:
${JSON.stringify(toolA, null, 2)}

VS

Compare Tool B:
${JSON.stringify(toolB, null, 2)}`;

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

    let comparison = {};
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    if (jsonStart !== -1 && jsonEnd !== -1) {
      comparison = JSON.parse(content.substring(jsonStart, jsonEnd));
    } else {
      comparison = JSON.parse(content);
    }

    return NextResponse.json({
      success: true,
      comparison,
    });
  } catch (err: any) {
    console.error("Comparison Engine Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to compare tools.",
      },
      { status: 500 }
    );
  }
}
