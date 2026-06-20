import { NextRequest, NextResponse } from "next/server";
import { DbService } from "@/services/dbService";

export async function POST(req: NextRequest) {
  try {
    const { userId, eventName, metadata } = await req.json();

    if (!eventName) {
      return NextResponse.json({ success: false, error: "Event name is required." }, { status: 400 });
    }

    await DbService.logAnalytics(userId || null, eventName, metadata || {});

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to log event.",
      },
      { status: 500 }
    );
  }
}
