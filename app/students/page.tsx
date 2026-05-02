"use client";

import { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const students = [
    { id: "STD-001", name: "Pierre Duval", dob: "2012-03-15", gender: "Masculin", class: "6ème A", initials: "PD" },
    { id: "STD-002", name: "Marie Joseph", dob: "2012-07-22", gender: "Féminin", class: "6ème A", initials: "MJ" },
    { id: "STD-003", name: "Jean Baptiste", dob: "2012-11-08", gender: "Masculin", class: "6ème A", initials: "JB" },
    { id: "STD-004", name: "Anne Clermont", dob: "2012-01-30", gender: "Féminin", class: "6ème A", initials: "AC" },
    { id: "STD-005", name: "Marc Désir", dob: "2011-05-12", gender: "Masculin", class: "5ème A", initials: "MD" },
    { id: "STD-006", name: "Stéphanie François", dob: "2011-09-03", gender: "Féminin", class: "5ème A", initials: "SF" },
  ];

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Élèves"
        description={`${filtered.length} élève${filtered.length !== 1 ? "s" : ""} inscrit${filtered.length !== 1 ? "s" : ""}`}
        actions={
          <Button variant="primary" size="md" className="gap-2">
            <Plus size={18} strokeWidth={2} />
            Nouvel élève
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex min-w-0 flex-1 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02] transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <Search size={17} className="shrink-0 text-slate-400" aria-hidden />
          <input
            placeholder="Rechercher un élève..."
            className="w-full border-0 bg-transparent py-2.5 pl-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher"
          />
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Toutes les classes
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Nom</th>
              <th className="px-5 py-3">Sexe</th>
              <th className="px-5 py-3">Classe</th>
              <th className="px-5 py-3">Naissance</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="transition hover:bg-slate-50/80"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white shadow-sm">
                      {s.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-700">{s.gender}</td>

                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                    {s.class}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-600">{s.dob}</td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="inline-flex rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                    aria-label="Voir le profil"
                  >
                    <Eye size={17} strokeWidth={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
