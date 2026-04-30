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
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const user = getUser();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
      pathname === path
        ? "bg-white/10 font-medium"
        : "hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 bg-[#0b3aa5] text-white flex flex-col justify-between">
      <div>
        <div className="p-5 border-b border-white/10 flex items-center gap-4">
          <div className="bg-white/10 p-2 rounded-xl">
            <img
              src="/logo.svg"
              alt="SYGECO logo"
              className="w-10 h-10 object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg tracking-wide">
              SYGECO
            </h1>
            <span className="text-xs text-blue-200 leading-tight">
              Système de Gestion des Écoles
            </span>
          </div>
        </div>

        <nav className="p-3 space-y-1 text-sm">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard size={16} /> Tableau de bord
          </Link>

          {user?.role === "SUPERADMIN" && (
            <>
              <Link href="/schools" className={linkClass("/schools")}>
                <School size={16} /> Écoles
              </Link>

              <Link href="/reports" className={linkClass("/reports")}>
                <BarChart3 size={16} /> Rapports
              </Link>

              <Link href="/settings" className={linkClass("/settings")}>
                <Settings size={16} /> Paramètres
              </Link>
            </>
          )}

          {user?.role === "ADMIN" && (
            <>
              <Link href="/students" className={linkClass("/students")}>
                <Users size={16} /> Élèves
              </Link>

              <Link href="/teachers" className={linkClass("/teachers")}>
                <GraduationCap size={16} /> Enseignants
              </Link>

              <Link href="/attendance" className={linkClass("/attendance")}>
                <ClipboardCheck size={16} /> Présences
              </Link>

              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> Notes
              </Link>

              <Link href="/schedule" className={linkClass("/schedule")}>
                <Calendar size={16} /> Emploi du temps
              </Link>

              <Link href="/announcements" className={linkClass("/announcements")}>
                <Megaphone size={16} /> Annonces
              </Link>

              <Link href="/reports" className={linkClass("/reports")}>
                <BarChart3 size={16} /> Rapports
              </Link>

              <Link href="/settings" className={linkClass("/settings")}>
                <Settings size={16} /> Paramètres
              </Link>
            </>
          )}

          {user?.role === "PROF" && (
            <>
              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> Notes
              </Link>

              <Link href="/schedule" className={linkClass("/schedule")}>
                <Calendar size={16} /> Emploi du temps
              </Link>
            </>
          )}

          {user?.role === "ELEVE" && (
            <>
              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> Mes notes
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left cursor-pointer transition 
          text-red-400 hover:text-white hover:bg-red-500/20"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}