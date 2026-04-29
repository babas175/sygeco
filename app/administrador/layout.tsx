"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }: any) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">

        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="p-6 overflow-auto">
            {children}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}