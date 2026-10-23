"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PresentationPlan } from "@/lib/types";

const defaultPrompt = `Create a 45-second product launch presentation for an AI startup targeting founders and investors. Use a confident, sleek, cinematic tone. Show the problem, solution, traction, and call to action.`;

export default function PresentationStudio() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [presentation, setPresentation] = useState<PresentationPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-storyboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, provider: "auto" })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate presentation");
      }

      setPresentation(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 font-black text-white">
              M
            </div>
            <div>
              <p className="text-xl font-bold text-white">MotionAI Studio</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Presentation Designer</p>
            </div>
          </div>

          <a href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
            Back home
          </a>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Prompt</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Create scene-by-scene motion narratives</h1>
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={10}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-violet-500"
              placeholder="Describe the deck, audience, motion style, and all required story beats"
            />

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate storyboard"}
              </button>

              <button
                onClick={() => setPrompt(defaultPrompt)}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Reset prompt
              </button>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
                {error}
              </div>
            )}
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Preview</p>
            <div className="mt-5 space-y-4">
              {presentation ? (
                <>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Title</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{presentation.title}</h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoCard label="Audience" value={presentation.audience} />
                    <InfoCard label="Tone" value={presentation.tone} />
                    <InfoCard label="Duration" value={`${presentation.duration}s`} />
                    <InfoCard label="Scenes" value={`${presentation.scenes.length}`} />
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-400">
                  Generate a storyboard to preview your presentation flow.
                </div>
              )}
            </div>
          </aside>
        </div>

        {presentation && (
          <section className="mt-10 rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Storyboard</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Scene flow</h2>
              </div>
              <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Export deck
              </button>
            </div>

            <div className="space-y-4">
              {presentation.scenes.map((scene, index) => (
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60"
                >
                  <div
                    className="h-2"
                    style={{
                      background: `linear-gradient(90deg, ${scene.colors.primary}, ${scene.colors.secondary})`
                    }}
                  />

                  <div className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Scene {index + 1}</p>
                      <h3 className="mt-2 text-xl font-bold text-white">{scene.title}</h3>
                      <p className="mt-2 text-slate-300">{scene.subtitle}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Style</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase text-slate-200">
                          {scene.style}
                        </span>
                      </div>
                      <div className="mb-3 flex items-center justify-between text-sm text-slate-200">
                        <span>Animation</span>
                        <span>{scene.animation}</span>
                      </div>
                      <div className="mb-3 flex items-center justify-between text-sm text-slate-200">
                        <span>Duration</span>
                        <span>{scene.duration}s</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(scene.duration / presentation.duration) * 100}%`,
                            background: `linear-gradient(90deg, ${scene.colors.primary}, ${scene.colors.secondary})`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
