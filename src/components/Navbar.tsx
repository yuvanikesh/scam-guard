"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Mic, User, LogOut, Bookmark, BarChart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, setVoiceState, setUser, setRole } = useAppStore();

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-bg-primary/80 backdrop-blur-md border-b border-surface-primary flex items-center justify-between px-6 md:px-12 transition-all duration-250">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-4 group">
        <div className="group-hover:scale-105 transition-transform duration-150 shrink-0">
          <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" fill="#FFFFFF" />
            <circle cx="12" cy="12" r="11" stroke="#000000" strokeWidth="2" />
            <rect x="5.5" y="8.5" width="13" height="7" rx="3.5" fill="#000000" />
            <circle cx="9" cy="12" r="1.5" fill="#B3B3B3" />
            <circle cx="15" cy="12" r="1.5" fill="#FFFFFF" />
            <path d="M10 17.5 Q12 19 14 17.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-white font-serif font-bold text-lg leading-none">
            <span>Dicto</span>
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-white/60 text-[8px] font-sans font-bold mx-1 text-white/80 shrink-0">Ai</span>
            <span>– ai</span>
          </div>
          <span className="text-[9px] text-text-secondary tracking-wider font-sans mt-0.5 leading-none">
            Get the Right – One.
          </span>
        </div>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {user && (
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors duration-150 ${
              pathname === "/dashboard" ? "text-white" : "text-text-secondary hover:text-white"
            }`}
          >
            Dashboard
          </Link>
        )}
        {user && (
          <Link
            href="/dashboard/favorites"
            className="text-sm font-medium text-text-secondary hover:text-white flex items-center gap-1 transition-colors duration-150"
          >
            <Bookmark className="w-4 h-4" />
            Favorites
          </Link>
        )}
        {user && (
          <Link
            href="/admin"
            className="text-sm font-medium text-text-secondary hover:text-white flex items-center gap-1 transition-colors duration-150"
          >
            <BarChart className="w-4 h-4" />
            Admin
          </Link>
        )}
      </nav>

      {/* CTA / Actions */}
      <div className="flex items-center gap-4">
        {/* Voice Trigger */}
        <button
          onClick={() => {
            setVoiceState("listening");
            if (pathname !== "/dashboard" && pathname !== "/") {
              router.push("/dashboard");
            }
          }}
          className="flex items-center gap-2 px-6 h-12 rounded-pill bg-coral-orange hover:shadow-[0_0_20px_rgba(255,92,56,0.4)] text-white text-sm font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          <span className="hidden sm:inline">Ask With Voice</span>
        </button>

        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-surface-primary">
            {role && (
              <span className="hidden lg:inline text-xs font-semibold px-2.5 py-1 rounded-pill bg-surface-primary text-accent-indigo border border-accent-indigo/20 capitalize">
                {role}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-bg-secondary hover:bg-surface-secondary text-text-secondary hover:text-white transition-colors duration-150 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 h-12 rounded-medium bg-surface-primary border border-surface-secondary hover:border-text-secondary text-white text-sm font-semibold transition-colors duration-150"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </header>
  );
}
