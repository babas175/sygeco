"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotesPage() {
  const pathname = usePathname();

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
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold">Gestion des notes</h1>
            <p className="text-sm text-gray-500">Saisir et consulter les notes</p>
          </div>

          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
            <span className="text-lg">+</span>
            Ajouter des notes
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4">
          <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm">
            <option>Toutes les classes</option>
          </select>

          <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm">
            <option>Toutes les matières</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Élève</th>
                <th className="px-4 py-3 text-left">Matière</th>
                <th className="px-4 py-3 text-left">Classe</th>
                <th className="px-4 py-3 text-left">Catégorie</th>
                <th className="px-4 py-3 text-left">Note</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((n, i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{n.student}</td>
                  <td className="px-4 py-3">{n.subject}</td>
                  <td className="px-4 py-3 text-gray-600">{n.class}</td>

                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {n.category}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        n.grade.startsWith("1") || n.grade.startsWith("9")
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {n.grade}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {n.date}
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