"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = isAuthenticated();

    if (auth) {
      setAllowed(true);
    } else {
      router.push("/login");
    }
  }, []);

  if (allowed === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return children;
}