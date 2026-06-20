import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { mockCategories, mockTools } from "@/services/mockDb";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "Supabase keys are not set in environment variables. Please check `.env.local`.",
      },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return NextResponse.json(
      {
        success: false,
        error: "SUPABASE_SERVICE_ROLE_KEY is missing in environment variables. Seeding requires admin rights.",
      },
      { status: 400 }
    );
  }

  try {
    const logs: string[] = [];
    
    // Create admin client that bypasses RLS for seeding
    const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // 1. Seed Categories
    logs.push("Starting category seeding...");
    for (const cat of mockCategories) {
      const { error } = await adminSupabase.from("categories").upsert({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
      });
      if (error) {
        logs.push(`Category ${cat.name} upsert failed: ${error.message}`);
        throw error;
      }
      logs.push(`Category ${cat.name} seeded successfully.`);
    }

    // 2. Seed Tools
    logs.push("Starting tool seeding...");
    for (const tool of mockTools) {
      const { error } = await adminSupabase.from("tools").upsert({
        id: tool.id,
        slug: tool.slug,
        name: tool.name,
        description: tool.description,
        category_id: tool.category_id,
        website_url: tool.website_url,
        pricing_model: tool.pricing_model,
        best_for_role: tool.best_for_role,
        difficulty: tool.difficulty,
        pros: tool.pros,
        use_cases: tool.use_cases,
        featured: tool.featured,
        popularity_score: tool.popularity_score,
      });
      if (error) {
        logs.push(`Tool ${tool.name} upsert failed: ${error.message}`);
        throw error;
      }
      logs.push(`Tool ${tool.name} seeded successfully.`);
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      logs,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Seeding failed.",
      },
      { status: 500 }
    );
  }
}
