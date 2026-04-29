/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken, setUser, getToken } from "@/lib/auth";
import { loginRequest } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/administrador/admin");
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(email, password);

      setToken(data.token);
      setUser(data.user);

      const role = data.user.role;

      if (role === "SUPERADMIN") {
        router.push("/administrador/admin");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err?.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="flex md:hidden bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white p-6 items-center justify-center">
        <h1 className="text-xl font-bold">SYGECO</h1>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white flex-col items-center justify-center p-10">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center text-xl">
              🎓
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 tracking-wide">
            SYGECO
          </h1>

          <p className="text-lg font-medium mb-2 text-gray-200">
            Système de Gestion Éducative et de Communication
          </p>

          <p className="text-sm text-gray-300">
            Plateforme moderne pour la gestion scolaire.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4 sm:p-6">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Connexion
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Entrez vos identifiants
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2.5 rounded-lg hover:bg-blue-800 transition font-medium shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Connexion..." : "Se connecter"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}