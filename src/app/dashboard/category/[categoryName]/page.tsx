import { redirect } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ categoryName: string }> }) {
  // We use client-side state for categories now for smooth framer-motion animations
  // so we redirect any direct category links back to the main dashboard.
  redirect("/dashboard");
}
