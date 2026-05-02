"use client";

import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function AnnoncesPage() {
  const annonces = [
    {
      title: "Rentrée scolaire 2025-2026",
      content: "La rentrée scolaire est fixée au 2 septembre 2025...",
      author: "Jean-Pierre Martin",
      date: "2025-08-15",
      important: true,
      tone: "rose" as const,
    },
    {
      title: "Réunion parents-professeurs",
      content: "Une réunion aura lieu...",
      author: "Jean-Pierre Martin",
      date: "2025-09-10",
      important: true,
      tone: "rose" as const,
    },
    {
      title: "Examens du premier trimestre",
      content: "Les examens se dérouleront...",
      author: "Marie Louis",
      date: "2025-11-20",
      important: false,
      tone: "indigo" as const,
    },
    {
      title: "Journée sportive",
      content: "La journée sportive annuelle...",
      author: "Jean-Pierre Martin",
      date: "2025-10-25",
      important: false,
      tone: "indigo" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Annonces"
        description="Communications et actualités de l’établissement."
        actions={
          <Button variant="primary" size="md">
            Nouvelle annonce
          </Button>
        }
      />

      <div className="space-y-4">
        {annonces.map((a, i) => (
          <article
            key={i}
            className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02] transition hover:border-indigo-200/80 hover:shadow-md"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${
                a.tone === "rose"
                  ? "bg-linear-to-br from-rose-500 to-rose-600"
                  : "bg-linear-to-br from-indigo-500 to-violet-600"
              }`}
            >
              <Megaphone size={20} strokeWidth={2} aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900">{a.title}</h3>
                {a.important ? (
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700 ring-1 ring-rose-100">
                    Important
                  </span>
                ) : null}
              </div>

              <p className="text-sm leading-relaxed text-slate-600">{a.content}</p>

              <p className="mt-3 text-xs font-medium text-slate-400">
                {a.author} · {a.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
