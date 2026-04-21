"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function RapportsPage() {
  const pathname = usePathname();

  const evolutionData = [
    { name: "Sep", value: 8 },
    { name: "Oct", value: 9 },
    { name: "Nov", value: 10 },
  ];

  const performanceData = [
    { name: "Math", value: 15 },
    { name: "Français", value: 17 },
    { name: "Sciences", value: 14 },
    { name: "Histoire", value: 16 },
    { name: "Anglais", value: 15 },
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

          <button className="mt-3 text-blue-200 hover:text-white text-sm">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {/* HEADER */}
        <h1 className="text-xl font-semibold mb-1">
          Rapports et Analyses
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Vue d'ensemble des statistiques scolaires
        </p>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Total élèves" value="10" color="blue" />
          <StatCard title="Enseignants" value="3" color="red" />
          <StatCard title="Taux de présence" value="92%" color="green" />
          <StatCard title="Moyenne générale" value="14.8/20" color="yellow" />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-4">
          {/* LINE */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="font-medium mb-3">
              📈 Évolution des inscriptions
            </p>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1d4ed8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BAR */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="font-medium mb-3">
              📊 Performance par matière
            </p>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
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

/* STAT CARD */
function StatCard({ title, value, color }: any) {
  const colors: any = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    red: "border-red-200 bg-red-50 text-red-700",
    green: "border-green-200 bg-green-50 text-green-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
  };

  return (
    <div
      className={`p-4 rounded-xl border shadow-sm ${colors[color]}`}
    >
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}