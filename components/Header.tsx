"use client";

import { getUser, logout } from "@/lib/auth";

export default function Header() {
  const user = getUser();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">

      <div className="text-sm text-gray-500">
        Bienvenue 👋
      </div>

      <div className="flex items-center gap-4">

        {/* USER */}
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <div className="text-sm">
            <p className="font-medium">{user?.email}</p>
            <p className="text-gray-400 text-xs">{user?.role}</p>
          </div>

        </div>
      </div>

    </header>
  );
}