"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

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
    <div className="space-y-8">
      <PageHeader
        title="Paramètres de l’école"
        description="Configurer les informations générales de l’établissement."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card padding="lg">
          <h2 className="mb-6 text-base font-semibold text-slate-900">
            Informations générales
          </h2>

          <div className="space-y-4">
            <Field
              label="Nom de l’école"
              value={form.nom}
              onChange={(v) => setForm({ ...form, nom: v })}
            />

            <Field
              label="Adresse"
              value={form.adresse}
              onChange={(v) => setForm({ ...form, adresse: v })}
            />

            <Field
              label="Téléphone"
              value={form.telephone}
              onChange={(v) => setForm({ ...form, telephone: v })}
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />

            <Field
              label="Directeur"
              value={form.directeur}
              onChange={(v) => setForm({ ...form, directeur: v })}
            />

            <Field
              label="Année scolaire"
              value={form.annee}
              onChange={(v) => setForm({ ...form, annee: v })}
            />

            <Button variant="primary" size="md" type="button" className="mt-2">
              Sauvegarder
            </Button>
          </div>
        </Card>

        <div className="space-y-5">
          <Card padding="lg">
            <h2 className="mb-2 text-base font-semibold text-slate-900">Matières</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Gestion des matières (à implémenter).
            </p>
          </Card>

          <Card padding="lg">
            <h2 className="mb-2 text-base font-semibold text-slate-900">Classes</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Gestion des classes (à implémenter).
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
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
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}
