"use client";

import "./globals.css";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

export default function RootLayout({ children }: any) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
      <html lang="fr">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="fr">
      <body>
        <ProtectedRoute>
          <div className="flex h-screen bg-gray-50">

            <Sidebar />

            <div className="flex-1 flex flex-col">

              <Header />

              <main className="flex-1 p-6 overflow-auto">
                {children}
              </main>

            </div>

          </div>
        </ProtectedRoute>
      </body>
    </html>
  );
}