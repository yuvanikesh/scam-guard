import { create } from "zustand";

export type UserRole = "student" | "developer" | "designer" | "founder" | "marketer" | null;
export type VoiceState = "idle" | "listening" | "thinking" | "results" | "floating";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category_id?: string;
  category?: string; // category name
  website_url: string;
  logo_url?: string;
  pricing_model: "free" | "freemium" | "paid" | "enterprise";
  best_for_role: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  pros: string[];
  use_cases: string[];
  featured: boolean;
  popularity_score: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  recommendations?: Tool[];
  speechSynthesisPlayed?: boolean;
}

interface AppState {
  // Auth & Onboarding
  user: { email: string; id: string } | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  setUser: (user: { email: string; id: string } | null) => void;

  // Voice Assistant State
  voiceState: VoiceState;
  setVoiceState: (state: VoiceState) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;

  // Favorites
  favorites: string[]; // List of tool IDs
  setFavorites: (favorites: string[]) => void;
  toggleFavorite: (toolId: string) => void;

  // Comparison List (Max 2 tools)
  compareList: Tool[];
  addToCompare: (tool: Tool) => void;
  removeFromCompare: (toolId: string) => void;
  clearCompareList: () => void;

  // Conversational History
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "timestamp">) => void;
  clearMessages: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  role: null,
  voiceState: "idle",
  searchQuery: "",
  selectedCategory: null,
  favorites: [],
  compareList: [],
  messages: [],

  setRole: (role) => set({ role }),
  setUser: (user) => set({ user }),
  setVoiceState: (voiceState) => set({ voiceState }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  
  setFavorites: (favorites) => set({ favorites }),
  toggleFavorite: (toolId) =>
    set((state) => {
      const exists = state.favorites.includes(toolId);
      const newFavorites = exists
        ? state.favorites.filter((id) => id !== toolId)
        : [...state.favorites, toolId];
      return { favorites: newFavorites };
    }),

  addToCompare: (tool) =>
    set((state) => {
      // Limit to max 2 tools for side-by-side comparison
      if (state.compareList.find((t) => t.id === tool.id)) return {};
      const newList = [...state.compareList, tool].slice(-2);
      return { compareList: newList };
    }),
  removeFromCompare: (toolId) =>
    set((state) => ({
      compareList: state.compareList.filter((t) => t.id !== toolId),
    })),
  clearCompareList: () => set({ compareList: [] }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, { ...msg, timestamp: new Date() }],
    })),
  clearMessages: () => set({ messages: [] }),
}));
