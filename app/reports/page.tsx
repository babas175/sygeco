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
import { PageHeader } from "@/components/ui/PageHeader";
import { MetricCard } from "@/components/ui/MetricCard";

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
    <div className="space-y-8">
      <PageHeader
        title="Rapports et analyses"
        description="Vue d’ensemble des statistiques et tendances."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total élèves" value="10" variant="primary" />
        <MetricCard title="Enseignants" value="3" variant="warning" />
        <MetricCard title="Taux de présence" value="92%" variant="success" />
        <MetricCard title="Moyenne générale" value="14,8/20" variant="neutral" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
          <p className="mb-4 text-sm font-semibold text-slate-900">
            Évolution des inscriptions
          </p>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolutionData}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgb(226 232 240)",
                    boxShadow: "0 10px 15px -3px rgb(15 23 42 / 0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ fill: "#4f46e5", strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
          <p className="mb-4 text-sm font-semibold text-slate-900">
            Performance par matière
          </p>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgb(226 232 240)",
                    boxShadow: "0 10px 15px -3px rgb(15 23 42 / 0.08)",
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
