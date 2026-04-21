"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EnseignantsPage() {
  const pathname = usePathname();

  const teachers = [
    {
      name: "Marie Louis",
      initials: "ML",
      subject: "Mathématiques & Sciences",
      email: "prof.louis@collegesaintpierre.ht",
      phone: "+509 3456-7890",
      tags: ["Mathématiques", "Sciences Naturelles"],
      class: "6ème A",
    },
    {
      name: "Jacques Jean-Baptiste",
      initials: "JJ",
      subject: "Français & Histoire",
      email: "prof.jean@collegesaintpierre.ht",
      phone: "+509 3456-7891",
      tags: ["Français", "Histoire-Géographie"],
      class: "5ème A",
    },
    {
      name: "Sophie Charles",
      initials: "SC",
      subject: "Anglais",
      email: "prof.charles@collegesaintpierre.ht",
      phone: "+509 3456-7892",
      tags: ["Anglais"],
      class: "4ème A",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b3aa5] text-white flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-white/10">
            <h1 className="font-bold text-lg">SYGECO</h1>
            <p className="text-xs text-blue-200">
              Système de Gestion des Écoles
            </p>
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
            <h1 className="text-xl font-semibold">Enseignants</h1>
            <p className="text-sm text-gray-500">3 enseignants</p>
          </div>

          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
            <span className="text-lg">+</span>
            Nouvel enseignant
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 w-[350px]">
          <div className="flex items-center border border-gray-200 rounded-lg bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
            <span className="text-gray-400">🔍</span>
            <input
              placeholder="Rechercher un enseignant..."
              className="w-full px-2 py-2 outline-none text-sm"
            />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-4">
          {teachers.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.subject}</p>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1 mb-3">
                <p>✉️ {t.email}</p>
                <p>📞 {t.phone}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs">
                {t.class}
              </span>
            </div>
          ))}
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