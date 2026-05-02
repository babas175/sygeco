/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken, setUser, getToken } from "@/lib/auth";
import { loginRequest } from "@/lib/api";
import { ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(email, password);

      setToken(data.token);
      setUser(data.user);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_10%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(800px_circle_at_80%_60%,rgba(139,92,246,0.2),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/40 blur-2xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white shadow-2xl ring-1 ring-white/20">
                S
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">SYGECO</h1>
          <p className="text-sm font-medium text-slate-400">
            Espace de gestion scolaire
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
            Tableaux de bord, présences, notes et communication — un seul outil.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-indigo-500/50 to-violet-500/40 opacity-50 blur" />
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                  <Shield size={20} strokeWidth={2} />
                </div>
                <h2 className="text-xl font-semibold text-white">Connexion</h2>
              </div>
              <p className="ml-12 text-sm text-slate-400">
                Saisissez vos identifiants pour accéder à l’espace sécurisé.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="prenom.nom@etablissement.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    error
                      ? "w-full rounded-xl border-2 border-red-400/80 bg-red-500/10 px-4 py-3 text-sm text-white placeholder:text-red-200/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/30"
                      : "w-full rounded-xl border border-slate-600/80 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25"
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    error
                      ? "w-full rounded-xl border-2 border-red-400/80 bg-red-500/10 px-4 py-3 text-sm text-white placeholder:text-red-200/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/30"
                      : "w-full rounded-xl border border-slate-600/80 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25"
                  }
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Connexion…
                    </>
                  ) : (
                    <>
                      Entrer
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </>
                  )}
                </span>
              </button>
            </form>

            <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
              SYGECO · Données traitées de façon sécurisée
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} SYGECO
        </p>
      </div>
    </div>
  );
}
