"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ElevesPage() {
  const pathname = usePathname();

  const students = [
    { id: "STD-2025-001", name: "Pierre Duval", dob: "2012-03-15", gender: "Masculin", class: "6ème A", initials: "PD" },
    { id: "STD-2025-002", name: "Marie Joseph", dob: "2012-07-22", gender: "Féminin", class: "6ème A", initials: "MJ" },
    { id: "STD-2025-003", name: "Jean Baptiste", dob: "2012-11-08", gender: "Masculin", class: "6ème A", initials: "JB" },
    { id: "STD-2025-004", name: "Anne Clermont", dob: "2012-01-30", gender: "Féminin", class: "6ème A", initials: "AC" },
    { id: "STD-2025-005", name: "Marc Désir", dob: "2011-05-12", gender: "Masculin", class: "5ème A", initials: "MD" },
    { id: "STD-2025-006", name: "Stéphanie François", dob: "2011-09-03", gender: "Féminin", class: "5ème A", initials: "SF" },
    { id: "STD-2025-007", name: "David Paul", dob: "2011-12-25", gender: "Masculin", class: "5ème A", initials: "DP" },
    { id: "STD-2025-008", name: "Esther Noël", dob: "2010-04-18", gender: "Féminin", class: "4ème A", initials: "EN" },
    { id: "STD-2025-009", name: "Samuel Théodore", dob: "2010-08-07", gender: "Masculin", class: "4ème A", initials: "ST" },
    { id: "STD-2025-010", name: "Ruth Bellevue", dob: "2010-02-14", gender: "Féminin", class: "4ème A", initials: "RB" },
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
            <MenuItem href="/administrador/admin" label="Tableau de bord" pathname={pathname} />
            <MenuItem href="/administrador/ecole" label="Écoles" pathname={pathname} />
            <MenuItem href="/administrador/eleves" label="Élèves" pathname={pathname} />
            <MenuItem href="/administrador/enseignants" label="Enseignants" pathname={pathname} />
            <MenuItem href="/administrador/presences" label="Présences" pathname={pathname} />
            <MenuItem href="/administrador/notes" label="Notes" pathname={pathname} />
            <MenuItem href="/administrador/emploi" label="Emploi du temps" pathname={pathname} />
            <MenuItem href="/administrador/annonces" label="Annonces" pathname={pathname} />
            <MenuItem href="/administrador/rapports" label="Rapports" pathname={pathname} />
            <MenuItem href="/administrador/parametres" label="Paramètres" pathname={pathname} />
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
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold">Élèves</h1>
            <p className="text-sm text-gray-500">10 élèves inscrits</p>
          </div>

          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
            <span className="text-lg">+</span>
            Nouvel élève
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-2 mb-4">
          <div className="flex items-center w-full border border-gray-200 rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
            <span className="text-gray-400">🔍</span>
            <input
              placeholder="Rechercher un élève..."
              className="w-full px-2 py-2 outline-none text-sm"
            />
          </div>

          <button className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm hover:bg-gray-50">
            Toutes les classes
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Genre</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-400 text-xs">{s.id}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold">
                        {s.initials}
                      </div>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.dob}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">{s.gender}</td>

                  <td className="px-4 py-3">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                      {s.class}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                      Actif
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right text-gray-400">
                    👁️
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