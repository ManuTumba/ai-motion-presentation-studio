"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const samplePrompt = `Create a 45-second product launch presentation for an AI startup targeting founders and investors. Use a confident, modern tone. Keep it sleek and cinematic.`;

export function PromptForm() {
  const [prompt, setPrompt] = useState(samplePrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="studio" className="mx-auto max-w-7xl px-6 pb-24 pt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">Generate a motion presentation</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <label className="mb-3 block text-sm font-medium text-slate-200">Your brief</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-100 outline-none focus:border-violet-500"
            placeholder="Describe the deck, audience, tone, and motion style"
          />

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate storyboard"}
            </button>
            <button
              onClick={() => setPrompt(samplePrompt)}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Use sample
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
              {error}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Generated storyboard</h3>

          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Title</p>
                <h4 className="mt-1 text-2xl font-bold text-white">{result.title}</h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard label="Audience" value={result.audience} />
                <InfoCard label="Tone" value={result.tone} />
                <InfoCard label="Duration" value={`${result.duration}s`} />
                <InfoCard label="Scenes" value={`${result.scenes?.length || 0}`} />
              </div>

              <div className="mt-5 space-y-3">
                {result.scenes?.map((scene: any, index: number) => (
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Scene {index + 1}</p>
                        <h5 className="mt-1 text-lg font-semibold text-white">{scene.title}</h5>
                      </div>
                      <span className="rounded-full bg-violet-500/20 px-2 py-1 text-xs text-violet-200">
                        {scene.animation}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{scene.subtitle}</p>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${(scene.duration / result.duration) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300">
              No storyboard generated yet. Try a prompt.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}
