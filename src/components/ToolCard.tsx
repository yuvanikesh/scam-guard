"use client";

import { useAppStore, Tool } from "@/store/useAppStore";
import { Heart, GitCompare, ExternalLink, ShieldCheck } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  onOpenDetails?: (tool: Tool) => void;
}

export default function ToolCard({ tool, onOpenDetails }: ToolCardProps) {
  const { favorites, toggleFavorite, compareList, addToCompare, removeFromCompare } = useAppStore();

  const isFavorited = favorites.includes(tool.id);
  const isComparing = compareList.some((t) => t.id === tool.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(tool);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full aspect-[4/3] bg-surface-primary border border-surface-secondary rounded-rounded-md p-4 flex flex-col justify-between hover:bg-surface-secondary hover:border-coral-orange/35 hover:-translate-y-1 hover:shadow-card transition-all duration-250 cursor-pointer overflow-hidden focus-within:ring-2 focus-within:ring-coral-orange"
    >
      {/* Top Header Row */}
      <div className="flex justify-between items-start gap-4">
        {/* Logo / Icon */}
        <div className="w-8 h-8 rounded bg-bg-secondary flex items-center justify-center font-display font-bold text-base text-white border border-surface-primary group-hover:border-coral-orange/20 transition-colors duration-250 shrink-0">
          {tool.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-cover rounded" />
          ) : (
            tool.name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Compare Button */}
          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-lg border transition-all duration-150 cursor-pointer ${
              isComparing
                ? "bg-coral-orange/20 border-coral-orange text-coral-orange shadow-[0_0_10px_rgba(255,92,56,0.2)]"
                : "bg-bg-secondary border-surface-secondary text-text-secondary hover:text-white hover:border-text-secondary"
            }`}
            title="Compare tool"
            aria-label={`Compare ${tool.name}`}
          >
            <GitCompare className="w-4 h-4" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-lg border transition-all duration-150 cursor-pointer ${
              isFavorited
                ? "bg-error/10 border-error text-error shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                : "bg-bg-secondary border-surface-secondary text-text-secondary hover:text-white hover:border-text-secondary"
            }`}
            title="Favorite tool"
            aria-label={`Favorite ${tool.name}`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-error" : ""}`} />
          </button>
        </div>
      </div>

      {/* Middle Content */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-base md:text-lg text-white group-hover:text-coral-orange transition-colors duration-150 truncate">
            {tool.name}
          </h3>
          {tool.featured && (
            <span title="Featured Tool" className="shrink-0 flex items-center">
              <ShieldCheck className="w-4 h-4 text-vivid-purple" />
            </span>
          )}
        </div>
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex justify-between items-center border-t border-surface-secondary/50 pt-3 mt-2 gap-4">
        {/* Category & pricing */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[9px] font-bold px-3 py-0.5 rounded-full bg-coral-orange/10 text-coral-orange uppercase tracking-wider border border-coral-orange/20 capitalize">
            {tool.category || "AI"}
          </span>
          <span className="text-[9px] font-bold px-3 py-0.5 rounded-full bg-surface-secondary text-text-secondary uppercase tracking-wider border border-surface-secondary/60 capitalize">
            {tool.pricing_model}
          </span>
        </div>

        {/* Visit CTA */}
        <a
          href={tool.website_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-text-muted hover:text-white flex items-center gap-1 transition-colors duration-150 hover:underline"
        >
          <span>Visit</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
