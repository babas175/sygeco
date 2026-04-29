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

      {/* TOP */}
      <div>
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <img src="/logo.svg" className="w-6 h-6" />
          <h1 className="font-bold text-lg">SYGECO</h1>
        </div>

        <nav className="p-3 space-y-1 text-sm">

          {/* DASHBOARD (TODOS) */}
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>

          {/* SUPERADMIN */}
          {user?.role === "SUPERADMIN" && (
            <>
              <Link href="/schools" className={linkClass("/schools")}>
                <School size={16} /> Schools
              </Link>

              <Link href="/reports" className={linkClass("/reports")}>
                <BarChart3 size={16} /> Reports
              </Link>

              <Link href="/settings" className={linkClass("/settings")}>
                <Settings size={16} /> Settings
              </Link>
            </>
          )}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <Link href="/students" className={linkClass("/students")}>
                <Users size={16} /> Students
              </Link>

              <Link href="/teachers" className={linkClass("/teachers")}>
                <GraduationCap size={16} /> Teachers
              </Link>

              <Link href="/attendance" className={linkClass("/attendance")}>
                <ClipboardCheck size={16} /> Attendance
              </Link>

              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> Grades
              </Link>

              <Link href="/schedule" className={linkClass("/schedule")}>
                <Calendar size={16} /> Schedule
              </Link>

              <Link href="/announcements" className={linkClass("/announcements")}>
                <Megaphone size={16} /> Announcements
              </Link>

              <Link href="/reports" className={linkClass("/reports")}>
                <BarChart3 size={16} /> Reports
              </Link>

              <Link href="/settings" className={linkClass("/settings")}>
                <Settings size={16} /> Settings
              </Link>
            </>
          )}

          {/* PROF */}
          {user?.role === "PROF" && (
            <>
              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> Grades
              </Link>

              <Link href="/schedule" className={linkClass("/schedule")}>
                <Calendar size={16} /> Schedule
              </Link>
            </>
          )}

          {/* ELEVE */}
          {user?.role === "ELEVE" && (
            <>
              <Link href="/grades" className={linkClass("/grades")}>
                <BookOpen size={16} /> My Grades
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