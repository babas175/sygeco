"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmploiPage() {
  const pathname = usePathname();

  const schedule = {
    Lundi: [
      {
        time: "07:30 - 09:00",
        subject: "Mathématiques",
        teacher: "Marie Louis",
        room: "Salle 101",
      },
      {
        time: "09:15 - 10:45",
        subject: "Français",
        teacher: "Jacques Jean-Baptiste",
        room: "Salle 101",
      },
      {
        time: "11:00 - 12:30",
        subject: "Sciences Naturelles",
        teacher: "Marie Louis",
        room: "Labo",
      },
    ],
    Mardi: [
      {
        time: "07:30 - 09:00",
        subject: "Anglais",
        teacher: "Sophie Charles",
        room: "Salle 101",
      },
      {
        time: "09:15 - 10:45",
        subject: "Histoire-Géographie",
        teacher: "Jacques Jean-Baptiste",
        room: "Salle 101",
      },
    ],
    Mercredi: [
      {
        time: "07:30 - 09:00",
        subject: "Mathématiques",
        teacher: "Marie Louis",
        room: "Salle 101",
      },
    ],
  };

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
        <h1 className="text-xl font-semibold mb-1">
          Emploi du temps
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Planning hebdomadaire des cours
        </p>

        {/* FILTER */}
        <div className="mb-6">
          <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm">
            <option>6ème A</option>
            <option>5ème A</option>
            <option>4ème A</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(schedule).map(([day, courses]) => (
            <div
              key={day}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* HEADER DAY */}
              <div className="bg-[#132f7a] text-white px-4 py-2 text-sm font-semibold">
                {day}
              </div>

              {/* COURSES */}
              <div className="p-3 space-y-3">
                {courses.map((c, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    <p className="text-xs text-gray-500 mb-1">
                      🕒 {c.time}
                    </p>

                    <p className="font-medium text-sm">
                      {c.subject}
                    </p>

                    <p className="text-xs text-gray-500">
                      {c.teacher}
                    </p>

                    <p className="text-xs text-gray-400">
                      {c.room}
                    </p>
                  </div>
                ))}
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