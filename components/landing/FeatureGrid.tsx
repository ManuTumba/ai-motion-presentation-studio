const features = [
  {
    title: "AI storyboard generation",
    description:
      "Describe your topic and get a structured, professional presentation sequence in seconds."
  },
  {
    title: "Motion-first UX",
    description:
      "Create sleek, animated visual flows for pitch decks, product demos, and brand storytelling."
  },
  {
    title: "Fast revisions",
    description:
      "Edit slide content, pacing, tone, and visual treatment without starting from scratch."
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white">Built for creative teams and founders</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400" />
            <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
