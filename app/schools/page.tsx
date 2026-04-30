"use client";

import { API_URL } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

type Ecole = {
  id: string;
  nom: string;
  code?: string;
  adresse?: string;
  telephone?: string;
  email: string;
  ville?: string;
  pays?: string;
  actif?: boolean;
  disabled_at?: string | null;
  createdAt?: string;
};

type FormState = {
  nom: string;
  code: string;
  adresse: string;
  telephone: string;
  email: string;
  ville: string;
  pays: string;
  password: string;
};

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

const emptyForm: FormState = {
  nom: "",
  code: "",
  adresse: "",
  telephone: "",
  email: "",
  ville: "",
  pays: "",
  password: "",
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<Ecole[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ecole | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const [modalOpen, setModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [notification, setNotification] = useState<Notification>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  function notify(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  }

  async function loadSchools() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/ecoles`, {
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors du chargement des écoles");
      }

      setSchools(Array.isArray(data) ? data : []);
    } catch (error: any) {
      notify("error", error.message || "Impossible de charger les écoles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchools();
  }, []);

  const filteredSchools = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return schools;

    return schools.filter((school) =>
      [
        school.nom,
        school.code,
        school.email,
        school.telephone,
        school.ville,
        school.pays,
      ]
        .filter(Boolean)
        .some((item) => String(item).toLowerCase().includes(value))
    );
  }, [schools, search]);

  function openCreateModal() {
    setSelected(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(school: Ecole) {
    setSelected(school);

    setForm({
      nom: school.nom || "",
      code: school.code || "",
      adresse: school.adresse || "",
      telephone: school.telephone || "",
      email: school.email || "",
      ville: school.ville || "",
      pays: school.pays || "",
      password: "",
    });

    setModalOpen(true);
  }

  function openDetailsModal(school: Ecole) {
    setSelected(school);
    setDetailsOpen(true);
  }

  function openConfirmModal(school: Ecole) {
    setSelected(school);
    setConfirmOpen(true);
  }

  async function saveSchool() {
    try {
      setSaving(true);

      if (!form.nom || !form.email || (!selected && !form.password)) {
        notify("error", "Veuillez remplir les champs obligatoires");
        return;
      }

      const payload: any = {
        nom: form.nom,
        code: form.code,
        adresse: form.adresse,
        telephone: form.telephone,
        email: form.email,
        ville: form.ville,
        pays: form.pays,
      };

      if (!selected) {
        payload.password = form.password;
      }

      const url = selected
        ? `${API_URL}/ecoles/${selected.id}`
        : `${API_URL}/ecoles`;

      const res = await fetch(url, {
        method: selected ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de l'enregistrement");
      }

      notify(
        "success",
        selected
          ? "École mise à jour avec succès"
          : "École créée avec succès"
      );

      setModalOpen(false);
      setSelected(null);
      setForm(emptyForm);
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  }

  async function deactivateSchool() {
    if (!selected) return;

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/ecoles/${selected.id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de la désactivation");
      }

      notify("success", "École désactivée avec succès");
      setConfirmOpen(false);
      setSelected(null);
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erreur lors de la désactivation");
    } finally {
      setSaving(false);
    }
  }

  async function activateSchool(school: Ecole) {
    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/ecoles/${school.id}/activate`, {
        method: "PUT",
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de la réactivation");
      }

      notify("success", "École réactivée avec succès");
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erreur lors de la réactivation");
    } finally {
      setSaving(false);
    }
  }

  const totalSchools = schools.length;
  const activeSchools = schools.filter((s) => s.actif !== false).length;
  const inactiveSchools = schools.filter((s) => s.actif === false).length;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-gray-900">
      {notification && (
        <div
          className={`fixed right-5 top-5 z-[80] rounded-2xl px-5 py-4 shadow-xl border text-sm ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      <main className="p-4 md:p-8 space-y-6">
        <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium mb-3">
              Super administration
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Gestion des écoles
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Créez, modifiez, consultez, désactivez et réactivez les
              établissements scolaires.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 active:scale-[0.98] transition"
          >
            <span className="text-lg leading-none">+</span>
            Nouvelle école
          </button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total écoles" value={totalSchools} icon="🏫" />
          <StatCard title="Écoles actives" value={activeSchools} icon="✅" />
          <StatCard title="Écoles désactivées" value={inactiveSchools} icon="⛔" />
        </section>

        <section className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-lg">Liste des écoles</h2>
              <p className="text-sm text-gray-500">
                {filteredSchools.length} résultat(s) trouvé(s)
              </p>
            </div>

            <div className="w-full lg:w-[380px]">
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 focus-within:ring-2 focus-within:ring-blue-600">
                <span className="text-gray-400">🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher par nom, code, email, ville..."
                  className="w-full bg-transparent px-3 py-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-5 py-4 font-medium">École</th>
                  <th className="text-left px-5 py-4 font-medium">Code</th>
                  <th className="text-left px-5 py-4 font-medium">Contact</th>
                  <th className="text-left px-5 py-4 font-medium">Localisation</th>
                  <th className="text-left px-5 py-4 font-medium">Statut</th>
                  <th className="text-right px-5 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      Chargement des écoles...
                    </td>
                  </tr>
                ) : filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      Aucune école trouvée
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold">
                            {getInitials(school.nom)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{school.nom}</p>
                            <p className="text-xs text-gray-500">{school.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium">
                          {school.code || "Non défini"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <p>{school.telephone || "Téléphone non défini"}</p>
                        <p className="text-xs text-gray-400">{school.email}</p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <p>{school.ville || "Ville non définie"}</p>
                        <p className="text-xs text-gray-400">{school.pays || "Pays non défini"}</p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge active={school.actif !== false} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <ActionButton label="Voir" onClick={() => openDetailsModal(school)} />
                          <ActionButton label="Modifier" onClick={() => openEditModal(school)} />
                          {school.actif === false ? (
                            <ActionButton label="Réactiver" onClick={() => activateSchool(school)} green />
                          ) : (
                            <ActionButton label="Désactiver" onClick={() => openConfirmModal(school)} red />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="xl:hidden p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Chargement des écoles...
              </div>
            ) : filteredSchools.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Aucune école trouvée
              </div>
            ) : (
              filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold">
                        {getInitials(school.nom)}
                      </div>

                      <div>
                        <h3 className="font-semibold">{school.nom}</h3>
                        <p className="text-xs text-gray-500">{school.email}</p>
                      </div>
                    </div>

                    <StatusBadge active={school.actif !== false} />
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Code: {school.code || "Non défini"}</p>
                    <p>Téléphone: {school.telephone || "Non défini"}</p>
                    <p>Ville: {school.ville || "Non définie"}</p>
                    <p>Pays: {school.pays || "Non défini"}</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <ActionButton label="Voir" onClick={() => openDetailsModal(school)} full />
                    <ActionButton label="Modifier" onClick={() => openEditModal(school)} full />
                    {school.actif === false ? (
                      <ActionButton label="Réactiver" onClick={() => activateSchool(school)} green full />
                    ) : (
                      <ActionButton label="Désactiver" onClick={() => openConfirmModal(school)} red full />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {modalOpen && (
        <Modal
          title={selected ? "Modifier l'école" : "Créer une nouvelle école"}
          onClose={() => setModalOpen(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nom de l'école" required value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} />
            <Input label="Code" value={form.code} onChange={(v) => setForm({ ...form, code: v })} />
            <Input label="Email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input label="Téléphone" value={form.telephone} onChange={(v) => setForm({ ...form, telephone: v })} />
            <Input label="Ville" value={form.ville} onChange={(v) => setForm({ ...form, ville: v })} />
            <Input label="Pays" value={form.pays} onChange={(v) => setForm({ ...form, pays: v })} />
            <div className="md:col-span-2">
              <Input label="Adresse" value={form.adresse} onChange={(v) => setForm({ ...form, adresse: v })} />
            </div>

            {!selected && (
              <div className="md:col-span-2">
                <Input
                  label="Mot de passe administrateur"
                  required
                  type="password"
                  value={form.password}
                  onChange={(v) => setForm({ ...form, password: v })}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Ce mot de passe sera utilisé pour créer le compte administrateur de cette école.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              onClick={() => setModalOpen(false)}
              className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Annuler
            </button>

            <button
              onClick={saveSchool}
              disabled={saving}
              className="cursor-pointer rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60 transition"
            >
              {saving ? "Enregistrement..." : selected ? "Mettre à jour" : "Créer l'école"}
            </button>
          </div>
        </Modal>
      )}

      {detailsOpen && selected && (
        <Modal title="Détails de l'école" onClose={() => setDetailsOpen(false)}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-3xl bg-blue-50 p-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold">
                {getInitials(selected.nom)}
              </div>

              <div>
                <h3 className="font-bold text-lg">{selected.nom}</h3>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Code" value={selected.code} />
              <Info label="Téléphone" value={selected.telephone} />
              <Info label="Ville" value={selected.ville} />
              <Info label="Pays" value={selected.pays} />
              <Info label="Adresse" value={selected.adresse} />
              <Info label="Statut" value={selected.actif === false ? "Désactivée" : "Active"} />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => {
                  setDetailsOpen(false);
                  openEditModal(selected);
                }}
                className="cursor-pointer rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                Modifier
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirmOpen && selected && (
        <Modal title="Désactiver cette école ?" onClose={() => setConfirmOpen(false)}>
          <p className="text-sm text-gray-600 leading-6">
            Cette action va désactiver l'école, ses utilisateurs, ses élèves,
            ses professeurs, ses classes et ses matières. Vous pourrez réactiver
            l'école plus tard.
          </p>

          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 mt-4 text-red-700 text-sm">
            École sélectionnée: <strong>{selected.nom}</strong>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              onClick={() => setConfirmOpen(false)}
              className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Annuler
            </button>

            <button
              onClick={deactivateSchool}
              disabled={saving}
              className="cursor-pointer rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition"
            >
              {saving ? "Désactivation..." : "Désactiver"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {active ? "Active" : "Désactivée"}
    </span>
  );
}

function ActionButton({
  label,
  onClick,
  red,
  green,
  full,
}: {
  label: string;
  onClick: () => void;
  red?: boolean;
  green?: boolean;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition ${
        full ? "w-full" : ""
      } ${
        red
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : green
          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/40 cursor-pointer"
      />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <h2 className="font-bold text-lg">{title}</h2>

          <button
            onClick={onClose}
            className="cursor-pointer h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition"
      />
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-sm mt-1">{value || "Non défini"}</p>
    </div>
  );
}

function getInitials(name?: string) {
  if (!name) return "EC";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}