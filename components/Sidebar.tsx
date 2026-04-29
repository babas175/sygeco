"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white text-blue-700 font-semibold"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col justify-between p-4">

      {/* TOPO */}
      <div>
        <h1 className="text-xl font-bold mb-6">SYGECO</h1>

        <nav className="space-y-2">
          <Link href="/administrador/admin" className={linkClass("/administrador/admin")}>
            Dashboard
          </Link>

          <Link href="/administrador/ecole" className={linkClass("/administrador/ecole")}>
            Écoles
          </Link>

          <Link href="/administrador/prof" className={linkClass("/administrador/prof")}>
            Professeurs
          </Link>
        </nav>
      </div>

      {/* RODAPÉ */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-sm"
      >
        Déconnexion
      </button>
    </aside>
  );
}