"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser, logout } from "@/lib/auth";

import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const user = getUser();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
      pathname === path
        ? "bg-white/15 font-semibold text-white shadow-lg backdrop-blur-md border border-white/20"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  const renderNavLink = (path: string, icon: React.ReactNode, label: string) => (
    <Link href={path} className={linkClass(path)}>
      <div className={`transition-transform duration-300 ${pathname === path ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </div>
      <span>{label}</span>
      {pathname === path && (
        <ChevronRight size={16} className="ml-auto opacity-60" />
      )}
    </Link>
  );

  return (
    <aside className="w-64 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      <div className="relative z-10">
        {/* LOGO SECTION */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-white/5 backdrop-blur-md">
          <div className="bg-white/20 p-3 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-xl border border-white/20">
            <div className="w-8 h-8 bg-linear-to-br from-white to-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-700">
              S
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-xl tracking-tight">
              SYGECO
            </h1>
            <span className="text-xs text-blue-200 font-medium leading-tight">
              Système d'Éducation
            </span>
          </div>
        </div>

        {/* USER INFO */}
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-white/30 to-white/10 text-white flex items-center justify-center rounded-xl font-bold border border-white/20">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-blue-200 font-medium">
                {user?.role === "SUPERADMIN" ? "👑 Admin" : "🏫 Gestionnaire"}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 space-y-1 text-sm">
          {/* Dashboard */}
          {renderNavLink("/dashboard", <LayoutDashboard size={18} />, "Tableau de bord")}

          {user?.role === "SUPERADMIN" && (
            <>
              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Admin
                </p>
              </div>

              {renderNavLink("/schools", <School size={18} />, "Écoles")}
              {renderNavLink("/reports", <BarChart3 size={18} />, "Rapports")}
              {renderNavLink("/settings", <Settings size={18} />, "Paramètres")}
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Gestion
                </p>
              </div>

              {renderNavLink("/students", <Users size={18} />, "Élèves")}
              {renderNavLink("/teachers", <GraduationCap size={18} />, "Enseignants")}
              
              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Académique
                </p>
              </div>

              {renderNavLink("/attendance", <ClipboardCheck size={18} />, "Présences")}
              {renderNavLink("/grades", <BookOpen size={18} />, "Notes")}
              {renderNavLink("/schedule", <Calendar size={18} />, "Emploi du temps")}

              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Communication
                </p>
              </div>

              {renderNavLink("/announcements", <Megaphone size={18} />, "Annonces")}
            </>
          )}

          {user?.role === "PROF" && (
            <>
              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Enseignement
                </p>
              </div>

              {renderNavLink("/grades", <BookOpen size={18} />, "Notes")}
              {renderNavLink("/schedule", <Calendar size={18} />, "Emploi du temps")}
            </>
          )}

          {user?.role === "ELEVE" && (
            <>
              <div className="pt-3 pb-2">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider px-4 opacity-70">
                  Académique
                </p>
              </div>

              {renderNavLink("/grades", <BookOpen size={18} />, "Mes notes")}
            </>
          )}
        </nav>
      </div>

      {/* FOOTER / LOGOUT */}
      <div className="relative z-10 p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <button
          onClick={() => {
            logout();
            globalThis.window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-300 font-medium group"
        >
          <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}