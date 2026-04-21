"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ParametresPage() {
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

          <nav className="p-3 space-y-1 text-sm">
            <MenuItem href="/admin" label="Tableau de bord" pathname={pathname} />
            <MenuItem href="/ecole" label="Écoles" pathname={pathname} />
            <MenuItem href="/eleves" label="Élèves" pathname={pathname} />
            <MenuItem href="/enseignants" label="Enseignants" pathname={pathname} />
            <MenuItem href="/presences" label="Présences" pathname={pathname} />
            <MenuItem href="/notes" label="Notes" pathname={pathname} />
            <MenuItem href="/emploi" label="Emploi du temps" pathname={pathname} />
            <MenuItem href="/annonces" label="Annonces" pathname={pathname} />
            <MenuItem href="/rapports" label="Rapports" pathname={pathname} />
            <MenuItem href="/parametres" label="Paramètres" pathname={pathname} />
          </nav>
        </div>

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

          <button className="mt-3 text-blue-200 hover:text-white text-sm">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {/* HEADER */}
        <h1 className="text-xl font-semibold mb-1">
          Paramètres de l'école
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Configurer les informations de l'établissement
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* LEFT FORM */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              🏫 Informations générales
            </h2>

            <div className="space-y-3 text-sm">
              <Input label="Nom de l'école" value="Collège Saint-Pierre" />
              <Input label="Adresse" value="Rue Capois, Port-au-Prince, Haïti" />
              <Input label="Téléphone" value="+509 2813-4567" />
              <Input label="Email" value="info@collegesaintpierre.ht" />
              <Input label="Directeur" value="Jean-Pierre Martin" />
              <Input label="Année scolaire" value="2025-2026" />

              <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">
                Sauvegarder
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            
            {/* MATIERES */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="font-semibold mb-3">📚 Matières (5)</h2>

              <div className="space-y-2 text-sm">
                <Subject name="Mathématiques" code="MATH" coef="4" />
                <Subject name="Français" code="FR" coef="4" />
                <Subject name="Sciences Naturelles" code="SCI" coef="3" />
                <Subject name="Histoire-Géographie" code="HG" coef="2" />
                <Subject name="Anglais" code="ANG" coef="2" />
              </div>
            </div>

            {/* CLASSES */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="font-semibold mb-3">📘 Classes (3)</h2>

              <div className="space-y-2 text-sm">
                <Classe name="6ème A" level="6ème" capacity="35" students="4" />
                <Classe name="5ème A" level="5ème" capacity="35" students="3" />
                <Classe name="4ème A" level="4ème" capacity="35" students="3" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

/* MENU */
function MenuItem({ href, label, pathname }: any) {
  const active = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`px-3 py-2 rounded-lg cursor-pointer ${
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
      <label className="block text-gray-600 mb-1">{label}</label>
      <input
        defaultValue={value}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
      />
    </div>
  );
}

/* SUBJECT */
function Subject({ name, code, coef }: any) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="font-medium">{name}</p>
      <p className="text-xs text-gray-500">
        Code: {code} • Coef: {coef}
      </p>
    </div>
  );
}

/* CLASSE */
function Classe({ name, level, capacity, students }: any) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">
          Niveau: {level} • Capacité: {capacity}
        </p>
      </div>

      <span className="text-xs text-blue-600">
        {students} élèves
      </span>
    </div>
  );
}