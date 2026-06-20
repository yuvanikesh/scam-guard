"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [email, setEmail] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleOAuthLogin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured. Google OAuth is unavailable.");
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to initiate login." });
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage(null);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured. Email OTP is unavailable.");
      }

      if (!otpMode) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
          },
        });
        if (error) throw error;
        setOtpMode(true);
        setMessage({ type: "success", text: "OTP sent to your email address." });
      } else {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: otpCode,
          type: "email",
        });
        if (error) throw error;
        if (data.user) {
          setUser({ email: data.user.email || email, id: data.user.id });
          router.push("/onboarding");
        }
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Verification failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[256px] h-[256px] rounded-full bg-accent-indigo/5 blur-[96px] pointer-events-none" />

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors duration-150"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="w-full max-w-md bg-surface-primary border border-surface-secondary rounded-[24px] p-8 md:p-8 shadow-modal z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-indigo to-accent-violet flex items-center justify-center font-display font-semibold text-white">
            D
          </div>
          <h1 className="font-display font-bold text-2xl text-white mt-4">Welcome to AI-Dicto</h1>
          <p className="text-xs text-text-secondary">Sign in to save favorites and receive personalized recommendations.</p>
        </div>

        {/* Alerts / Messages */}
        {message && (
          <div
            className={`p-4 rounded-medium text-xs font-semibold border ${
              message.type === "success"
                ? "bg-success/10 border-success/20 text-success"
                : "bg-error/10 border-error/20 text-error"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Supabase status indicator */}
        {!isSupabaseConfigured() && (
          <div className="p-4 rounded-medium bg-warning/5 border border-warning/20 flex gap-2 items-start">
            <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-warning uppercase tracking-wider">Supabase Connection Missing</span>
              <span className="text-[11px] text-text-secondary leading-relaxed">
                Supabase URL and Anon Key are missing in environment variables. Login is disabled.
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="flex flex-col gap-6">
          {/* OAuth button */}
          <button
            onClick={handleOAuthLogin}
            disabled={loading || !isSupabaseConfigured()}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-medium bg-white hover:bg-white/90 text-zinc-950 font-semibold transition-colors duration-150 cursor-pointer disabled:opacity-50"
          >
            {/* Google G-logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.97 1 12 1 7.35 1 3.39 3.65 1.39 7.5l3.85 2.99C6.18 7.37 8.85 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z"
              />
              <path
                fill="#FBBC05"
                d="M5.24 14.49c-.25-.75-.39-1.56-.39-2.49s.14-1.74.39-2.49L1.39 6.5C.5 8.3.01 10.3.01 12.4s.49 4.1 1.38 5.9l3.85-2.81z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.08.72-2.48 1.16-4.2 1.16-3.15 0-5.82-2.33-6.76-5.45L1.39 16.3C3.39 20.15 7.35 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-text-muted">
            <div className="h-[1px] bg-surface-secondary flex-1" />
            <span>OR</span>
            <div className="h-[1px] bg-surface-secondary flex-1" />
          </div>

          {/* Email OTP form */}
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            {!otpMode ? (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full h-12 pl-12 pr-4 rounded-medium bg-bg-secondary border border-surface-secondary text-white text-xs focus:outline-none focus:border-accent-indigo transition-colors duration-150"
                    disabled={!isSupabaseConfigured()}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary">Verification Code (OTP)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full h-12 text-center rounded-medium bg-bg-secondary border border-surface-secondary text-white tracking-widest text-lg font-bold focus:outline-none focus:border-accent-indigo transition-colors duration-150"
                  disabled={!isSupabaseConfigured()}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured()}
              className="w-full flex items-center justify-center h-12 rounded-medium bg-gradient-to-r from-accent-indigo to-accent-violet hover:shadow-[0_0_15px_rgba(255,92,56,0.4)] text-white font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              {otpMode ? "Verify Code" : "Send One-Time Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
