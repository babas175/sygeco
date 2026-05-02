/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setToken, setUser, getToken } from "@/lib/auth";
import { loginRequest } from "@/lib/api";
import { ArrowRight, Zap } from "lucide-react";

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
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        
        {/* HEADER - Logo & Title */}
        <div className="text-center mb-10 fade-in">
          {/* Logo Badge */}
          <div className="inline-flex items-center justify-center mb-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-indigo-600 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border border-purple-400/30">
                <span className="text-4xl font-black text-white">S</span>
              </div>
            </div>
          </div>
          
          {/* Titles */}
          <h1 className="text-5xl font-black text-white mb-3 tracking-tight leading-tight">
            SYGECO
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <p className="text-purple-300 text-base font-semibold">Plataforma Educacional Premium</p>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed">
            Gestão completa de escolas com tecnologia de ponta
          </p>
        </div>

        {/* LOGIN FORM CARD */}
        <div className="relative group mb-8">
          {/* Card border glow */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/30 to-indigo-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Card */}
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20 hover:border-purple-400/50 transition-colors duration-300">
            
            {/* Card header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={24} className="text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  Conectar
                </h2>
              </div>
              <p className="text-slate-300 text-sm ml-9">
                Acesse sua conta para continuar
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL INPUT */}
              <div className="relative group/input">
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2.5 flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@escola.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    error
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-500/10 text-white placeholder-red-300/50"
                      : "border-slate-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 bg-white/10 text-white placeholder-slate-400 hover:border-purple-500/70 group-hover/input:border-purple-500/70"
                  }`}
                />
              </div>

              {/* PASSWORD INPUT */}
              <div className="relative group/input">
                <label htmlFor="password" className="block text-sm font-semibold text-white mb-2.5 flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    error
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-500/10 text-white placeholder-red-300/50"
                      : "border-slate-500/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 bg-white/10 text-white placeholder-slate-400 hover:border-purple-500/70 group-hover/input:border-purple-500/70"
                  }`}
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-500/20 border-2 border-red-400/50 text-red-200 text-sm px-5 py-4 rounded-xl font-medium flex items-center gap-2 animate-pulse">
                  <span className="text-lg">⚠️</span> {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3.5 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base group relative overflow-hidden mt-6"
              >
                {/* Button background shine effect */}
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Conectando...
                    </>
                  ) : (
                    <>
                      Entrar na Plataforma
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>

            </form>

            {/* Card divider */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-center text-xs text-slate-400">
                <span className="text-purple-300 font-semibold">SYGECO</span> • Sistema seguro de gestão educacional
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM - Copyright */}
        <div className="text-center">
          <p className="text-slate-400 text-xs">
            © 2026 SYGECO. Todos os direitos reservados. | v1.0
          </p>
        </div>

      </div>

    </div>
  );
}