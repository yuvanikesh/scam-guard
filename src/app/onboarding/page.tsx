"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, UserRole } from "@/store/useAppStore";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { GraduationCap, Terminal, Paintbrush, Briefcase, Megaphone, ArrowRight } from "lucide-react";

interface RoleCard {
  id: UserRole;
  title: string;
  description: string;
  icon: any;
}

const roles: RoleCard[] = [
  {
    id: "student",
    title: "Student",
    description: "Looking for academic research, study assistance, and writing guides.",
    icon: GraduationCap,
  },
  {
    id: "developer",
    title: "Developer",
    description: "Looking for coding autocomplete, debugging assist, and refactoring scripts.",
    icon: Terminal,
  },
  {
    id: "designer",
    title: "Designer",
    description: "Looking for image generation, UI concept tools, and vector assets.",
    icon: Paintbrush,
  },
  {
    id: "founder",
    title: "Founder",
    description: "Looking for business planning, automations, and productivity setups.",
    icon: Briefcase,
  },
  {
    id: "marketer",
    title: "Marketer",
    description: "Looking for social campaign creatives, copy generation, and SEO analytics.",
    icon: Megaphone,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setRole } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);

    try {
      if (isSupabaseConfigured() && user) {
        // Sync role selection with user profile in Supabase db
        const { error } = await supabase
          .from("users")
          .upsert({
            id: user.id,
            email: user.email,
            role: selectedRole,
            updated_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error("Failed to store role in Supabase:", error.message);
          // Proceed anyway to allow local test
        }
      }
      
      setRole(selectedRole);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-center items-center px-6 relative overflow-hidden py-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl flex flex-col gap-8 z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Personalize Your AI Guide
          </h1>
          <p className="text-sm text-text-secondary max-w-md">
            Select your primary role. This is the single most important factor we use to weight search query rankings.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {roles.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedRole === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedRole(item.id)}
                className={`text-left p-6 rounded-[24px] border flex flex-col justify-between aspect-square md:aspect-[1.1] hover:-translate-y-1 transition-all duration-250 cursor-pointer focus:outline-none ${
                  isSelected
                    ? "bg-accent-indigo/10 border-accent-indigo shadow-[0_0_20px_rgba(255,92,56,0.2)]"
                    : "bg-surface-primary border-surface-secondary hover:bg-surface-secondary hover:border-text-secondary/40"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-medium flex items-center justify-center transition-colors duration-250 ${
                    isSelected ? "bg-accent-indigo text-white" : "bg-bg-secondary text-text-secondary"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="mt-4">
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className="flex items-center justify-center gap-2 h-12 px-10 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_20px_rgba(255,92,56,0.5)] text-white font-semibold transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>Continue to Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
