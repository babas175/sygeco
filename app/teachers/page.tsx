"use client";

import { api } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

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
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Enseignants</h1>
          <p className="text-sm text-gray-500">
            {filtered.length} enseignants
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 text-sm cursor-pointer"
        >
          + Nouvel enseignant
        </button>
      </div>

      <div className="w-[350px]">
        <div className="flex items-center border border-gray-200 rounded-xl bg-white px-3 focus-within:ring-2 focus-within:ring-blue-600">
          <span className="text-gray-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full px-2 py-2 outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                {t.first_name?.[0]}{t.last_name?.[0]}
              </div>
              <div>
                <p className="font-semibold">
                  {t.first_name} {t.last_name}
                </p>
                <p className="text-xs text-gray-500">
                  {t.specialization || "-"}
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1 mb-3">
              <p>✉️ {t.email}</p>
              <p>📞 {t.phone}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {(t.Subjects || []).map((s: any) => (
                <span
                  key={s.id}
                  className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                >
                  {s.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(t.Classes || []).map((c: any) => (
                <span
                  key={c.id}
                  className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-auto">

            <h2 className="font-semibold text-lg">
              Nouvel enseignant
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" value={form.first_name} onChange={(v)=>setForm({...form, first_name:v})}/>
              <Input label="Nom" value={form.last_name} onChange={(v)=>setForm({...form, last_name:v})}/>
              <Input label="Email" value={form.email} onChange={(v)=>setForm({...form, email:v})}/>
              <Input label="Mot de passe" value={form.password} onChange={(v)=>setForm({...form, password:v})}/>
              <Input label="Téléphone" value={form.phone} onChange={(v)=>setForm({...form, phone:v})}/>
            </div>

            {subjects.length > 0 && (
              <div>
                <p className="text-sm mb-2">Matières</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() =>
                        toggleArray(s.id, form.subjects, (v)=>setForm({...form, subjects:v}))
                      }
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                        form.subjects.includes(s.id)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {classes.length > 0 && (
              <div>
                <p className="text-sm mb-2">Classes</p>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <button
                      key={c.id}
                      onClick={() =>
                        toggleArray(c.id, form.classes, (v)=>setForm({...form, classes:v}))
                      }
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                        form.classes.includes(c.id)
                          ? "bg-red-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg cursor-pointer"
              >
                Annuler
              </button>

              <button
                onClick={createTeacher}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg cursor-pointer"
              >
                Créer
              </button>
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
      <label className="text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none"
      />
    </div>
  );
}