import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Tool } from "@/store/useAppStore";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export class DbService {
  // 1. Get Categories
  static async getCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured. Check environment variables.");
    }
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) throw error;
    return (data || []) as Category[];
  }

  // 2. Get Tools with Query Filtering
  static async getTools(filters: {
    category?: string | null;
    query?: string | null;
    role?: string | null;
    pricing?: string | null;
  } = {}): Promise<Tool[]> {
    const { category, query, role, pricing } = filters;

    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured. Check environment variables.");
    }

    let dbQuery = supabase
      .from("tools")
      .select("*, categories(name, slug)");

    // Category Filter
    if (category) {
      const { data: catData } = await supabase
        .from("categories")
        .select("id")
        .eq("name", category)
        .maybeSingle();
      if (catData) {
        dbQuery = dbQuery.eq("category_id", catData.id);
      }
    }

    // Pricing Filter
    if (pricing) {
      dbQuery = dbQuery.eq("pricing_model", pricing.toLowerCase());
    }

    const { data, error } = await dbQuery;
    if (error) throw error;

    let mappedTools: Tool[] = (data || []).map((t: any) => ({
      id: t.id,
      slug: t.slug,
      name: t.name,
      description: t.description,
      category_id: t.category_id,
      category: t.categories?.name || "",
      website_url: t.website_url,
      logo_url: t.logo_url,
      pricing_model: t.pricing_model,
      best_for_role: t.best_for_role,
      difficulty: t.difficulty,
      pros: t.pros,
      use_cases: t.use_cases,
      featured: t.featured,
      popularity_score: t.popularity_score,
    }));

    // Client-side text query & role context filtering for refined search pipeline
    if (query) {
      const q = query.toLowerCase();
      mappedTools = mappedTools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.use_cases.some((u) => u.toLowerCase().includes(q)) ||
          t.pros.some((p) => p.toLowerCase().includes(q))
      );
    }

    if (role) {
      mappedTools = mappedTools.filter((t) =>
        t.best_for_role.some((r) => r.toLowerCase() === role.toLowerCase())
      );
    }

    return mappedTools;
  }

  // 3. Sync Favorites
  static async toggleFavorite(userId: string | undefined, toolId: string, isAdding: boolean): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) {
      throw new Error("Supabase is not configured or user is not logged in.");
    }
    
    if (isAdding) {
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, tool_id: toolId });
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("tool_id", toolId);
      if (error) throw error;
    }
    return true;
  }

  // 4. Get Favorites List
  static async getFavorites(userId: string | undefined): Promise<Tool[]> {
    if (!isSupabaseConfigured() || !userId) {
      return [];
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("tool_id, tools(*, categories(name))")
      .eq("user_id", userId);

    if (error) throw error;
    
    return (data || [])
      .filter((item: any) => item.tools !== null)
      .map((item: any) => {
        const t = item.tools;
        return {
          id: t.id,
          slug: t.slug,
          name: t.name,
          description: t.description,
          category_id: t.category_id,
          category: t.categories?.name || "",
          website_url: t.website_url,
          logo_url: t.logo_url,
          pricing_model: t.pricing_model,
          best_for_role: t.best_for_role,
          difficulty: t.difficulty,
          pros: t.pros,
          use_cases: t.use_cases,
          featured: t.featured,
          popularity_score: t.popularity_score,
        };
      });
  }

  // 5. Log Search Queries
  static async logSearch(userId: string | undefined, query: string, type: "keyword" | "semantic" | "voice"): Promise<void> {
    if (!isSupabaseConfigured()) return;
    await supabase.from("searches").insert({
      user_id: userId || null,
      query,
      search_type: type,
    });
  }

  // 6. Log Analytics Events
  static async logAnalytics(userId: string | undefined, eventName: string, metadata: any): Promise<void> {
    if (!isSupabaseConfigured()) return;
    await supabase.from("analytics_events").insert({
      user_id: userId || null,
      event_name: eventName,
      metadata,
    });
  }

  // 7. Log Conversational Assistant History
  static async logConversation(
    userId: string | undefined,
    query: string,
    response: any,
    recommendationIds: string[]
  ): Promise<string | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from("conversations")
      .insert({
        user_id: userId || null,
        query,
        response,
        recommendation_ids: recommendationIds,
      })
      .select("id")
      .single();
    
    if (error) throw error;
    return data?.id || null;
  }

  // 8. Log individual recommendation items for dashboard charts
  static async logRecommendationItem(
    userId: string | undefined,
    conversationId: string | null,
    toolId: string,
    rank: number,
    score: number
  ): Promise<void> {
    if (!isSupabaseConfigured()) return;
    await supabase.from("recommendation_logs").insert({
      user_id: userId || null,
      conversation_id: conversationId,
      tool_id: toolId,
      rank_position: rank,
      score: score,
    });
  }
}
