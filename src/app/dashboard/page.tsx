"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Tool } from "@/store/useAppStore";
import { DbService } from "@/services/dbService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import ToolDetailModal from "@/components/ToolDetailModal";
import CompareModal from "@/components/CompareModal";
import VoiceOrb from "@/components/VoiceOrb";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Mic, 
  GitCompare, 
  Sparkles, 
  SlidersHorizontal, 
  ChevronRight, 
  X,
  Volume2,
  VolumeX,
  Send,
  HelpCircle,
  Globe,
  ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { 
    user, 
    role, 
    voiceState, 
    setVoiceState, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    compareList,
    messages,
    addMessage,
    clearMessages
  } = useAppStore();

  // Component States
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [pricingFilter, setPricingFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modals / Overlays
  const [selectedToolDetail, setSelectedToolDetail] = useState<Tool | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Chat follow up state
  const [followUpText, setFollowUpText] = useState("");
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioChunks = useRef<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  // 1. Fetch categories and initial tools
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const cats = await DbService.getCategories();
        setCategories(cats);
        
        const initialTools = await DbService.getTools({
          category: selectedCategory,
          query: searchQuery,
          role: role,
          pricing: pricingFilter,
        });
        setTools(initialTools);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [selectedCategory, searchQuery, role, pricingFilter]);

  // Scroll to bottom of chat conversation
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, voiceState]);

  // React to voiceState changes to start/stop recording reactively
  useEffect(() => {
    if (voiceState === "listening") {
      handleListeningStart();
    } else if (voiceState === "thinking" && mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    } else if (voiceState === "idle" && mediaRecorder.current && mediaRecorder.current.state === "recording") {
      // Abort without recommending
      mediaRecorder.current.onstop = null;
      mediaRecorder.current.stop();
      if (mediaRecorder.current.stream) {
        mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [voiceState]);

  // Voice Narration handler
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  // Stop narration on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      DbService.logSearch(user?.id, searchQuery, "keyword");
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPricingFilter(null);
  };

  // 4. Voice Orb Speech Handlers
  const handleListeningStart = async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices) return;
    setVoiceError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks.current = [];
      
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorder.current = recorder;
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await uploadAudioAndRecommend(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
    } catch (err: any) {
      console.error("Microphone access blocked:", err);
      setVoiceError("Microphone access was denied. Check permissions.");
      setVoiceState("idle");
    }
  };

  const handleListeningEnd = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  // Upload parsed audio blob and request recommendations
  const uploadAudioAndRecommend = async (blob: Blob) => {
    setVoiceState("thinking");
    try {
      const formData = new FormData();
      formData.append("file", blob);

      // Call Sarvam STT REST API
      const sttRes = await fetch("/api/voice", {
        method: "POST",
        body: formData,
      });

      if (!sttRes.ok) {
        const errData = await sttRes.json();
        throw new Error(errData.error || "Voice transcription failed.");
      }

      const sttData = await sttRes.json();
      const transcript = sttData.transcript || "";
      
      if (!transcript) {
        throw new Error("No speech detected. Please speak clearly.");
      }

      // Log voice completed analytics event
      await DbService.logAnalytics(user?.id, "voice_completed", { query: transcript });
      await DbService.logSearch(user?.id, transcript, "voice");

      // Request recommendations passing isVoice: true
      await requestRecommendations(transcript, true);
    } catch (err: any) {
      console.error(err);
      setVoiceError(err.message || "Failed to transcribe audio.");
      setVoiceState("idle");
    }
  };

  // Send query to recommend engine
  const requestRecommendations = async (queryText: string, isVoiceQuery: boolean = false) => {
    setVoiceState("thinking");
    setAiLoading(true);
    setVoiceError(null);
    
    addMessage({
      id: Math.random().toString(),
      sender: "user",
      text: queryText,
    });

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          role: role || "None",
          category: selectedCategory || "None",
          userId: user?.id || null,
          isVoice: isVoiceQuery,
          history: messages.slice(-5).map((m) => ({ role: m.sender === "ai" ? "assistant" : "user", content: m.text })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Recommendation request failed.");
      }

      const data = await res.json();
      if (data.success && data.recommendations && data.recommendations.length > 0) {
        const recTools = data.recommendations.map((r: any) => r.details);
        
        addMessage({
          id: Math.random().toString(),
          sender: "ai",
          text: `Here are the top matches for your goal: ${data.recommendations.map((r: any) => r.tool).join(", ")}.`,
          recommendations: recTools,
        });

        setVoiceState("results");

        // Narration of the top recommendation
        const topRec = data.recommendations[0];
        const speechText = `My top recommendation is ${topRec.tool}. ${topRec.why_it_fits} Best use case is ${topRec.best_use_case}.`;
        speakText(speechText);
      } else {
        throw new Error(data.error || "No recommendations compiled.");
      }
    } catch (err: any) {
      console.error(err);
      addMessage({
        id: Math.random().toString(),
        sender: "ai",
        text: `Error: ${err.message || "Failed to retrieve recommendations."}`,
      });
      setVoiceState("idle");
    } finally {
      setAiLoading(false);
    }
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpText.trim()) return;
    const queryVal = followUpText;
    setFollowUpText("");
    requestRecommendations(queryVal, false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-8 gap-8 relative">
        {/* Left Category Explorer Sidebar (Desktop) */}
        <aside className={`flex flex-col gap-6 shrink-0 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full w-0 opacity-0 pointer-events-none absolute"
        } hidden lg:flex`} style={{ width: sidebarOpen ? "260px" : "0px" }}>
          <div className="flex flex-col gap-2">
            <h2 className="font-display font-bold text-xs text-text-secondary uppercase tracking-widest">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {/* Category null: All Tools */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`p-4 rounded-rounded-md border flex flex-col justify-between aspect-[1.1] hover:-translate-y-0.5 transition-all cursor-pointer text-left focus:outline-none ${
                  selectedCategory === null
                    ? "bg-white border-white text-black-base shadow-sm"
                    : "bg-surface-primary border-surface-secondary text-text-secondary hover:bg-surface-secondary hover:border-text-secondary/40"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] font-bold">00</span>
                  <span className="text-[10px] opacity-60">→</span>
                </div>
                <span className="font-display font-bold text-[11px] uppercase tracking-wider">All Tools</span>
              </button>

              {/* Loop categories */}
              {categories.map((cat, idx) => {
                const isSelected = selectedCategory === cat.name;
                const num = String(idx + 1).padStart(2, "0");
                
                // Color mappings for active states
                const activeColorClasses = [
                  "bg-warm-cream border-warm-cream text-black-base", // 01
                  "bg-vivid-purple border-vivid-purple text-white", // 02
                  "bg-coral-orange border-coral-orange text-white", // 03
                  "bg-amber-yellow border-amber-yellow text-black-base", // 04
                  "bg-deep-blue border-deep-blue text-white", // 05
                  "bg-[#22C55E] border-[#22C55E] text-white", // 06
                  "bg-accent-indigo border-accent-indigo text-white", // 07
                  "bg-[#0d9488] border-[#0d9488] text-white", // 08
                ];
                const activeStyle = activeColorClasses[idx % activeColorClasses.length];

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-4 rounded-rounded-md border flex flex-col justify-between aspect-[1.1] hover:-translate-y-0.5 transition-all cursor-pointer text-left focus:outline-none ${
                      isSelected
                        ? activeStyle
                        : "bg-surface-primary border-surface-secondary text-text-secondary hover:bg-surface-secondary hover:border-text-secondary/40"
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-[10px] font-bold">{num}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </div>
                    <span className="font-display font-bold text-[11px] uppercase tracking-wider line-clamp-2 mt-2">
                      {cat.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer switcher & socials */}
          <div className="mt-auto pt-6 flex flex-col gap-4 border-t border-surface-primary">
            {/* Language switcher */}
            <div className="flex items-center justify-between p-4 rounded-rounded-sm bg-surface-primary border border-surface-secondary text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-text-muted" />
                <span>Ελληνικά</span>
              </div>
              <span className="text-[10px] text-text-muted font-bold uppercase">GR</span>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 justify-center text-text-muted py-2">
              <a href="#" className="hover:text-white transition-colors duration-150">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-150">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-150">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Core Workspace Content Area */}
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Top Filter and Search row */}
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSearchSubmit} className="flex gap-4 relative">
              {/* Search input height 56px */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe your goal (e.g. 'I need help debugging React code')..."
                  className="w-full pl-12 pr-14 rounded-medium bg-surface-primary border border-surface-secondary text-white text-xs focus:outline-none focus:border-accent-indigo/40 transition-colors duration-150 placeholder:text-text-muted"
                  style={{ height: "56px" }}
                />
              </div>

              {/* Toggle Category filter on mobile */}
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-4 rounded-medium bg-surface-primary border border-surface-secondary text-text-secondary hover:text-white transition-colors cursor-pointer"
                title="Toggle Categories"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Microphone trigger inside input */}
              <button
                type="button"
                onClick={() => {
                  setVoiceState(voiceState === "listening" ? "idle" : "listening");
                }}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-150 cursor-pointer ${
                  voiceState === "listening"
                    ? "bg-error text-white animate-pulse"
                    : "bg-surface-secondary text-text-secondary hover:text-white"
                }`}
                title="Search using voice"
              >
                <Mic className="w-4 h-4" />
              </button>
            </form>

            {/* Horizontal pills for Mobile categories and Pricing filters */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Pricing Filter Pills */}
              <button
                onClick={() => setPricingFilter(null)}
                className={`px-4 py-2 rounded-pill text-[10px] font-semibold border transition-all cursor-pointer ${
                  pricingFilter === null 
                    ? "bg-white text-zinc-950 border-white" 
                    : "bg-surface-primary border-surface-secondary text-text-secondary hover:text-white"
                }`}
              >
                All Prices
              </button>
              {["free", "freemium", "paid"].map((price) => (
                <button
                  key={price}
                  onClick={() => setPricingFilter(price)}
                  className={`px-4 py-2 rounded-pill text-[10px] font-semibold border transition-all capitalize cursor-pointer ${
                    pricingFilter === price 
                      ? "bg-white text-zinc-950 border-white" 
                      : "bg-surface-primary border-surface-secondary text-text-secondary hover:text-white"
                  }`}
                >
                  {price}
                </button>
              ))}

              {/* Clear filters trigger */}
              {(selectedCategory || searchQuery || pricingFilter) && (
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] font-semibold text-accent-indigo hover:text-white underline cursor-pointer ml-auto transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Error Message alert */}
          {voiceError && (
            <div className="p-4 rounded-medium border border-error/20 bg-error/5 text-error text-xs font-semibold flex justify-between items-center">
              <span>{voiceError}</span>
              <button onClick={() => setVoiceError(null)} className="p-1 rounded hover:bg-error/10">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Active Voice Assistant Panel (Cinema Display) */}
          <AnimatePresence>
            {voiceState !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full bg-bg-secondary border border-accent-indigo/20 rounded-[24px] p-6 flex flex-col gap-6 shadow-[0_0_40px_rgba(255,92,56,0.05)] relative overflow-hidden"
              >
                {/* Close voice assistant */}
                <button
                  onClick={() => {
                    setVoiceState("idle");
                    clearMessages();
                  }}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-surface-primary hover:bg-surface-secondary text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Voice Header with state animations */}
                <div className="flex items-center justify-between border-b border-surface-primary pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
                    <span className="font-display font-semibold text-xs tracking-wider text-white uppercase">
                      AI Concierge Session
                    </span>
                  </div>

                  {/* TTS Voice Narration Toggle */}
                  <button
                    onClick={() => setTtsEnabled(!ttsEnabled)}
                    className="flex items-center gap-2 text-[10px] font-semibold text-text-secondary hover:text-white transition-colors cursor-pointer"
                  >
                    {ttsEnabled ? <Volume2 className="w-4 h-4 text-accent-indigo" /> : <VolumeX className="w-4 h-4" />}
                    <span>{ttsEnabled ? "Speech Enabled" : "Speech Muted"}</span>
                  </button>
                </div>

                {/* Conversation Chat Scroll Area */}
                <div className="max-h-[300px] overflow-y-auto flex flex-col gap-4 px-2 py-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-large text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-accent-indigo/10 border border-accent-indigo/20 text-white"
                            : "bg-surface-primary border border-surface-secondary text-text-secondary"
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Display recommendation results inside the response card */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="flex flex-col gap-4 mt-4 w-full">
                          <span className="text-[10px] font-bold text-accent-violet uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent-violet" />
                            AI Selected Recommendations
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {msg.recommendations.map((recTool, index) => (
                              <div
                                key={recTool.id}
                                onClick={() => setSelectedToolDetail(recTool)}
                                className="p-4 bg-surface-primary border border-surface-secondary rounded-medium hover:border-accent-indigo/30 transition-all cursor-pointer flex justify-between items-center"
                              >
                                <div className="flex flex-col gap-2">
                                  <span className="text-xs font-semibold text-white">{recTool.name}</span>
                                  <span className="text-[10px] text-text-muted capitalize">{recTool.category}</span>
                                </div>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-accent-indigo/10 text-accent-indigo uppercase border border-accent-indigo/10 shrink-0">
                                  {index === 0 ? "Best Match" : index < 3 ? "Strong Match" : "Good Match"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Skeletons while thinking */}
                  {voiceState === "thinking" && (
                    <div className="flex flex-col gap-2 max-w-[60%] self-start animate-pulse">
                      <div className="h-8 bg-surface-primary rounded-large w-full" />
                      <div className="h-6 bg-surface-primary rounded-large" style={{ width: "75%" }} />
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>

                {/* Central Microphone Orb Trigger in Listening Mode */}
                {voiceState === "listening" && (
                  <div className="flex flex-col items-center justify-center py-6 gap-2">
                    <VoiceOrb />
                    <span className="text-xs text-error font-semibold uppercase animate-pulse tracking-wide mt-2">
                      Listening to your microphone...
                    </span>
                  </div>
                )}

                {/* Follow-up query input bar */}
                {(voiceState === "results" || voiceState === "thinking") && (
                  <form onSubmit={handleFollowUpSubmit} className="flex gap-2 border-t border-surface-primary pt-4 mt-2">
                    <input
                      type="text"
                      value={followUpText}
                      onChange={(e) => setFollowUpText(e.target.value)}
                      placeholder="Add follow-up instructions (e.g. 'I want something free' or 'Only easy ones')..."
                      className="flex-1 h-12 px-4 rounded-medium bg-surface-primary border border-surface-secondary text-white text-xs focus:outline-none focus:border-accent-indigo/40 placeholder:text-text-muted"
                      disabled={aiLoading}
                    />
                    <button
                      type="submit"
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-accent-indigo to-accent-violet rounded-medium text-white hover:shadow-[0_0_10px_rgba(255,92,56,0.3)] transition-all cursor-pointer disabled:opacity-50"
                      disabled={aiLoading || !followUpText.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tools Grid */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-semibold text-lg text-white">
                {selectedCategory ? `${selectedCategory} AI Tools` : "All AI Tools"}
                <span className="text-xs text-text-muted font-normal ml-2">
                  ({tools.length} found)
                </span>
              </h2>

              {/* Floating Compare trigger */}
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-medium bg-accent-indigo text-white text-xs font-semibold hover:shadow-[0_0_15px_rgba(255,92,56,0.5)] hover:scale-[1.02] cursor-pointer transition-all shrink-0"
                >
                  <GitCompare className="w-4 h-4" />
                  <span>Compare Selected ({compareList.length}/2)</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full aspect-[4/3] bg-surface-primary border border-surface-secondary rounded-medium p-4 flex flex-col justify-between animate-pulse" />
                ))}
              </div>
            ) : tools.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 border border-dashed border-surface-secondary rounded-[24px] text-center gap-4 bg-bg-secondary/20">
                <HelpCircle className="w-12 h-12 text-text-muted" />
                <div>
                  <h3 className="font-display font-semibold text-base text-white">No tools found</h3>
                  <p className="text-xs text-text-secondary max-w-xs mt-2">
                    Try adjusting your search criteria, pricing filters, or select a different category.
                  </p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-surface-primary border border-surface-secondary rounded-medium text-xs font-semibold text-white hover:border-text-secondary cursor-pointer transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    onOpenDetails={(t) => setSelectedToolDetail(t)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {/* Floating Orb trigger */}
      {voiceState === "idle" && (
        <VoiceOrb onListeningStart={handleListeningStart} onListeningEnd={handleListeningEnd} />
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedToolDetail && (
          <ToolDetailModal
            tool={selectedToolDetail}
            onClose={() => setSelectedToolDetail(null)}
          />
        )}
      </AnimatePresence>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <CompareModal onClose={() => setShowCompareModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
