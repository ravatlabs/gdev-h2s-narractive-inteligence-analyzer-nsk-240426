"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  
  // Hide footer on auth pages
  const hiddenPaths = ["/login", "/signup"];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <footer className="border-t border-border py-8 px-6 bg-muted/20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-indigo-500/80">
            Narractive Inteligence Analyzer
          </p>
          <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">
            Built for H2S Bootcamp · Sandip Foundation · Google for Developers
          </p>
          <p className="text-[10px] text-muted-foreground font-medium pt-1">
            © 2026 Narrative Platform · Nashik Series · Research Alpha
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <span className="h-1 w-1 rounded-full bg-border" />
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <span className="h-1 w-1 rounded-full bg-border" />
          <Link href="/contact" className="hover:text-primary transition-colors">Help</Link>
        </div>
      </div>
    </footer>
  );
}
