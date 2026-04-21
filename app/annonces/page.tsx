"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AnnoncesPage() {
  const pathname = usePathname();

  const annonces = [
    {
      title: "Rentrée scolaire 2025-2026",
      content:
        "La rentrée scolaire est fixée au 2 septembre 2025. Tous les élèves sont priés de se présenter à 7h30 munis de leur matériel scolaire.",
      author: "Jean-Pierre Martin",
      date: "2025-08-15",
      important: true,
      color: "red",
    },
    {
      title: "Réunion parents-professeurs",
      content:
        "Une réunion parents-professeurs aura lieu le 20 septembre à 16h dans la salle polyvalente.",
      author: "Jean-Pierre Martin",
      date: "2025-09-10",
      important: true,
      color: "red",
    },
    {
      title: "Examens du premier trimestre",
      content:
        "Les examens du premier trimestre se dérouleront du 15 au 22 décembre 2025.",
      author: "Marie Louis",
      date: "2025-11-20",
      important: false,
      color: "blue",
    },
    {
      title: "Journée sportive",
      content:
        "La journée sportive annuelle est programmée pour le 5 novembre. Les élèves doivent porter leur tenue de sport.",
      author: "Jean-Pierre Martin",
      date: "2025-10-25",
      important: false,
      color: "blue",
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

          <button
            onClick={() => router.push("/login")}
            className="mt-3 text-blue-200 hover:text-white text-sm"
            >
            Déconnexion
            </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold">Annonces</h1>
            <p className="text-sm text-gray-500">
              Communications et actualités
            </p>
          </div>

          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
            <span className="text-lg">+</span>
            Nouvelle annonce
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {annonces.map((a, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-4 items-start"
            >
              {/* ICON */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${
                  a.color === "red" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}
              >
                📢
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{a.title}</h3>

                  {a.important && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                      Important
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {a.content}
                </p>

                <p className="text-xs text-gray-400">
                  {a.author} • {a.date}
                </p>
              </div>
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