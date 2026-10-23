import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { PromptForm } from "@/components/studio/PromptForm";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureGrid />
      <PromptForm />
    </main>
  );
}
