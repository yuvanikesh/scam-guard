"use client";

import { Tool, useAppStore } from "@/store/useAppStore";
import { X, ExternalLink, Heart, GitCompare, Check, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { DbService } from "@/services/dbService";

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
}

export default function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
  const { user, favorites, toggleFavorite, compareList, addToCompare, removeFromCompare } = useAppStore();

  const isFavorited = favorites.includes(tool.id);
  const isComparing = compareList.some((t) => t.id === tool.id);

  // Log tool opened analytics event
  useEffect(() => {
    DbService.logAnalytics(user?.id, "tool_opened", { tool_id: tool.id, name: tool.name });
  }, [tool, user]);

  const handleFavoriteClick = () => {
    toggleFavorite(tool.id);
  };

  const handleCompareClick = () => {
    if (isComparing) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  const handleVisitClick = () => {
    DbService.logAnalytics(user?.id, "website_clicked", { tool_id: tool.id, url: tool.website_url });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ y: "100%", scale: 1 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: "100%", scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full md:max-w-2xl bg-surface-primary border-t md:border border-surface-secondary rounded-t-[24px] md:rounded-[24px] overflow-hidden max-h-[85vh] md:max-h-[90vh] flex flex-col z-10 shadow-modal"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-surface-secondary shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-bg-secondary flex items-center justify-center font-display font-bold text-white border border-surface-secondary">
              {tool.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover rounded" />
              ) : (
                tool.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex flex-col ml-2">
              <h2 className="font-display font-semibold text-lg text-white leading-tight">{tool.name}</h2>
              <span className="text-[10px] font-semibold text-accent-indigo tracking-wide uppercase mt-0.5">
                {tool.category || "AI Tool"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-bg-secondary hover:bg-surface-secondary text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 leading-relaxed">
          {/* Summary */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Overview</span>
            <p className="text-sm text-text-secondary">{tool.description}</p>
          </div>

          {/* Key tags & stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-bg-secondary/40 p-4 rounded-medium border border-surface-secondary/50">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Pricing Model</span>
              <span className="text-xs text-white capitalize font-semibold">{tool.pricing_model}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Difficulty</span>
              <span className="text-xs text-white capitalize font-semibold">{tool.difficulty}</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Popularity Score</span>
              <span className="text-xs text-accent-indigo font-semibold">{tool.popularity_score} / 100</span>
            </div>
          </div>

          {/* Roles */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Best For Role</span>
            <div className="flex flex-wrap gap-2">
              {tool.best_for_role.map((role) => (
                <span
                  key={role}
                  className="text-xs font-medium px-2.5 py-1 rounded bg-surface-secondary text-white border border-surface-secondary capitalize"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Split grid for Pros and Use Cases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Use Cases */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Primary Use Cases</span>
              <ul className="flex flex-col gap-2">
                {tool.use_cases.map((useCase, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-text-secondary">
                    <Check className="w-4 h-4 text-accent-indigo shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Key Advantages</span>
              <ul className="flex flex-col gap-2">
                {tool.pros.map((pro, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-text-secondary">
                    <Award className="w-4 h-4 text-accent-violet shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-6 border-t border-surface-secondary bg-bg-secondary/30 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Compare */}
            <button
              onClick={handleCompareClick}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-12 rounded-medium text-xs font-semibold border transition-all cursor-pointer ${
                isComparing
                  ? "bg-accent-indigo/20 border-accent-indigo text-accent-indigo shadow-[0_0_10px_rgba(255,92,56,0.2)]"
                  : "bg-surface-primary border-surface-secondary text-text-secondary hover:text-white hover:border-text-secondary"
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>{isComparing ? "Comparing" : "Add to Compare"}</span>
            </button>

            {/* Favorite */}
            <button
              onClick={handleFavoriteClick}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 h-12 rounded-medium text-xs font-semibold border transition-all cursor-pointer ${
                isFavorited
                  ? "bg-error/10 border-error text-error shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                  : "bg-surface-primary border-surface-secondary text-text-secondary hover:text-white hover:border-text-secondary"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-error" : ""}`} />
              <span>{isFavorited ? "Favorited" : "Favorite"}</span>
            </button>
          </div>

          {/* Visit CTA */}
          <a
            href={tool.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVisitClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_15px_rgba(255,92,56,0.4)] text-white text-xs font-semibold transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
