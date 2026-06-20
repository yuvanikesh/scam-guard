"use client";

import { useEffect, useState } from "react";
import { useAppStore, Tool } from "@/store/useAppStore";
import { DbService } from "@/services/dbService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import ToolDetailModal from "@/components/ToolDetailModal";
import Link from "next/link";
import { ArrowLeft, Bookmark, Heart } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
  const { user, favorites } = useAppStore();
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedToolDetail, setSelectedToolDetail] = useState<Tool | null>(null);

  useEffect(() => {
    const fetchFavs = async () => {
      setLoading(true);
      try {
        const favs = await DbService.getFavorites(user?.id);
        setFavoriteTools(favs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavs();
  }, [user, favorites]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 flex flex-col gap-6">
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
        <div className="flex items-center gap-2 mt-2">
          <div className="w-8 h-8 rounded bg-error/10 text-error flex items-center justify-center">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-xl text-white ml-2">Your Saved Favorites</h1>
            <p className="text-xs text-text-secondary ml-2">Syncs automatically across your verified devices.</p>
          </div>
        </div>

        {/* Tools list */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full aspect-[4/3] bg-surface-primary border border-surface-secondary rounded-medium p-4 animate-pulse" />
            ))}
          </div>
        ) : favoriteTools.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center p-16 border border-dashed border-surface-secondary rounded-[24px] text-center gap-4 bg-bg-secondary/20 mt-4">
            <Heart className="w-12 h-12 text-text-muted" />
            <div>
              <h3 className="font-display font-semibold text-base text-white">No saved tools yet</h3>
              <p className="text-xs text-text-secondary max-w-xs mt-2">
                Explore the workspace and click the heart icon on any tool card to save them here.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet text-xs font-semibold text-white hover:shadow-[0_0_10px_rgba(255,92,56,0.3)] transition-all"
            >
              Start Discovering
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {favoriteTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onOpenDetails={(t) => setSelectedToolDetail(t)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Details Modal */}
      <AnimatePresence>
        {selectedToolDetail && (
          <ToolDetailModal
            tool={selectedToolDetail}
            onClose={() => setSelectedToolDetail(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
