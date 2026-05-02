"use client";

import { getUser } from "@/lib/auth";
import { Bell, Search } from "lucide-react";

export default function Header() {
  const user = getUser();

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm relative z-20">

      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">
            {getTimeOfDay()} 👋
          </p>
          <p className="text-xs text-gray-500 font-medium">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">

        {/* SEARCH BAR */}
        <div className="hidden md:flex relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* USER PROFILE */}
        <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-900">
              {user?.email?.split("@")[0]}
            </p>
            <p className="text-xs text-gray-500 font-medium">
              {user?.role === "SUPERADMIN" ? "Administrador" : "Gestor"}
            </p>
          </div>

          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center rounded-xl font-bold shadow-md hover:shadow-lg transition-all cursor-pointer">
            {user?.email?.[0]?.toUpperCase()}
          </div>
        </div>

      </div>

    </header>
  );
}