"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function AttendancePage() {
  const students = [
    { name: "Pierre Duval", initials: "PD", class: "6ème A", status: "present" },
    { name: "Marie Joseph", initials: "MJ", class: "6ème A", status: "present" },
    { name: "Jean Baptiste", initials: "JB", class: "6ème A", status: "absent" },
    { name: "Anne Clermont", initials: "AC", class: "6ème A", status: "late" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Gestion des présences"
        description="Enregistrer et consulter les présences par classe."
      />

      <div className="flex flex-wrap items-center gap-2">
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20">
          <option>6ème A</option>
          <option>5ème A</option>
          <option>4ème A</option>
        </select>

        <input
          type="date"
          defaultValue="2025-09-02"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
        />

        <Button variant="primary" size="md" className="sm:ml-1">
          Enregistrer
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Élève</th>
              <th className="px-5 py-3">Classe</th>
              <th className="px-5 py-3">Statut</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {students.map((s, i) => (
              <tr key={i} className="transition hover:bg-slate-50/80">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white shadow-sm">
                      {s.initials}
                    </div>
                    <p className="font-medium text-slate-900">{s.name}</p>
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-700">{s.class}</td>

                <td className="px-5 py-4">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "present") {
    return (
      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
        Présent
      </span>
    );
  }

  if (status === "absent") {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-800 ring-1 ring-red-100">
        Absent
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
      En retard
    </span>
  );
}
