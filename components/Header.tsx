"use client";

import { getUser } from "@/lib/auth";
import { Bell, Search } from "lucide-react";

export default function Header() {
  const user = getUser();

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <header className="sticky top-0 z-30 flex h-[4.25rem] shrink-0 items-center justify-between gap-4 border-b border-gradient-to-r from-indigo-200/20 to-purple-200/20 bg-gradient-to-r from-white/95 via-slate-50/95 to-white/95 px-4 backdrop-blur-xl shadow-sm shadow-indigo-500/5 sm:px-6 lg:px-8">
      <div className="min-w-0 flex items-center gap-3">
        <div className="flex flex-col">
          <p className="truncate text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {getTimeOfDay()}
          </p>
          <p className="hidden text-xs font-medium text-slate-500 sm:block">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Rechercher..."
            className="w-56 rounded-xl border border-indigo-200/30 bg-gradient-to-r from-slate-50 to-indigo-50/50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/10 lg:w-72"
            aria-label="Recherche"
          />
        </div>

        <button
          type="button"
          className="relative rounded-xl p-2 text-slate-500 transition duration-300 hover:bg-gradient-to-r hover:from-indigo-100/80 hover:to-purple-100/80 hover:text-indigo-600 hover:shadow-md hover:shadow-indigo-500/20"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-white animate-pulse" />
        </button>

        <div className="flex items-center gap-3 border-l border-indigo-200/20 pl-3 sm:pl-4">
          <div className="hidden text-right sm:block">
            <p className="max-w-[10rem] truncate text-sm font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {user?.email?.split("@")[0] || "Usuário"}
            </p>
            <p className="text-xs font-medium text-slate-500">
              {user?.role === "SUPERADMIN"
                ? "Super administrateur"
                : user?.role === "ADMIN"
                  ? "Gestionnaire"
                  : user?.role === "PROF"
                    ? "Enseignant"
                    : user?.role === "ELEVE"
                      ? "Élève"
                      : "Utilisateur"}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-400 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 ring-2 ring-white/80 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 cursor-pointer">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
