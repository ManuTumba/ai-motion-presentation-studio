import Link from "next/link";

const featureCards = [
  {
    title: "Prompt to storyboard",
    description: "Describe the deck, audience, and tone. AI writes the scene flow and visual direction instantly."
  },
  {
    title: "Cinematic motion layouts",
    description: "Generate modern motion blocks for product launches, sales decks, and founder narratives."
  },
  {
    title: "Export-ready slides",
    description: "Organize scenes, adjust timing, and prepare your presentation for export or sharing."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 font-black text-white">
            M
          </div>
          <span className="text-lg font-semibold text-white">MotionAI Studio</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="#features" className="hover:text-white">Features</Link>
          <Link href="#workflow" className="hover:text-white">Workflow</Link>
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10">
            Open Studio
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-12 lg:grid-cols-2 lg:pt-20">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-300">
            AI motion presentation engine
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white lg:text-7xl">
            Build cinematic decks from a single prompt.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Generate motion-first presentations, visual storyboards, and launch-ready scenes powered by Claude or GPT.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/studio"
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_35px_rgba(124,58,237,0.45)] transition hover:bg-violet-500"
            >
              Start creating
            </Link>
            <Link
              href="#features"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore features
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
            <div>
              <div className="text-3xl font-bold text-white">5x</div>
              <div>faster concepting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">AI</div>
              <div>story + style outputs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">MP4</div>
              <div>export ready</div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl">
          <div className="rounded-[22px] border border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/20 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="h-3 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                Draft
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Prompt</p>
                <h2 className="mt-2 text-2xl font-bold text-white">AI launch video for a SaaS platform</h2>
              </div>

              {[
                "Storyboard generated",
                "Scene pacing mapped",
                "Narration and transitions selected",
                "Visual style tuned to brand"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Features</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Everything needed to shape an AI presentation</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400" />
              <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Workflow</p>
            <h2 className="mt-3 text-3xl font-bold text-white">From idea to motion-ready deck</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              ["1", "Describe the brief"],
              ["2", "AI builds scenes"],
              ["3", "Edit timing and style"],
              ["4", "Export and share"],
            ].map(([step, label]) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-white">
                  {step}
                </div>
                <p className="text-lg font-medium text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
