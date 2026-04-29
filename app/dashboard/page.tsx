"use client";

import { getUser } from "@/lib/auth";

export default function DashboardPage() {
  const user = getUser();

  if (!user) return null;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      {/* SUPERADMIN */}
      {user.role === "SUPERADMIN" && (
        <div className="grid grid-cols-3 gap-4">

          <Card title="Écoles" value="12" />
          <Card title="Utilisateurs" value="120" />
          <Card title="Rapports" value="8" />

        </div>
      )}

      {/* ADMIN */}
      {user.role === "ADMIN" && (
        <div className="grid grid-cols-3 gap-4">

          <Card title="Élèves" value="320" />
          <Card title="Professeurs" value="25" />
          <Card title="Classes" value="12" />

        </div>
      )}

      {/* PROF */}
      {user.role === "PROF" && (
        <div className="grid grid-cols-2 gap-4">

          <Card title="Mes classes" value="3" />
          <Card title="Notes à saisir" value="12" />

        </div>
      )}

      {/* ELEVE */}
      {user.role === "ELEVE" && (
        <div className="grid grid-cols-2 gap-4">

          <Card title="Mes notes" value="--" />
          <Card title="Moyenne" value="--" />

        </div>
      )}

    </div>
  );
}

function Card({ title, value, icon, color }: any) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border flex items-center justify-between hover:shadow-md transition">

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${color}`}>
        {icon}
      </div>

    </div>
  );
}