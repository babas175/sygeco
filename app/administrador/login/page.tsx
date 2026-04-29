"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "../../lib/api";

// ⏳ delay helper
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ⏳ efeito loading
      await sleep(2000);

      const data = await loginRequest(email, password);

      // 🔐 salvar token
      localStorage.setItem("token", data.token);

      const role = data.user.role;

      switch (role) {
        case "ADMIN":
          router.push("/administrador/admin");
          break;
        case "ECOLE":
          router.push("/administrador/ecole");
          break;
        case "PROF":
          router.push("/administrador/prof");
          break;
        case "ELEVE":
          router.push("/administrador/eleve");
          break;
        case "PARENT":
          router.push("/administrador/parent");
          break;
        default:
          router.push("/");
      }

    } catch (err: any) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* MOBILE HEADER */}
      <div className="flex md:hidden bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white p-6 items-center justify-center">
        <h1 className="text-xl font-bold">SYGECO</h1>
      </div>

      {/* LEFT SIDE */}
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
            La plateforme numérique pour moderniser la gestion scolaire en Haïti.
            Administration, pédagogie et communication en un seul endroit.
          </p>

          <div className="mt-10 text-xs text-gray-400">
            Développé par EDHA
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4 sm:p-6">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Connexion
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Entrez vos identifiants pour accéder à votre espace
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="votre@email.ht"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-1 px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mt-1 px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="text-right">
              <a className="text-sm text-blue-600 hover:underline cursor-pointer">
                Mot de passe oublié ?
              </a>
            </div>

            {/* BUTTON */}
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

          <p className="text-center text-xs text-gray-500 mt-6">
            Powered by EDHA
          </p>

        </div>
      </div>
    </div>
  );
}