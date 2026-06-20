"use client";

import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { 
  PenTool, 
  Code, 
  Video, 
  Search, 
  Megaphone, 
  Palette, 
  Cpu, 
  Clock,
  LucideIcon 
} from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  writing: PenTool,
  coding: Code,
  video: Video,
  research: Search,
  marketing: Megaphone,
  design: Palette,
  automation: Cpu,
  productivity: Clock,
};

export default function CategoryCard({ id, name, slug, description, icon, onClick }: CategoryCardProps) {
  const router = useRouter();
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);

  const IconComponent = iconMap[slug.toLowerCase()] || PenTool;

  const handlePress = () => {
    if (onClick) {
      onClick();
      return;
    }
    // Set global selected category and navigate to dashboard
    setSelectedCategory(name);
    router.push("/dashboard");
  };

  return (
    <button
      onClick={handlePress}
      className="group w-full aspect-square bg-surface-primary border border-surface-secondary rounded-[24px] p-6 text-left flex flex-col justify-between hover:bg-surface-secondary hover:border-accent-indigo/40 hover:-translate-y-1 transition-all duration-250 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-indigo focus:ring-offset-2 focus:ring-offset-bg-primary"
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-medium bg-bg-secondary flex items-center justify-center text-accent-indigo group-hover:text-accent-violet group-hover:bg-bg-primary transition-colors duration-250">
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-semibold text-lg md:text-xl text-white group-hover:text-accent-indigo transition-colors duration-150">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}
