"use client";

import { useState } from "react";

export default function ParametresPage() {
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
    directeur: "",
    annee: "",
  });

  return (
    <div>

      <h1 className="text-xl font-semibold mb-1">
        Paramètres de l'école
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Configurer les informations de l'établissement
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* INFOS ECOLE */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold mb-4">
            Informations générales
          </h2>

          <div className="space-y-3">

            <Input
              label="Nom de l'école"
              value={form.nom}
              onChange={(v: string) =>
                setForm({ ...form, nom: v })
              }
            />

            <Input
              label="Adresse"
              value={form.adresse}
              onChange={(v: string) =>
                setForm({ ...form, adresse: v })
              }
            />

            <Input
              label="Téléphone"
              value={form.telephone}
              onChange={(v: string) =>
                setForm({ ...form, telephone: v })
              }
            />

            <Input
              label="Email"
              value={form.email}
              onChange={(v: string) =>
                setForm({ ...form, email: v })
              }
            />

            <Input
              label="Directeur"
              value={form.directeur}
              onChange={(v: string) =>
                setForm({ ...form, directeur: v })
              }
            />

            <Input
              label="Année scolaire"
              value={form.annee}
              onChange={(v: string) =>
                setForm({ ...form, annee: v })
              }
            />

            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              Sauvegarder
            </button>

          </div>
        </div>

        {/* CONFIGS */}
        <div className="space-y-4">

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3">
              Matières
            </h2>

            <p className="text-sm text-gray-500">
              Gestion des matières (à implémenter)
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-3">
              Classes
            </h2>

            <p className="text-sm text-gray-500">
              Gestion des classes (à implémenter)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

/* INPUT */
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
      />
    </div>
  );
}