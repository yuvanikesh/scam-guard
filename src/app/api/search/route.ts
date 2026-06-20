import { NextRequest, NextResponse } from "next/server";
import { DbService } from "@/services/dbService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const role = searchParams.get("role") || "";
    const pricing = searchParams.get("pricing") || "";
    const userId = searchParams.get("userId") || undefined;

    // Log the search event
    if (query) {
      const type = query.startsWith("voice:") ? "voice" : "keyword";
      const cleanQuery = query.replace(/^voice:/, "");
      await DbService.logSearch(userId, cleanQuery, type);
      await DbService.logAnalytics(userId, "search_performed", { query: cleanQuery, type, category, role, pricing });
    }

    const cleanQuery = query.replace(/^voice:/, "");
    const tools = await DbService.getTools({
      category: category || null,
      query: cleanQuery || null,
      role: role || null,
      pricing: pricing || null,
    });

    return NextResponse.json({
      success: true,
      tools,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to search tools.",
      },
      { status: 500 }
    );
  }
}
