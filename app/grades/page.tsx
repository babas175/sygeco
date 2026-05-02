"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function NotesPage() {
  const notes = [
    { student: "Pierre Duval", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "17/20", date: "2025-09-15" },
    { student: "Pierre Duval", subject: "Français", class: "6ème A", category: "Examen", grade: "15/20", date: "2025-09-20" },
    { student: "Marie Joseph", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "14/20", date: "2025-09-15" },
    { student: "Marie Joseph", subject: "Français", class: "6ème A", category: "Examen", grade: "18/20", date: "2025-09-20" },
    { student: "Jean Baptiste", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "12/20", date: "2025-09-15" },
    { student: "Marc Désir", subject: "Mathématiques", class: "5ème A", category: "Devoir", grade: "16/20", date: "2025-09-15" },
    { student: "Marc Désir", subject: "Français", class: "5ème A", category: "Quiz", grade: "8/10", date: "2025-09-18" },
    { student: "Esther Noël", subject: "Anglais", class: "4ème A", category: "Participation", grade: "9/10", date: "2025-09-22" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestion des notes"
        description="Saisir et consulter les évaluations."
        actions={
          <Button variant="primary" size="md">
            Ajouter des notes
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20">
          <option>Toutes les classes</option>
        </select>

        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20">
          <option>Toutes les matières</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Élève</th>
              <th className="px-5 py-3">Matière</th>
              <th className="px-5 py-3">Classe</th>
              <th className="px-5 py-3">Catégorie</th>
              <th className="px-5 py-3">Note</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {notes.map((n, i) => (
              <tr key={i} className="transition hover:bg-slate-50/80">
                <td className="px-5 py-3.5 font-medium text-slate-900">{n.student}</td>
                <td className="px-5 py-3.5 text-slate-700">{n.subject}</td>
                <td className="px-5 py-3.5 text-slate-600">{n.class}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80">
                    {n.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`font-semibold tabular-nums ${
                      n.grade.startsWith("1") || n.grade.startsWith("9")
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {n.grade}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500">{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
