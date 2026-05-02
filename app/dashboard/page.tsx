"use client";

import { getUser } from "@/lib/auth";
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

export default function DashboardPage() {
  const user = getUser();

  if (!user) return null;

  return (
    <div className="space-y-8 fade-in">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Bem-vindo de volta! Aqui estão seus dados em tempo real.
        </p>
      </div>

      {/* SUPERADMIN - Admin de Escolas */}
      {user.role === "SUPERADMIN" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Écoles Ativas"
              value="12"
              subtitle="+2 este mês"
              icon={<School size={24} />}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              title="Utilisateurs"
              value="1.240"
              subtitle="+145 esta semana"
              icon={<Users size={24} />}
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              title="Rapports"
              value="48"
              subtitle="5 pendentes"
              icon={<BarChart3 size={24} />}
              color="from-green-500 to-green-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Últimas Atividades" />
            <ChartCard title="Estatísticas Gerais" />
          </div>
        </div>
      )}

      {/* ADMIN - Gestor de Escola */}
      {user.role === "ADMIN" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Élèves"
              value="320"
              subtitle="+12 inscritos"
              icon={<Users size={24} />}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              title="Professeurs"
              value="25"
              subtitle="15 ativos"
              icon={<UserCheck size={24} />}
              color="from-emerald-500 to-emerald-600"
            />
            <StatCard
              title="Classes"
              value="12"
              subtitle="2 com atividade"
              icon={<Award size={24} />}
              color="from-orange-500 to-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Média de Presença"
              value="94%"
              subtitle="Esta semana"
              icon={<Clock size={24} />}
              color="from-pink-500 to-pink-600"
            />
            <StatCard
              title="Notas Lançadas"
              value="87%"
              subtitle="Do total esperado"
              icon={<TrendingUp size={24} />}
              color="from-yellow-500 to-yellow-600"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ChartCard title="Visão Geral da Semana" fullWidth />
          </div>
        </div>
      )}

      {/* PROF - Professor */}
      {user.role === "PROF" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Minhas Classes"
              value="4"
              subtitle="Total de turmas"
              icon={<BookOpen size={24} />}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              title="Notas a Lançar"
              value="24"
              subtitle="Pendentes de entrada"
              icon={<Clock size={24} />}
              color="from-red-500 to-red-600"
            />
          </div>

          <ChartCard title="Próximas Aulas" fullWidth />
        </div>
      )}

      {/* ELEVE - Aluno */}
      {user.role === "ELEVE" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Minha Média"
              value="8.5"
              subtitle="/10.0"
              icon={<Award size={24} />}
              color="from-green-500 to-green-600"
            />
            <StatCard
              title="Presença"
              value="96%"
              subtitle="Esta semana"
              icon={<Clock size={24} />}
              color="from-blue-500 to-blue-600"
            />
          </div>

          <ChartCard title="Minhas Notas Recentes" fullWidth />
        </div>
      )}

    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: Readonly<StatCardProps>) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 overflow-hidden relative group">
      {/* Background gradient */}
      <div className={`absolute -right-16 -top-16 w-40 h-40 bg-linear-to-br ${color} opacity-5 group-hover:opacity-10 rounded-full transition-opacity duration-300`}></div>

      <div className="flex justify-between items-start relative z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-1">{value}</h2>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${color} text-white flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  fullWidth?: boolean;
}

function ChartCard({ title, fullWidth = false }: Readonly<ChartCardProps>) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 ${fullWidth ? "col-span-full" : ""}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition">
          Ver tudo →
        </button>
      </div>
      <div className="h-64 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
        <div className="text-center">
          <BarChart3 size={48} className="mx-auto opacity-20 mb-2" />
          <p className="text-sm">Gráfico em desenvolvimento</p>
        </div>
      </div>
    </div>
  );
}