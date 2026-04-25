"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score - 1] : "bg-muted"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">
          {score > 0 && <span className={`uppercase tracking-tighter ${score === 4 ? "text-emerald-500" : score === 3 ? "text-amber-500" : "text-orange-500"}`}>{labels[score - 1]}</span>}
        </span>
        <div className="flex gap-2">
          {checks.map((c) => (
            <span key={c.label} className={`text-[9px] font-bold uppercase transition-colors ${c.ok ? "text-emerald-500" : "text-muted-foreground"}`}>
              {c.ok ? "✓" : "·"} {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleMockOAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground overflow-hidden relative">
      {/* Mobile background optimized blobs */}
      <div className="lg:hidden absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="lg:hidden absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      {/* ── Left side — Content ────────────────────────────────────── */}
      <div className="flex items-center justify-center px-6 py-12 lg:py-0 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/landing" className="flex items-center gap-2.5 mb-10 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Narractive Inteligence Analyzer</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold transition-colors">
              Sign in instead
            </Link>
          </p>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={handleMockOAuth}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-card py-2.5 text-sm font-bold text-foreground hover:bg-muted transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </button>
            <button
              type="button"
              onClick={handleMockOAuth}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-card py-2.5 text-sm font-bold text-foreground hover:bg-muted transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          <div className="relative flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] font-bold text-muted-foreground shrink-0 uppercase tracking-widest">or create with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya Patel"
                  className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya.patel@example.in"
                  className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full rounded-lg border border-border bg-card pl-10 pr-10 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="signup-terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-border bg-muted accent-primary shrink-0 transition-all"
                required
              />
              <label htmlFor="signup-terms" className="text-xs font-medium text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline font-bold transition-all">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-primary hover:underline font-bold transition-all">Privacy Policy</Link>
              </label>
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading || !agreed}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right side — Branding panel ────────────────────────────── */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-900">
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-black/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 max-w-sm text-center px-8 text-white">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rotate-3">
            <Activity className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight uppercase">
            Join the Intelligence Revolution
          </h2>
          <p className="text-indigo-100/80 leading-relaxed mb-10 text-lg font-medium">
            Access real-time narrative analysis, transparent credibility scoring,
            and a community of critical thinkers.
          </p>

          {/* Testimonial */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-left shadow-2xl">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-4 rounded-full bg-amber-400" />
              ))}
            </div>
            <p className="text-base text-indigo-50/90 italic font-medium leading-relaxed mb-6">
              &ldquo;Narractive Inteligence Analyzer gave me a completely new way to process breaking news. The
              transparency reports are unlike anything else out there.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 font-bold text-sm shadow-inner">
                PN
              </div>
              <div>
                <div className="font-extrabold text-white text-sm uppercase">Priya Nair</div>
                <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Investigative Journalist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
