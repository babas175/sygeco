"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    { email: "admin@sygeco.ht", password: "admin123", role: "ADMIN" },
    { email: "direction@college...", password: "admin123", role: "ECOLE" },
    { email: "prof@college...", password: "prof123", role: "PROF" },
    { email: "eleve@...", password: "eleve123", role: "ELEVE" },
    { email: "parent@...", password: "parent123", role: "PARENT" },
  ];

  const handleLogin = (e: any) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Identifiants invalides");
      return;
    }

    switch (user.role) {
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* TOP (mobile) / LEFT (desktop) */}
      <div className="flex md:hidden bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white p-6 items-center justify-center">
        <h1 className="text-xl font-bold">SYGECO</h1>
      </div>

      {/* LEFT SIDE (desktop only) */}
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

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-800">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="votre@email.ht"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="text-right">
              <a className="text-sm text-blue-600 hover:underline cursor-pointer">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2.5 rounded-lg hover:bg-blue-800 transition font-medium shadow-md"
            >
              Se connecter
            </button>
          </form>

          {/* DEMO */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs text-gray-700">
            <p className="font-semibold mb-2 text-gray-900">
              Comptes de démonstration :
            </p>
            <p>Admin: admin@sygeco.ht / admin123</p>
            <p>École: direction@college... / admin123</p>
            <p>Prof: prof@college... / prof123</p>
            <p>Élève: eleve@... / eleve123</p>
            <p>Parent: parent@... / parent123</p>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Powered by EDHA
          </p>
        </div>
      </div>
    </div>
  );
}