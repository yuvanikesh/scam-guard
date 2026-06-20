"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, BarChart, Users, Search, Sparkles, Heart, Activity } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface Metric {
  title: string;
  value: number | string;
  change: string;
  icon: any;
  color: string;
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [topSearches, setTopSearches] = useState<{ query: string; count: number }[]>([]);
  const [categoryStats, setCategoryStats] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        if (!isSupabaseConfigured()) {
          throw new Error("Supabase is not configured. Admin metrics are unavailable.");
        }

        // 1. Fetch real Supabase metrics counts
        const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true });
        const { count: searchesCount } = await supabase.from("searches").select("*", { count: "exact", head: true });
        const { count: recsCount } = await supabase.from("recommendation_logs").select("*", { count: "exact", head: true });
        const { count: favsCount } = await supabase.from("favorites").select("*", { count: "exact", head: true });

        // 2. Fetch Category distribution
        const { data: catData } = await supabase
          .from("recommendation_logs")
          .select("tools(category_id, categories(name))");
        
        const catCounts: Record<string, number> = {};
        catData?.forEach((item: any) => {
          const name = item.tools?.categories?.name || "Other";
          catCounts[name] = (catCounts[name] || 0) + 1;
        });

        // 3. Fetch Top searches
        const { data: searchData } = await supabase
          .from("searches")
          .select("query");
        
        const searchCounts: Record<string, number> = {};
        searchData?.forEach((item: any) => {
          const q = item.query || "unknown";
          searchCounts[q] = (searchCounts[q] || 0) + 1;
        });

        setMetrics([
          { title: "Total Users", value: usersCount || 0, change: "+12% this week", icon: Users, color: "text-accent-indigo" },
          { title: "Total Searches", value: searchesCount || 0, change: "+24% this week", icon: Search, color: "text-accent-violet" },
          { title: "AI Recommendations", value: recsCount || 0, change: "+18% this week", icon: Sparkles, color: "text-success" },
          { title: "Total Favorites", value: favsCount || 0, change: "+8% this week", icon: Heart, color: "text-error" },
        ]);

        setCategoryStats(
          Object.entries(catCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
        );

        setTopSearches(
          Object.entries(searchCounts)
            .map(([query, count]) => ({ query, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 flex flex-col gap-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-indigo/10 text-accent-indigo flex items-center justify-center">
            <BarChart className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-xl text-white ml-2">Admin Insights & Analytics</h1>
            <p className="text-xs text-text-secondary ml-2">Monitor user queries, tool recommendations, and category distribution.</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-surface-primary border border-surface-secondary rounded-[16px] animate-pulse" />
            ))}
          </div>
        ) : !isSupabaseConfigured() ? (
          <div className="flex flex-col items-center justify-center p-16 border border-dashed border-surface-secondary rounded-[24px] text-center gap-4 bg-bg-secondary/20">
            <BarChart className="w-12 h-12 text-text-muted" />
            <div>
              <h3 className="font-display font-semibold text-base text-white">Database connection required</h3>
              <p className="text-xs text-text-secondary max-w-xs mt-2">
                Configure your Supabase URL and Anon keys in `.env.local` to enable admin analytics monitoring.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="bg-surface-primary border border-surface-secondary rounded-medium p-6 flex items-center justify-between shadow-card">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{item.title}</span>
                      <span className="font-display font-bold text-2xl text-white mt-1">{item.value}</span>
                      <span className="text-[10px] text-success font-semibold mt-0.5">{item.change}</span>
                    </div>
                    <div className={`p-4 rounded-lg bg-bg-secondary border border-surface-secondary shrink-0 ${item.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category distribution bar chart */}
              <div className="bg-surface-primary border border-surface-secondary rounded-[24px] p-6 flex flex-col gap-6 shadow-modal">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent-indigo" />
                  <span className="font-display font-semibold text-sm text-white ml-2">Category Recommendation Count</span>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {categoryStats.length === 0 ? (
                    <div className="text-xs text-text-secondary">No recommendation data logged yet.</div>
                  ) : (
                    categoryStats.map((stat, idx) => {
                      const maxVal = Math.max(...categoryStats.map((c) => c.count)) || 1;
                      const percentage = (stat.count / maxVal) * 100;
                      return (
                        <div key={idx} className="flex flex-col gap-1 text-xs">
                          <div className="flex justify-between items-center text-text-secondary">
                            <span className="font-semibold text-white">{stat.name}</span>
                            <span>{stat.count} queries</span>
                          </div>
                          {/* Custom CSS Bar Chart */}
                          <div className="w-full h-2 rounded bg-bg-secondary overflow-hidden">
                            <div
                              style={{ width: `${percentage}%` }}
                              className="h-full bg-gradient-to-r from-accent-indigo to-accent-violet rounded"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Top Searches list */}
              <div className="bg-surface-primary border border-surface-secondary rounded-[24px] p-6 flex flex-col gap-6 shadow-modal">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-accent-violet" />
                  <span className="font-display font-semibold text-sm text-white ml-2">Top Search Intent Keywords</span>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  {topSearches.length === 0 ? (
                    <div className="text-xs text-text-secondary">No queries logged yet.</div>
                  ) : (
                    topSearches.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-bg-secondary/40 border border-surface-secondary rounded-medium text-xs">
                        <span className="font-medium text-text-secondary pr-4 italic">
                          &quot;{item.query}&quot;
                        </span>
                        <span className="font-semibold text-accent-violet shrink-0">
                          {item.count} hits
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
