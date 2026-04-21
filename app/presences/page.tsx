"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PresencesPage() {
  const pathname = usePathname();

  const students = [
    { name: "Pierre Duval", initials: "PD", class: "6ème A", status: "present" },
    { name: "Marie Joseph", initials: "MJ", class: "6ème A", status: "present" },
    { name: "Jean Baptiste", initials: "JB", class: "6ème A", status: "absent" },
    { name: "Anne Clermont", initials: "AC", class: "6ème A", status: "late" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b3aa5] text-white flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-white/10">
            <h1 className="font-bold text-lg">SYGECO</h1>
            <p className="text-xs text-blue-200">Système de Gestion des Écoles</p>
          </div>

          <nav className="p-3 space-y-1 text-sm">
            <MenuItem href="/admin" label="Tableau de bord" pathname={pathname} />
            <MenuItem href="/ecole" label="Écoles" pathname={pathname} />
            <MenuItem href="/eleves" label="Élèves" pathname={pathname} />
            <MenuItem href="/enseignants" label="Enseignants" pathname={pathname} />
            <MenuItem href="/presences" label="Présences" pathname={pathname} />
            <MenuItem href="/notes" label="Notes" pathname={pathname} />
            <MenuItem href="/emploi" label="Emploi du temps" pathname={pathname} />
            <MenuItem href="/annonces" label="Annonces" pathname={pathname} />
            <MenuItem href="/rapports" label="Rapports" pathname={pathname} />
            <MenuItem href="/parametres" label="Paramètres" pathname={pathname} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-white text-blue-900 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
              AS
            </div>
            <div>
              <p className="font-medium">Admin SYGECO</p>
              <p className="text-xs text-blue-200">super admin</p>
            </div>
          </div>

          <button className="mt-3 text-blue-200 hover:text-white text-sm">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {/* TITLE */}
        <h1 className="text-xl font-semibold mb-1">
          Gestion des présences
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Enregistrer et consulter les présences
        </p>

        {/* FILTERS */}
        <div className="flex gap-3 mb-6">
          <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm">
            <option>6ème A</option>
            <option>5ème A</option>
            <option>4ème A</option>
          </select>

          <input
            type="date"
            defaultValue="2025-09-02"
            className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm"
          />

          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
            Enregistrer
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Élève</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-left">Statut</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold">
                        {s.initials}
                      </div>
                      <p className="font-medium">{s.name}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-600">{s.class}</td>

                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* MENU */
function MenuItem({ href, label, pathname }: any) {
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`px-3 py-2 rounded-lg cursor-pointer ${
          active ? "bg-white/10 font-medium" : "hover:bg-white/10"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: any) {
  if (status === "present") {
    return (
      <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
        ✓ Présent
      </span>
    );
  }

  if (status === "absent") {
    return (
      <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs">
        ✕ Absent
      </span>
    );
  }

  return (
    <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full text-xs">
      ⏱ En retard
    </span>
  );
}