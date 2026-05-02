"use client";

import { api } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function EnseignantsPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    subjects: [] as string[],
    classes: [] as string[],
  });

  async function loadData() {
    try {
      const t = await api.get("/teachers");
      setTeachers(t.data || []);
    } catch (err) {
      console.error("teachers error", err);
    }

    try {
      const s = await api.get("/subjects");
      setSubjects(s.data || []);
    } catch (err) {
      setSubjects([]);
    }

    try {
      const c = await api.get("/classes");
      setClasses(c.data || []);
    } catch (err) {
      setClasses([]);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return teachers.filter((t) =>
      `${t.first_name} ${t.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [teachers, search]);

  async function createTeacher() {
    try {
      await api.post("/teachers", form);

      setOpen(false);
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        subjects: [],
        classes: [],
      });

      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  function toggleArray(
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) {
    if (list.includes(value)) {
      setter(list.filter((i) => i !== value));
    } else {
      setter([...list, value]);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Enseignants"
        description={`${filtered.length} enseignant${filtered.length !== 1 ? "s" : ""}`}
        actions={
          <Button variant="primary" size="md" type="button" onClick={() => setOpen(true)}>
            Nouvel enseignant
          </Button>
        }
      />

      <div className="max-w-md">
        <div className="relative flex items-center rounded-xl border border-slate-200 bg-white px-3 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02] transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <span className="text-slate-400" aria-hidden>
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full border-0 bg-transparent py-2.5 pl-2 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02] transition hover:border-indigo-200/80 hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-sm">
                {t.first_name?.[0]}
                {t.last_name?.[0]}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {t.first_name} {t.last_name}
                </p>
                <p className="truncate text-xs text-slate-500">{t.specialization || "—"}</p>
              </div>
            </div>

            <div className="mb-4 space-y-1 text-xs text-slate-600">
              <p>{t.email}</p>
              <p>{t.phone}</p>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {(t.Subjects || []).map((s: any) => (
                <span
                  key={s.id}
                  className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100"
                >
                  {s.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(t.Classes || []).map((c: any) => (
                <span
                  key={c.id}
                  className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-violet-100"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl ring-1 ring-slate-950/[0.04]">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Nouvel enseignant</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prénom"
                value={form.first_name}
                onChange={(v) => setForm({ ...form, first_name: v })}
              />
              <Input
                label="Nom"
                value={form.last_name}
                onChange={(v) => setForm({ ...form, last_name: v })}
              />
              <Input
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Input
                label="Mot de passe"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
              />
              <Input
                label="Téléphone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
            </div>

            {subjects.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Matières</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        toggleArray(s.id, form.subjects, (v) => setForm({ ...form, subjects: v }))
                      }
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                        form.subjects.includes(s.id)
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {classes.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-slate-700">Classes</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        toggleArray(c.id, form.classes, (v) => setForm({ ...form, classes: v }))
                      }
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition ${
                        form.classes.includes(c.id)
                          ? "bg-violet-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Annuler
              </Button>

              <Button variant="primary" type="button" onClick={createTeacher}>
                Créer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}
