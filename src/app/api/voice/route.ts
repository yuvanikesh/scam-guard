import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Sarvam AI API key is not configured. Please check `.env.local`.",
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ success: false, error: "Audio file is required." }, { status: 400 });
    }

    // Call Sarvam AI STT API
    const sarvamFormData = new FormData();
    sarvamFormData.append("file", file, "audio.wav");
    sarvamFormData.append("model", "saaras:v1"); // standard English/Indian languages model

    const response = await fetch("https://api.sarvam.ai/speech-to-text", {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
      },
      body: sarvamFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sarvam STT returned status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    const transcript = result.transcript || "";

    return NextResponse.json({
      success: true,
      transcript,
    });
  } catch (err: any) {
    console.error("Sarvam STT Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to transcribe audio.",
      },
      { status: 500 }
    );
  }
}
