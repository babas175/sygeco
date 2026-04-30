"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function ReportsPage() {

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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Rapports et Analyses
        </h1>
        <p className="text-sm text-gray-500">
          Vue d'ensemble des statistiques scolaires
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total élèves" value="10" color="blue" />
        <StatCard title="Enseignants" value="3" color="red" />
        <StatCard title="Taux de présence" value="92%" color="green" />
        <StatCard title="Moyenne générale" value="14.8/20" color="yellow" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-4">

        {/* LINE */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="font-medium mb-3 text-gray-900">
            Évolution des inscriptions
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
          <p className="font-medium mb-3 text-gray-900">
            Performance par matière
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

    </div>
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
    <div className={`p-4 rounded-xl border shadow-sm ${colors[color]}`}>
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}