"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceOrb from "@/components/VoiceOrb";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import { Tool } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  GitCompare, 
  Mic, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Clock, 
  Coins, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap
} from "lucide-react";

// mock categories
const categories = [
  { id: "1", name: "Writing", slug: "writing", description: "Generate articles, copywriting, blogs, and SEO content." },
  { id: "2", name: "Coding", slug: "coding", description: "Intelligent auto-complete, debugging, and agentic workflows." },
  { id: "3", name: "Video", slug: "video", description: "AI video editing, synthesis, text-to-video, and avatars." },
  { id: "4", name: "Research", slug: "research", description: "Academic paper search, summaries, and research databases." },
  { id: "5", name: "Marketing", slug: "marketing", description: "Ad graphics generation, social campaigns, and brand assets." },
  { id: "6", name: "Design", slug: "design", description: "Text-to-image creation, UI inspiration, and vector graphic assets." },
  { id: "7", name: "Automation", slug: "automation", description: "Connect apps, trigger workflows, and automate tasks with AI nodes." },
  { id: "8", name: "Productivity", slug: "productivity", description: "AI-powered notes, workspace organizers, and focus planners." },
];

// mock tools for preview
const previewTools: Tool[] = [
  {
    id: "p1",
    slug: "cursor",
    name: "Cursor",
    description: "AI-first code editor focused on development productivity and autocomplete.",
    pricing_model: "freemium",
    best_for_role: ["developer"],
    difficulty: "intermediate",
    pros: ["fast autocomplete", "codebase chat"],
    use_cases: ["coding", "debugging", "refactoring"],
    featured: true,
    popularity_score: 98,
    website_url: "https://cursor.com",
  },
  {
    id: "p2",
    slug: "chatgpt",
    name: "ChatGPT",
    description: "General purpose conversational agent excellent for writing, coding, and brainstorming.",
    pricing_model: "freemium",
    best_for_role: ["student", "developer", "designer", "founder", "marketer"],
    difficulty: "beginner",
    pros: ["highly versatile", "gpt-4o model"],
    use_cases: ["writing", "coding", "general research"],
    featured: true,
    popularity_score: 99,
    website_url: "https://chatgpt.com",
  },
  {
    id: "p3",
    slug: "perplexity",
    name: "Perplexity",
    description: "Conversational answer engine providing cited research and search results.",
    pricing_model: "freemium",
    best_for_role: ["student", "researcher", "founder"],
    difficulty: "beginner",
    pros: ["cited references", "realtime web search"],
    use_cases: ["research", "academic synthesis", "fact checking"],
    featured: true,
    popularity_score: 95,
    website_url: "https://perplexity.ai",
  },
  {
    id: "p4",
    slug: "midjourney",
    name: "Midjourney",
    description: "Generates photorealistic images from textual prompts via Discord.",
    pricing_model: "paid",
    best_for_role: ["designer", "marketer"],
    difficulty: "intermediate",
    pros: ["high-fidelity images", "gorgeous aesthetics"],
    use_cases: ["image generation", "concept art", "ui mockups"],
    featured: true,
    popularity_score: 96,
    website_url: "https://midjourney.com",
  },
];

const faqs = [
  {
    question: "How does the AI Concierge understand what I need?",
    answer: "Our system listens to or reads your goals, processes the intent using AI analysis, and queries our curated database to surface the top 3 tools that match your technical needs, role, and pricing preferences."
  },
  {
    question: "Do I need to pay or provide credit cards?",
    answer: "No. Dicto-ai is 100% free to use for searching, discovering, and comparing tools. For executing direct tasks, we prompt you for your own API key to bypass heuristics and ensure complete privacy."
  },
  {
    question: "How is the tool database updated?",
    answer: "We scan the ecosystem and update the database weekly. We track pricing model shifts, feature updates, and developer sentiment scores to ensure our recommendation metrics remain accurate."
  },
  {
    question: "What is the comparison engine?",
    answer: "You can select any two tools inside the dashboard to compare their pros, cons, target roles, and pricing side-by-side. This helps you skip sponsored directory pages and make an unbiased decision."
  }
];

export default function Home() {
  const router = useRouter();

  // Calculator state
  const [hours, setHours] = useState(5);
  const [teamSize, setTeamSize] = useState(3);
  
  // Calculate savings (efficiency gain: 80% search time reduced)
  const savedHoursPerYear = Math.round(hours * 0.8 * teamSize * 52);
  const budgetSavedPerYear = Math.round(hours * teamSize * 50 * 52);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-72px)] flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background Large Cinematic Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04] md:opacity-[0.06] blur-[2px]">
          <h1 className="font-display font-extrabold text-[18vw] leading-none text-white tracking-tighter text-center uppercase select-none whitespace-nowrap">
            Dicto-Ai
          </h1>
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-accent-indigo/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-accent-violet/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 gap-8">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]"
          >
            Stop Browsing AI Tools.<br />
            <span className="bg-gradient-to-r from-accent-indigo to-accent-violet bg-clip-text text-transparent">
              Start Describing What You Need.
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed"
          >
            AI-Dicto identifies and recommends the most suitable AI solutions for your goals through intelligent conversational audio and comparison metrics.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 max-w-md mx-auto"
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_20px_rgba(255,92,56,0.5)] text-white font-semibold transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Ask With Voice</span>
            </button>
            <a
              href="#categories"
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-medium bg-transparent border border-surface-secondary hover:border-text-secondary text-white font-semibold transition-colors duration-150"
            >
              <span>Explore Categories</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Central Phone Mockup Flanked Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative w-full max-w-lg mx-auto flex items-center justify-center mt-12 select-none"
          >
            {/* Left Ghost Flank */}
            <div className="absolute left-[-20%] scale-75 opacity-10 blur-[3px] w-[220px] aspect-[9/16] bg-black rounded-phone-mockup border-[4px] border-surface-secondary pointer-events-none hidden md:block" />

            {/* Central Interactive Phone Mockup */}
            <div className="relative w-[280px] aspect-[9/16] bg-bg-secondary rounded-phone-mockup border-[6px] border-surface-secondary shadow-modal flex flex-col justify-between py-12 px-6 overflow-hidden z-10 hover:border-coral-orange/40 transition-colors duration-300">
              {/* Top speaker indicator */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-pill bg-surface-secondary" />

              <div className="flex flex-col items-center justify-center flex-1 gap-6 mt-4">
                <VoiceOrb />
                <div className="text-center flex flex-col gap-2">
                  <span className="text-[10px] text-coral-orange font-bold uppercase tracking-widest">AI CONCIERGE</span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Describe your goal. Try saying: <br />
                    <span className="italic text-white font-medium">&quot;I need a coding assistant.&quot;</span>
                  </p>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-pill bg-surface-secondary" />
            </div>

            {/* Right Ghost Flank */}
            <div className="absolute right-[-20%] scale-75 opacity-10 blur-[3px] w-[220px] aspect-[9/16] bg-black rounded-phone-mockup border-[4px] border-surface-secondary pointer-events-none hidden md:block" />
          </motion.div>
        </div>
      </section>

      {/* Problem Section (PerpetualX Style) */}
      <section className="py-20 border-t border-surface-primary bg-bg-primary px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-error/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-4">
            <span className="text-[10px] text-error font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-error" />
              THE AI DIRECTORY CHAOS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Outdated Listings. Sponsored Bias. Endless Tabs.
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Traditional AI resource sheets are cluttered with affiliate links, paid promotions, and obsolete reviews. You waste hours digging through hundreds of tools just to find a single working solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-surface-primary border border-surface-secondary/50 rounded-[24px] p-8 flex flex-col gap-4">
              <span className="text-xs font-bold text-error uppercase tracking-wide">Traditional Databases</span>
              <ul className="flex flex-col gap-4 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold mt-0.5">✕</span> Outdated categories and dead website URLs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold mt-0.5">✕</span> Sponsored tools pushed to the top regardless of fit.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold mt-0.5">✕</span> Complex interfaces with endless search filters.
                </li>
              </ul>
            </div>

            <div className="bg-surface-primary border border-coral-orange/20 rounded-[24px] p-8 flex flex-col gap-4 shadow-[0_0_30px_rgba(255,92,56,0.05)]">
              <span className="text-xs font-bold text-coral-orange uppercase tracking-wide">The Dicto-ai Advantage</span>
              <ul className="flex flex-col gap-4 text-xs text-white">
                <li className="flex items-start gap-2">
                  <span className="text-coral-orange font-bold mt-0.5">✓</span> Unified voice-concierge to describe what you want.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral-orange font-bold mt-0.5">✓</span> Objective recommendation scoring based on popularity and role.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-coral-orange font-bold mt-0.5">✓</span> Clean side-by-side comparison matrices with no affiliates.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-surface-primary bg-bg-secondary px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-text-secondary max-w-xl mx-auto text-sm md:text-base">
              The premium conversational journey from intent to selection in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 - Warm Cream Block */}
            <div className="bg-warm-cream rounded-[24px] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[250px] shadow-sm">
              <div className="w-12 h-12 rounded-full bg-bg-secondary text-white flex items-center justify-center font-display font-bold text-lg">
                01
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-bg-secondary mb-2 mt-6">Describe Goal</h3>
                <p className="text-sm text-bg-primary/80 leading-relaxed">
                  Speak naturally or type your direct needs—for example: &quot;I need help studying math.&quot;
                </p>
              </div>
            </div>

            {/* Step 2 - Vivid Purple Tint */}
            <div className="bg-vivid-purple/10 border border-vivid-purple/20 rounded-[24px] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-vivid-purple text-white flex items-center justify-center font-display font-bold text-lg">
                02
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2 mt-6">AI Configures Fit</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Our ranking formula evaluates candidates against your active role context, category match, and popularity weight.
                </p>
              </div>
            </div>

            {/* Step 3 - Coral Orange Tint */}
            <div className="bg-coral-orange/10 border border-coral-orange/20 rounded-[24px] p-8 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-coral-orange text-white flex items-center justify-center font-display font-bold text-lg">
                03
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2 mt-6">Decision & Comparison</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Compare tools side-by-side, read AI-generated reasoning badges, save favorites, and jump to checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator (PerpetualX Style) */}
      <section className="py-20 border-t border-surface-primary bg-bg-primary px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-accent-violet/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-[10px] text-accent-violet font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent-violet" />
              INTERACTIVE ROI CALCULATOR
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Estimate Your Savings
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              See how much time and project budget your team saves by letting the AI Concierge filter and compare tools automatically instead of browsing manually.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-surface-primary border border-surface-secondary rounded-[32px] p-8 md:p-12 shadow-modal">
            {/* Left sliders */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Slider 1 */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white">AI Research Hours / Week</label>
                  <span className="text-lg font-bold text-coral-orange font-display">{hours} hrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-coral-orange animate-none"
                  style={{
                    background: `linear-gradient(to right, #ff5c38 0%, #ff5c38 ${((hours - 1) / 19) * 100}%, #131313 ${((hours - 1) / 19) * 100}%, #131313 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>1 hour</span>
                  <span>20 hours</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white">Team Size (Creators / Developers)</label>
                  <span className="text-lg font-bold text-accent-violet font-display">{teamSize} members</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-vivid-purple animate-none"
                  style={{
                    background: `linear-gradient(to right, #ab54f7 0%, #ab54f7 ${((teamSize - 1) / 49) * 100}%, #131313 ${((teamSize - 1) / 49) * 100}%, #131313 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>1 member</span>
                  <span>50 members</span>
                </div>
              </div>
            </div>

            {/* Right dynamic results output */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-bg-secondary/40 border border-surface-secondary/80 rounded-[24px] p-6 md:p-8 justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-coral-orange/5 rounded-full blur-[40px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-violet/5 rounded-full blur-[40px] pointer-events-none" />

              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-coral-orange" />
                  Search Time Saved
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-display font-bold text-coral-orange animate-none">
                    {savedHoursPerYear.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-secondary font-medium">hours/year</span>
                </div>
              </div>

              <div className="h-px bg-surface-secondary/70 w-full" />

              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                  <Coins className="w-4 h-4 text-accent-violet" />
                  Estimated Budget Saved
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-display font-bold text-white animate-none">
                    ${budgetSavedPerYear.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-secondary font-medium">USD/year</span>
                </div>
                <span className="text-[9px] text-text-muted mt-1 italic">
                  *Based on an industry standard developer rate of $50/hour.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section (Perpetual Advantage Style) */}
      <section className="py-20 border-t border-surface-primary bg-bg-secondary px-6 relative overflow-hidden scroll-mt-[72px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-[10px] text-coral-orange font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-coral-orange" />
              THE BENTO ADVANTAGE
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Engineered for Speed
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Dicto-ai replaces hundreds of browser tabs and search tools with a high-fidelity matching interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: col-span-2 */}
            <div className="md:col-span-2 bg-surface-primary border border-surface-secondary rounded-[28px] p-8 flex flex-col justify-between min-h-[260px] hover:border-coral-orange/30 transition-colors duration-300 relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 bg-coral-orange/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-coral-orange/10 transition-colors" 
                style={{ width: "192px", height: "192px" }}
              />
              <div className="w-12 h-12 rounded-xl bg-coral-orange/10 text-coral-orange flex items-center justify-center mb-6">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Conversational Discovery</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-lg">
                  Speak naturally. Skip precise keyword combinations and complex boolean operators. Our voice concierge processes long descriptions of what you need and finds matches instantly.
                </p>
              </div>
            </div>

            {/* Card 2: col-span-1 */}
            <div className="bg-surface-primary border border-surface-secondary rounded-[28px] p-8 flex flex-col justify-between min-h-[260px] hover:border-accent-violet/30 transition-colors duration-300 relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 bg-accent-violet/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-accent-violet/10 transition-colors" 
                style={{ width: "144px", height: "144px" }}
              />
              <div className="w-12 h-12 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Zero Sponsorships</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We display objective matching scores without affiliate rankings or paid listings. You receive recommendations based strictly on popularity and functional relevance.
                </p>
              </div>
            </div>

            {/* Card 3: col-span-1 */}
            <div className="bg-surface-primary border border-surface-secondary rounded-[28px] p-8 flex flex-col justify-between min-h-[260px] hover:border-accent-violet/30 transition-colors duration-300 relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 bg-accent-violet/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-accent-violet/10 transition-colors" 
                style={{ width: "144px", height: "144px" }}
              />
              <div className="w-12 h-12 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center mb-6">
                <GitCompare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Comparison Matrix</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Compare two selected tools side-by-side inside your dashboard. Read AI summaries of pros, cons, target roles, and pricing in real time.
                </p>
              </div>
            </div>

            {/* Card 4: col-span-2 */}
            <div className="md:col-span-2 bg-surface-primary border border-surface-secondary rounded-[28px] p-8 flex flex-col justify-between min-h-[260px] hover:border-coral-orange/30 transition-colors duration-300 relative overflow-hidden group">
              <div 
                className="absolute top-0 right-0 bg-coral-orange/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-coral-orange/10 transition-colors" 
                style={{ width: "192px", height: "192px" }}
              />
              <div className="w-12 h-12 rounded-xl bg-coral-orange/10 text-coral-orange flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Direct API integrations</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-lg">
                  Dicto-ai is built strictly on raw API keys for all tools, eliminating middleman layers or heuristic database fallbacks. Provide your key once and execute directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section id="categories" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-[72px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Structured Exploration</h2>
            <p className="text-text-secondary text-sm md:text-base max-w-md">
              Browse AI tools structured into 8 core product categories.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              slug={cat.slug}
              description={cat.description}
            />
          ))}
        </div>
      </section>

      {/* Trending / Featured Tools Section */}
      <section id="trending" className="py-20 bg-bg-secondary border-t border-b border-surface-primary px-6 scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Trending AI Concierges</h2>
              <p className="text-text-secondary text-sm md:text-base max-w-md">
                Popular tools featured by users and matching top recommendations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Demo Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Precision Comparison</h2>
          <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto">
            Evaluate use cases, strengths, weaknesses, and pricing tiers side-by-side to make the right choice.
          </p>
        </div>

        <div className="bg-surface-primary border border-surface-secondary rounded-[24px] overflow-hidden shadow-modal">
          {/* Header Row */}
          <div className="grid grid-cols-3 border-b border-surface-secondary/70 p-6 bg-bg-secondary/40">
            <div className="font-display font-semibold text-text-muted text-xs tracking-wider uppercase flex items-center">
              Features
            </div>
            <div className="flex flex-col gap-1 px-4">
              <span className="font-display font-bold text-lg text-white">Cursor</span>
              <span className="text-[10px] text-accent-indigo font-medium">Coding Category</span>
            </div>
            <div className="flex flex-col gap-1 px-4">
              <span className="font-display font-bold text-lg text-white">GitHub Copilot</span>
              <span className="text-[10px] text-accent-violet font-medium">Coding Category</span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-surface-secondary/50">
            {/* Description */}
            <div className="grid grid-cols-3 p-6">
              <div className="text-xs font-semibold text-white">Description</div>
              <div className="text-xs text-text-secondary px-4 leading-relaxed">
                AI-first code editor designed from the ground up to integrate deep codebase knowledge and chat.
              </div>
              <div className="text-xs text-text-secondary px-4 leading-relaxed">
                AI pair programmer extension integrating inline suggestions and autocomplete directly inside standard editors.
              </div>
            </div>

            {/* Strengths */}
            <div className="grid grid-cols-3 p-6">
              <div className="text-xs font-semibold text-white">Strengths</div>
              <div className="text-xs text-text-secondary px-4 leading-relaxed">
                <div className="flex items-center gap-1 text-success mb-1 font-medium">
                  <CheckCircle className="w-4 h-4" /> Full code index
                </div>
                Deep codebase search, terminal commands generation, and inline edit features.
              </div>
              <div className="text-xs text-text-secondary px-4 leading-relaxed">
                <div className="flex items-center gap-1 text-success mb-1 font-medium">
                  <CheckCircle className="w-4 h-4" /> Broad IDE support
                </div>
                Excellent inline autocomplete, integrates smoothly into VS Code, JetBrains, and Xcode.
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-3 p-6">
              <div className="text-xs font-semibold text-white">Pricing Model</div>
              <div className="text-xs text-text-secondary px-4">Freemium ($20/mo Pro option)</div>
              <div className="text-xs text-text-secondary px-4">Paid ($10/mo Individual option)</div>
            </div>

            {/* Best For */}
            <div className="grid grid-cols-3 p-6">
              <div className="text-xs font-semibold text-white">Best For</div>
              <div className="text-xs text-accent-indigo px-4 font-semibold">Power developers needing context-aware code generation</div>
              <div className="text-xs text-accent-violet px-4 font-semibold">Developers wanting quick suggestions within familiar workflows</div>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible FAQ Section (PerpetualX Style) */}
      <section className="py-20 border-t border-surface-primary bg-bg-secondary px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-coral-orange/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-[10px] text-coral-orange font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-coral-orange" />
              COMMON QUESTIONS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Everything you need to know about search criteria, pricing options, and API key setups.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-surface-primary border border-surface-secondary rounded-[20px] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 text-white hover:text-coral-orange transition-colors cursor-pointer"
                  >
                    <span className="font-display font-semibold text-sm md:text-base">{faq.question}</span>
                    <span className="shrink-0 text-text-secondary">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-coral-orange" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs text-text-secondary leading-relaxed border-t border-surface-secondary/50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Conversion CTA (PerpetualX Style) */}
      <section className="py-24 border-t border-surface-primary bg-bg-primary px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-coral-orange/10 to-accent-violet/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center z-10 relative flex flex-col items-center gap-8 bg-surface-primary border border-surface-secondary/80 rounded-[32px] p-12 shadow-modal">
          <span className="text-[10px] text-coral-orange font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-coral-orange" />
            GET STARTED TODAY
          </span>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-2xl">
            Find the Perfect AI Tool for Your Next Workspace
          </h2>
          
          <p className="text-text-secondary text-sm md:text-base max-w-lg leading-relaxed">
            Stop digging through sheets and tabs. Describe what you want, compare specifications, and deploy directly with your own keys.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_20px_rgba(255,92,56,0.5)] text-white font-semibold transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Ask With Voice</span>
            </button>
            <a
              href="#categories"
              className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 rounded-medium bg-transparent border border-surface-secondary hover:border-text-secondary text-white font-semibold transition-colors duration-150"
            >
              <span>Explore Categories</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
