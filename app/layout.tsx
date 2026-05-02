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
      <body className="bg-linear-to-br from-gray-50 via-white to-gray-50">
        <ProtectedRoute>
          <div className="flex h-screen bg-gray-50 overflow-hidden">

            <Sidebar />

            <div className="flex-1 flex flex-col bg-white">

              <Header />

              <main className="flex-1 p-8 overflow-auto bg-linear-to-br from-gray-50 via-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>

            </div>

          </div>
        </ProtectedRoute>
      </body>
    </html>
  );
}