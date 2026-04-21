"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EcoleDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b3aa5] text-white flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-white/10">
            <h1 className="font-bold text-lg">SYGECO</h1>
            <p className="text-xs text-blue-200">
              Système de Gestion des Écoles
            </p>
          </div>

          {/* MENU */}
          <nav className="p-3 space-y-1 text-sm">
            <MenuItem href="/administrador/admin" label="Tableau de bord" pathname={pathname} />
            <MenuItem href="/administrador/ecole" label="Écoles" pathname={pathname} />
            <MenuItem href="/administrador/eleves" label="Élèves" pathname={pathname} />
            <MenuItem href="/administrador/enseignants" label="Enseignants" pathname={pathname} />
            <MenuItem href="/administrador/presences" label="Présences" pathname={pathname} />
            <MenuItem href="/administrador/notes" label="Notes" pathname={pathname} />
            <MenuItem href="/administrador/emploi" label="Emploi du temps" pathname={pathname} />
            <MenuItem href="/administrador/annonces" label="Annonces" pathname={pathname} />
            <MenuItem href="/administrador/rapports" label="Rapports" pathname={pathname} />
            <MenuItem href="/administrador/parametres" label="Paramètres" pathname={pathname} />
          </nav>
        </div>

        {/* USER */}
        <div className="p-4 border-t border-white/10 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-white text-blue-900 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
              AS
            </div>
            <div>
              <p className="font-medium">Admin SYGECO</p>
              <p className="text-xs text-blue-200">super admin</p>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-3 text-blue-200 hover:text-white text-sm"
            >
            Déconnexion
            </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm text-gray-700 font-medium">
            Super Administration
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">🔔</span>
            <div className="bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold">
              AS
            </div>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-1">
          Paramètres de l'école
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Configurer les informations de l'établissement
        </p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-4">
          {/* LEFT FORM */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="font-semibold mb-4">🏫 Informations générales</p>

            <div className="space-y-4">
              <Input label="Nom de l'école" value="Collège Saint-Pierre" />
              <Input label="Adresse" value="Rue Capois, Port-au-Prince, Haïti" />
              <Input label="Téléphone" value="+509 2813-4567" />
              <Input label="Email" value="info@collegesaintpierre.ht" />
              <Input label="Directeur" value="Jean-Pierre Martin" />
              <Input label="Année scolaire" value="2025-2026" />
            </div>

            <button className="mt-6 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              Sauvegarder
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="font-semibold mb-3">📘 Matières (5)</p>
              <div className="space-y-2">
                <Item title="Mathématiques" desc="Code: MATH • Coef: 4" />
                <Item title="Français" desc="Code: FR • Coef: 4" />
                <Item title="Sciences Naturelles" desc="Code: SCI • Coef: 3" />
                <Item title="Histoire-Géographie" desc="Code: HG • Coef: 2" />
                <Item title="Anglais" desc="Code: ANG • Coef: 2" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="font-semibold mb-3">🏫 Classes (3)</p>
              <div className="space-y-2">
                <Item title="6ème A" desc="Capacité: 35 • 4 élèves" />
                <Item title="5ème A" desc="Capacité: 35 • 3 élèves" />
                <Item title="4ème A" desc="Capacité: 35 • 3 élèves" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* MENU ITEM */
function MenuItem({ href, label, pathname }: any) {
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`px-3 py-2 rounded-lg cursor-pointer transition ${
          active ? "bg-white/10 font-medium" : "hover:bg-white/10"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}

/* INPUT */
function Input({ label, value }: any) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <input
        defaultValue={value}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}

/* ITEM */
function Item({ title, desc }: any) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  );
}