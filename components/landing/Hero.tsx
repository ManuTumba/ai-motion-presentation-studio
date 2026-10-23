import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
            AI motion presentation studio
          </span>

          <h1 className="text-5xl font-black tracking-tight text-white lg:text-7xl">
            Turn ideas into cinematic slides.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Generate scripts, storyboards, and motion-rich presentation sequences using AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#studio"
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-glow transition hover:bg-violet-500"
            >
              Try the studio
            </Link>
            <Link
              href="#features"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              See features
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl">
          <div className="space-y-4">
            <div className="h-3 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Prompt</p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Launch pitch for an AI SaaS startup
              </h2>
            </div>

            <div className="space-y-3">
              {[
                "Story outline generated",
                "Scene-by-scene script written",
                "Visual style and motion timing proposed",
                "Export-ready presentation generated"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
