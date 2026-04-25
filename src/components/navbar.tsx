"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogIn,
  Mail,
  Moon,
  Search,
  Sun,
  UserPlus,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Hide Navbar on auth pages
  const hiddenPaths = ["/login", "/signup"];
  if (hiddenPaths.includes(pathname)) return null;

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analyze", label: "Analyzer", icon: Search },
    { href: "/about", label: "About", icon: Users },
    { href: "/docs", label: "Docs", icon: FileText },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* ── Logo ── */}
        <div className="flex items-center gap-8">
          <Link href="/landing" id="navbar-logo" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-lg text-foreground hidden xs:inline-block tracking-tight text-nowrap">
              Narractive Inteligence Analyzer
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
            {navLinks.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                id={`nav-${route.label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-4 py-2 transition-all",
                  pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <route.icon className="h-3.5 w-3.5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              id="navbar-theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all hover:border-primary/50"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Auth buttons — desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              id="navbar-login"
              className="flex items-center gap-1.5 rounded-xl border border-border bg-transparent px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all uppercase tracking-wide"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              id="navbar-signup"
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity uppercase tracking-wide"
            >
              Sign up
            </Link>
          </div>

          <button
            id="navbar-mobile-menu"
            type="button"
            className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-all relative z-[60] pointer-events-auto active:scale-95 cursor-pointer mr-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileOpen((v) => !v);
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold uppercase tracking-widest transition-all",
                pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border mt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-bold text-muted-foreground uppercase tracking-widest"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white uppercase tracking-widest"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
