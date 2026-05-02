"use client";

import type { ReactNode } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import {
  MobileSidebarOverlay,
  SidebarProvider,
} from "@/components/SidebarContext";

import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return (
      <html lang="fr">
        <body className="min-h-screen font-sans antialiased">{children}</body>
      </html>
    );
  }

  return (
    <html lang="fr">
      <body className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 font-sans text-slate-900 antialiased">
        <ProtectedRoute>
          <SidebarProvider>
            <div className="flex h-screen min-h-0 overflow-hidden">
              <MobileSidebarOverlay />
              <Sidebar />

              <div className="flex min-w-0 flex-1 flex-col lg:min-w-0">
                <Header />

                <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain bg-linear-to-b from-transparent to-indigo-50/50">
                  <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8 lg:py-10">
                    <div>{children}</div>
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}
