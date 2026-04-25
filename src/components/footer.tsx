"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  
  // Hide footer on auth pages
  const hiddenPaths = ["/login", "/signup"];
  if (hiddenPaths.includes(pathname)) return null;

  return (
    <footer className="border-t border-border bg-muted/10 py-16 px-6 mt-auto">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/landing" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground tracking-tight">Narractive Intelligence</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mb-4">
              Industrial-grade AI platform for decoding global news narratives. Built transparent. Deployed at scale.
            </p>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-3 py-1 rounded-full">Built with Antigravity AI</span>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[["/dashboard","Dashboard"],["/analyze","Analyzer"],["/pricing","Pricing"],["/docs","Documentation"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["/about","About"],["/contact","Contact"],["https://github.com/ravatlabs/gdev-h2s-narractive-inteligence-analyzer-nsk-240426","GitHub"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[["/privacy","Privacy Policy"],["/terms","Terms of Service"]].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Narractive Intelligence Analyzer. MIT License · Open Source.</p>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
            <span>Deployed on Vercel</span><span>·</span><span>Open Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
