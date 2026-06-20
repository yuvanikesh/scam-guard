"use client";

import { Tool, useAppStore } from "@/store/useAppStore";
import { X, CheckCircle, AlertTriangle, GitCompare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CompareModalProps {
  onClose: () => void;
}

interface ComparisonData {
  strengths: string[];
  weaknesses: string[];
  best_for: string;
}

export default function CompareModal({ onClose }: CompareModalProps) {
  const { compareList, user, removeFromCompare } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toolA = compareList[0];
  const toolB = compareList[1];

  useEffect(() => {
    const fetchComparison = async () => {
      if (!toolA || !toolB) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/compare", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toolA,
            toolB,
            userId: user?.id || null,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to compile tool comparison.");
        }

        const data = await res.json();
        if (data.success) {
          setComparison(data.comparison);
        } else {
          throw new Error(data.error || "Failed to compare.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load comparison details.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [toolA, toolB, user]);

  if (!toolA || !toolB) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        initial={{ y: 24, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 24, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl bg-surface-primary border border-surface-secondary rounded-[24px] overflow-hidden max-h-[85vh] md:max-h-[90vh] flex flex-col z-10 shadow-modal"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-surface-secondary shrink-0">
          <div className="flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-accent-indigo" />
            <h2 className="font-display font-semibold text-lg text-white ml-2">Compare AI Concierges</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-bg-secondary hover:bg-surface-secondary text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex flex-col gap-6 leading-relaxed">
          {/* Table Grid */}
          <div className="border border-surface-secondary rounded-large overflow-hidden">
            {/* Header Columns */}
            <div className="grid grid-cols-3 bg-bg-secondary/40 border-b border-surface-secondary/70 p-4 font-semibold text-xs tracking-wider uppercase text-text-muted">
              <div>Features</div>
              <div className="px-4 text-white font-display text-sm">{toolA.name}</div>
              <div className="px-4 text-white font-display text-sm">{toolB.name}</div>
            </div>

            {/* Content Rows */}
            <div className="divide-y divide-surface-secondary/50 text-xs">
              {/* Description */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                  Description
                </div>
                <div className="text-text-secondary px-4 leading-relaxed">{toolA.description}</div>
                <div className="text-text-secondary px-4 leading-relaxed">{toolB.description}</div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                  Pricing Tier
                </div>
                <div className="text-text-secondary px-4 capitalize font-semibold">{toolA.pricing_model}</div>
                <div className="text-text-secondary px-4 capitalize font-semibold">{toolB.pricing_model}</div>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                  Difficulty
                </div>
                <div className="text-text-secondary px-4 capitalize">{toolA.difficulty}</div>
                <div className="text-text-secondary px-4 capitalize">{toolB.difficulty}</div>
              </div>

              {/* Best Role */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                  Best For Role
                </div>
                <div className="text-accent-indigo px-4 capitalize font-medium">{toolA.best_for_role.join(", ")}</div>
                <div className="text-accent-violet px-4 capitalize font-medium">{toolB.best_for_role.join(", ")}</div>
              </div>

              {/* Primary Use cases */}
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                  Use Cases
                </div>
                <div className="px-4">
                  <ul className="list-disc pl-4 flex flex-col gap-1 text-text-secondary">
                    {toolA.use_cases.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>
                <div className="px-4">
                  <ul className="list-disc pl-4 flex flex-col gap-1 text-text-secondary">
                    {toolB.use_cases.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Generated Comparison Section */}
          <div className="border border-surface-secondary/70 rounded-large p-6 bg-bg-secondary/20 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-violet animate-pulse" />
              <span className="font-display font-semibold text-sm text-white ml-2">AI Concierge Synthesis</span>
            </div>

            {loading ? (
              <div className="flex flex-col gap-4 animate-pulse">
                <div className="h-4 bg-surface-secondary rounded" style={{ width: "75%" }} />
                <div className="h-4 bg-surface-secondary rounded" style={{ width: "83.33%" }} />
                <div className="h-4 bg-surface-secondary rounded w-2/3" />
              </div>
            ) : error ? (
              <div className="text-xs text-error font-semibold p-4 border border-error/20 bg-error/5 rounded-medium">
                {error}
              </div>
            ) : comparison ? (
              <div className="flex flex-col gap-6 text-xs text-text-secondary">
                {/* Strengths */}
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                    Key Strengths
                  </span>
                  <ul className="flex flex-col gap-2">
                    {comparison.strengths.map((str, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span className="ml-1">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                    Limitations & Pricing
                  </span>
                  <ul className="flex flex-col gap-2">
                    {comparison.weaknesses.map((weak, idx) => (
                      <li key={idx} className="flex gap-2 items-start leading-relaxed">
                        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                        <span className="ml-1">{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verdict Best For */}
                <div className="flex flex-col gap-2 border-t border-surface-secondary/50 pt-4 mt-2">
                  <span className="font-semibold text-white uppercase tracking-wider text-[10px] text-text-muted">
                    Best Match Verdict
                  </span>
                  <p className="leading-relaxed text-white font-medium p-4 bg-surface-primary border border-surface-secondary rounded-medium">
                    {comparison.best_for}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface-secondary bg-bg-secondary/40 flex justify-end gap-2 shrink-0">
          <button
            onClick={() => {
              removeFromCompare(toolA.id);
              removeFromCompare(toolB.id);
              onClose();
            }}
            className="px-4 h-12 rounded-medium bg-surface-primary border border-surface-secondary text-text-secondary hover:text-white hover:border-text-secondary text-xs font-semibold cursor-pointer transition-colors"
          >
            Clear Selection
          </button>
          <button
            onClick={onClose}
            className="px-6 h-12 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_15px_rgba(255,92,56,0.4)] text-white text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02]"
          >
            Close Comparison
          </button>
        </div>
      </motion.div>
    </div>
  );
}
