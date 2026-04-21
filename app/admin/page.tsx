"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboard() {
  const pathname = usePathname();

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

          {/* MENU */}
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

        {/* USER */}
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
            onClick={() => (window.location.href = "/login")}
            className="mt-3 text-blue-200 hover:text-white text-sm"
            >
            Déconnexion
            </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm text-gray-700 font-medium">
            Super Administration
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">🔔</span>
            <div className="bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold">
              AS
            </div>
          </div>
        </div>

        {/* GREETING */}
        <h1 className="text-2xl font-bold mb-1">
          Bonjour, Admin 👋
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Super Administrateur — Année scolaire 2025-2026
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Écoles" value="1" color="blue" />
          <StatCard title="Élèves" value="10" color="indigo" />
          <StatCard title="Enseignants" value="3" color="red" />
          <StatCard title="Classes" value="3" color="green" />
        </div>

        {/* PRESENCE */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 w-[300px] shadow-sm">
          <p className="text-sm text-gray-600">Taux de présence</p>
          <p className="text-2xl font-bold text-gray-900">92%</p>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-4">
              Présences cette semaine
            </p>
            <div className="h-48 flex items-center justify-center text-gray-400">
              (Graph ici)
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-4">
              Répartition par genre
            </p>
            <div className="h-48 flex items-center justify-center text-gray-400">
              (Pie ici)
            </div>
          </div>
        </div>

        {/* ANNOUNCES */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            📢 Annonces récentes
          </p>

          <div className="space-y-3">
            <Annonce
              title="Rentrée scolaire 2025-2026"
              desc="Tous les élèves sont priés de se présenter..."
            />
            <Annonce
              title="Réunion parents-professeurs"
              desc="Une réunion aura lieu..."
            />
            <Annonce
              title="Examens du premier trimestre"
              desc="Les examens se dérouleront..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* MENU ITEM */
function MenuItem({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`px-3 py-2 rounded-lg cursor-pointer transition ${
          active ? "bg-white/10 font-medium" : "hover:bg-white/10"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}

/* CARD */
function StatCard({ title, value, color }: any) {
  const styles: any = {
    blue: "bg-blue-50 border border-blue-200",
    indigo: "bg-indigo-50 border border-indigo-200",
    red: "bg-red-50 border border-red-200",
    green: "bg-green-50 border border-green-200",
  };

  return (
    <div className={`p-4 rounded-xl ${styles[color]} shadow-sm`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

/* ANNONCE */
function Annonce({ title, desc }: any) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
      <p className="font-medium text-sm text-gray-900">{title}</p>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
}