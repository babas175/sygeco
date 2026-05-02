"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import { useSidebar } from "@/components/SidebarContext";

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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const user = getUser();
  const { closeSidebar } = useSidebar();

  const linkClass = (path: string) => {
    const active = pathname === path;
    return [
      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden",
      active
        ? "bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400/30"
        : "text-slate-400 hover:text-white hover:shadow-md hover:shadow-indigo-500/10",
    ].join(" ");
  };

  const renderNavLink = (path: string, icon: ReactNode, label: string) => (
    <Link href={path} className={linkClass(path)} onClick={closeSidebar}>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 ${
          pathname === path
            ? "bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
            : "bg-white/8 text-slate-300 group-hover:bg-linear-to-br group-hover:from-indigo-500/40 group-hover:to-purple-500/40 group-hover:text-white"
        }`}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
      {pathname === path ? (
        <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-linear-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-400/50" aria-hidden />
      ) : null}
    </Link>
  );

  const SectionLabel = ({ children }: { children: ReactNode }) => (
    <p className="mb-3 mt-6 px-3 text-[10px] font-bold uppercase tracking-widest bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent first:mt-3">
      {children}
    </p>
  );

  return (
    <aside className="relative flex h-full w-66 shrink-0 flex-col border-r border-indigo-500/20 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_-30%,rgba(99,102,241,0.25),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_80%_120%,rgba(168,85,247,0.15),transparent_50%)]"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Logo Section */}
        <div className="border-b border-indigo-500/20 bg-linear-to-b from-slate-900/80 to-slate-900/40 px-5 py-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-indigo-400 to-purple-600 text-lg font-bold text-white shadow-xl shadow-indigo-500/50 ring-1 ring-white/20 group-hover:shadow-2xl group-hover:shadow-indigo-500/60 transition-all duration-300">
              S
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                SYGECO
              </p>
              <p className="truncate text-xs font-medium text-slate-400 group-hover:text-indigo-300 transition-colors">
                Espace numérique scolaire
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-indigo-500/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-indigo-500/40">
          {renderNavLink(
            "/dashboard",
            <LayoutDashboard size={17} strokeWidth={2} />,
            "Tableau de bord"
          )}

          {user?.role === "SUPERADMIN" && (
            <>
              <SectionLabel>Administration</SectionLabel>
              {renderNavLink("/schools", <School size={17} strokeWidth={2} />, "Écoles")}
              {renderNavLink(
                "/reports",
                <BarChart3 size={17} strokeWidth={2} />,
                "Rapports"
              )}
              {renderNavLink(
                "/settings",
                <Settings size={17} strokeWidth={2} />,
                "Paramètres"
              )}
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <SectionLabel>Gestion</SectionLabel>
              {renderNavLink("/students", <Users size={17} strokeWidth={2} />, "Élèves")}
              {renderNavLink(
                "/teachers",
                <GraduationCap size={17} strokeWidth={2} />,
                "Enseignants"
              )}
              <SectionLabel>Académique</SectionLabel>
              {renderNavLink(
                "/attendance",
                <ClipboardCheck size={17} strokeWidth={2} />,
                "Présences"
              )}
              {renderNavLink("/grades", <BookOpen size={17} strokeWidth={2} />, "Notes")}
              {renderNavLink(
                "/schedule",
                <Calendar size={17} strokeWidth={2} />,
                "Emploi du temps"
              )}
              <SectionLabel>Communication</SectionLabel>
              {renderNavLink(
                "/announcements",
                <Megaphone size={17} strokeWidth={2} />,
                "Annonces"
              )}
            </>
          )}

          {user?.role === "PROF" && (
            <>
              <SectionLabel>Enseignement</SectionLabel>
              {renderNavLink("/grades", <BookOpen size={17} strokeWidth={2} />, "Notes")}
              {renderNavLink(
                "/schedule",
                <Calendar size={17} strokeWidth={2} />,
                "Emploi du temps"
              )}
            </>
          )}

          {user?.role === "ELEVE" && (
            <>
              <SectionLabel>Académique</SectionLabel>
              {renderNavLink(
                "/grades",
                <BookOpen size={17} strokeWidth={2} />,
                "Mes notes"
              )}
            </>
          )}
        </nav>

        {/* Logout Button */}
        <div className="relative border-t border-indigo-500/20 bg-linear-to-t from-slate-900/40 to-slate-900/0 p-3">
          <button
            type="button"
            onClick={() => {
              logout();
              globalThis.window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-linear-to-r hover:from-red-500/20 hover:to-rose-500/20 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/20"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 group-hover:bg-red-500/20 transition-all duration-300">
              <LogOut size={17} strokeWidth={2} />
            </span>
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
