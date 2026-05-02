"use client";

import { getUser } from "@/lib/auth";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ChartPanel } from "@/components/ui/ChartPanel";
import {
  School,
  Users,
  BarChart3,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const user = getUser();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tableau de bord"
        description="Vue d’ensemble de votre établissement et indicateurs clés."
      />

      {user.role === "SUPERADMIN" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              title="Écoles actives"
              value="12"
              subtitle="+2 ce mois-ci"
              icon={<School size={22} strokeWidth={2} />}
              gradient="indigo"
            />
            <StatCard
              title="Utilizadores"
              value="1 240"
              subtitle="+145 esta semana"
              icon={<Users size={22} strokeWidth={2} />}
              gradient="blue"
            />
            <StatCard
              title="Relatórios"
              value="48"
              subtitle="5 aguardando"
              icon={<BarChart3 size={22} strokeWidth={2} />}
              gradient="green"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartPanel
              title="Activité récente"
              action={
                <Link
                  href="/reports"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Voir tout
                </Link>
              }
            >
              <PlaceholderChart />
            </ChartPanel>
            <ChartPanel title="Statistiques globales">
              <PlaceholderChart />
            </ChartPanel>
          </div>
        </div>
      )}

      {user.role === "ADMIN" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <StatCard
              title="Élèves"
              value="320"
              subtitle="+12 inscrits"
              icon={<Users size={22} strokeWidth={2} />}
              gradient="indigo"
            />
            <StatCard
              title="Enseignants"
              value="25"
              subtitle="15 actifs"
              icon={<UserCheck size={22} strokeWidth={2} />}
              gradient="emerald"
            />
            <StatCard
              title="Classes"
              value="12"
              subtitle="2 avec activité"
              icon={<Award size={22} strokeWidth={2} />}
              gradient="orange"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <StatCard
              title="Moyenne de présence"
              value="94%"
              subtitle="Cette semaine"
              icon={<Clock size={22} strokeWidth={2} />}
              gradient="pink"
            />
            <StatCard
              title="Notes saisies"
              value="87%"
              subtitle="Du total attendu"
              icon={<TrendingUp size={22} strokeWidth={2} />}
              gradient="amber"
            />
          </div>

          <ChartPanel title="Vue hebdomadaire">
            <PlaceholderChart tall />
          </ChartPanel>
        </div>
      )}

      {user.role === "PROF" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <StatCard
              title="Mes classes"
              value="4"
              subtitle="Total des groupes"
              icon={<BookOpen size={22} strokeWidth={2} />}
              gradient="indigo"
            />
            <StatCard
              title="Notes à saisir"
              value="24"
              subtitle="En attente"
              icon={<Clock size={22} strokeWidth={2} />}
              gradient="rose"
            />
          </div>

          <ChartPanel title="Prochains cours">
            <PlaceholderChart tall />
          </ChartPanel>
        </div>
      )}

      {user.role === "ELEVE" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <StatCard
              title="Minha média"
              value="8,5"
              subtitle="/ 10,0"
              icon={<Award size={22} strokeWidth={2} />}
              gradient="green"
            />
            <StatCard
              title="Présence"
              value="96%"
              subtitle="Cette semaine"
              icon={<Clock size={22} strokeWidth={2} />}
              gradient="indigo"
            />
          </div>

          <ChartPanel title="Notes récentes">
            <PlaceholderChart tall />
          </ChartPanel>
        </div>
      )}
    </div>
  );
}

function PlaceholderChart({ tall }: Readonly<{ tall?: boolean }>) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center ${tall ? "min-h-70" : "min-h-55"}`}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
        <BarChart3 size={24} strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-700">Gráfico em breve</p>
      <p className="mt-1 max-w-xs text-xs text-slate-500">
        As visualizações será conectadas aos seus dados em tempo real.
      </p>
    </div>
  );
}
