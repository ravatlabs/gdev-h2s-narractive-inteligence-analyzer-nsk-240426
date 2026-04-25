"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Building2, Globe, Coins } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    badge: null,
    description: "For students, journalists, and curious readers.",
    cta: "Start Free",
    ctaHref: "/signup",
    ctaStyle: "border border-border bg-card text-foreground hover:bg-muted",
    icon: Zap,
    iconGrad: "from-slate-500 to-slate-600",
    features: [
      "50 analyses per month",
      "Basic credibility scoring",
      "Access to 6 topic categories",
      "Dashboard read-only access",
      "Community support",
    ],
    notIncluded: ["API access", "Priority processing", "Custom exports"],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 19,
    yearly: 180,
    badge: "Most Popular",
    description: "For researchers, journalists, and small newsrooms.",
    cta: "Start 14-Day Trial",
    ctaHref: "/signup",
    ctaStyle: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25",
    icon: Globe,
    iconGrad: "from-indigo-500 to-violet-600",
    features: [
      "Unlimited analyses",
      "Full credibility scoring",
      "Source timeline & evidence",
      "CSV export of reports",
      "1,000 API calls/month",
      "Email support",
    ],
    notIncluded: ["White-label", "Custom integrations"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 149,
    yearly: 1499,
    badge: "Best Value",
    description: "For financial firms, hedge funds, and newsrooms.",
    cta: "Request Demo",
    ctaHref: "/contact",
    ctaStyle: "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/25",
    icon: Building2,
    iconGrad: "from-violet-500 to-purple-600",
    features: [
      "Everything in Pro",
      "10,000 API calls/month",
      "WebHook alert integrations",
      "SOC2 compliant data handling",
      "Priority processing (<100ms)",
      "Dedicated account manager",
    ],
    notIncluded: [],
  },
  {
    id: "custom",
    name: "Custom",
    monthly: null,
    yearly: null,
    badge: "Enterprise Scale",
    description: "White-label, government, or high-volume API integrations.",
    cta: "Contact Sales",
    ctaHref: "/contact",
    ctaStyle: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
    icon: Coins,
    iconGrad: "from-amber-500 to-orange-600",
    features: [
      "Everything in Enterprise",
      "Unlimited API calls",
      "White-label deployment",
      "Custom SLA agreement",
      "On-premise option",
      "Dedicated engineering support",
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-500 mb-6">
            <Coins className="h-3.5 w-3.5" /> Transparent Pricing
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5">
            Choose your <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 bg-clip-text text-transparent">plan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Affordable, transparent, and scalable. Start free and upgrade as your intelligence needs grow.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full p-1.5 shadow-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!isYearly ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isYearly ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:text-foreground"}`}
            >
              Yearly
              <span className="text-[10px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = plan.monthly === null ? null : isYearly ? (plan.yearly === 0 ? 0 : Math.round((plan.yearly ?? 0) / 12)) : plan.monthly;
            const isPro = plan.id === "pro";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border p-6 transition-all ${isPro ? "border-indigo-500/50 bg-indigo-500/5 shadow-2xl shadow-indigo-500/10 scale-[1.02]" : "border-border bg-card hover:border-border/80 hover:shadow-lg"}`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${isPro ? "bg-indigo-600 text-white border-indigo-600" : "bg-violet-600 text-white border-violet-600"}`}>
                    {plan.badge}
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.iconGrad} mb-5 w-fit shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h2 className="text-xl font-black text-foreground mb-1">{plan.name}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-5">{plan.description}</p>

                <div className="mb-6">
                  {price === null ? (
                    <div className="text-3xl font-black text-foreground">Custom</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-foreground">${price}</span>
                      <span className="text-sm text-muted-foreground pb-1.5">/mo</span>
                    </div>
                  )}
                  {isYearly && plan.yearly !== null && plan.yearly > 0 && (
                    <div className="text-xs text-emerald-500 font-semibold mt-1">${plan.yearly}/yr · Save ${(plan.monthly! * 12) - plan.yearly!}</div>
                  )}
                </div>

                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all mb-6 ${plan.ctaStyle}`}
                >
                  {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground/50 line-through">
                      <span className="h-3.5 w-3.5 shrink-0 mt-0.5 text-center leading-none">–</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-sm text-muted-foreground space-y-2">
          <p>All plans include SSL encryption, GDPR-compliant data handling, and uptime SLA.</p>
          <p>Questions? <Link href="/contact" className="text-indigo-500 hover:underline font-semibold">Contact our team →</Link></p>
        </div>
      </div>
    </div>
  );
}
