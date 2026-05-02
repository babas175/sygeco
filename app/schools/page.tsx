"use client";

import { API_URL } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

type School = {
  id: string;
  name: string;
  code?: string;
  address?: string;
  phone?: string;
  email: string;
  city?: string;
  country?: string;
  is_active?: boolean;
  disabled_at?: string | null;
  createdAt?: string;
};

type FormState = {
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  country: string;
  password: string;
};

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

const emptyForm: FormState = {
  name: "",
  code: "",
  address: "",
  phone: "",
  email: "",
  city: "",
  country: "",
  password: "",
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<School | null>(null);
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

      const res = await fetch(`${API_URL}/schools`, {
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao carregar as escolas");
      }

      setSchools(Array.isArray(data) ? data : []);
    } catch (error: any) {
      notify("error", error.message || "Impossível carregar as escolas");
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
        school.name,
        school.code,
        school.email,
        school.phone,
        school.city,
        school.country,
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

  function openEditModal(school: School) {
    setSelected(school);

    setForm({
      name: school.name || "",
      code: school.code || "",
      address: school.address || "",
      phone: school.phone || "",
      email: school.email || "",
      city: school.city || "",
      country: school.country || "",
      password: "",
    });

    setModalOpen(true);
  }

  function openDetailsModal(school: School) {
    setSelected(school);
    setDetailsOpen(true);
  }

  function openConfirmModal(school: School) {
    setSelected(school);
    setConfirmOpen(true);
  }

  async function saveSchool() {
    try {
      setSaving(true);

      if (!form.name || !form.email || (!selected && !form.password)) {
        notify("error", "Por favor, preencha os campos obrigatórios");
        return;
      }

      const payload: any = {
        name: form.name,
        code: form.code,
        address: form.address,
        phone: form.phone,
        email: form.email,
        city: form.city,
        country: form.country,
      };

      if (!selected) {
        payload.password = form.password;
      }

      const url = selected
        ? `${API_URL}/schools/${selected.id}`
        : `${API_URL}/schools`;

      const res = await fetch(url, {
        method: selected ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao salvar");
      }

      notify(
        "success",
        selected
          ? "Escola atualizada com sucesso"
          : "Escola criada com sucesso"
      );

      setModalOpen(false);
      setSelected(null);
      setForm(emptyForm);
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function deactivateSchool() {
    if (!selected) return;

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/schools/${selected.id}`, {
        method: "DELETE",
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao desativar");
      }

      notify("success", "Escola desativada com sucesso");
      setConfirmOpen(false);
      setSelected(null);
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erro ao desativar");
    } finally {
      setSaving(false);
    }
  }

  async function activateSchool(school: School) {
    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/schools/${school.id}/activate`, {
        method: "PUT",
        headers,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao reativar");
      }

      notify("success", "Escola reativada com sucesso");
      await loadSchools();
    } catch (error: any) {
      notify("error", error.message || "Erro ao reativar");
    } finally {
      setSaving(false);
    }
  }

  const totalSchools = schools.length;
  const activeSchools = schools.filter((s) => s.is_active !== false).length;
  const inactiveSchools = schools.filter((s) => s.is_active === false).length;

  return (
    <>
      {notification && (
        <div
          className={`fixed right-5 top-5 z-[80] rounded-2xl border px-5 py-4 text-sm shadow-xl ${
            notification.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="space-y-8 text-slate-900">
        <PageHeader
          badge="Superadministração"
          title="Gestion des écoles"
          description="Créer, modifier, consulter, désactiver et réactiver les établissements."
          actions={
            <Button variant="primary" size="md" type="button" onClick={openCreateModal}>
              Nouvelle école
            </Button>
          }
        />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Total d’écoles"
            value={totalSchools}
            variant="primary"
            icon={<span className="text-xl">🏫</span>}
          />
          <MetricCard
            title="Écoles actives"
            value={activeSchools}
            variant="success"
            icon={<span className="text-xl">✅</span>}
          />
          <MetricCard
            title="Écoles désactivées"
            value={inactiveSchools}
            variant="warning"
            icon={<span className="text-xl">⛔</span>}
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Liste des écoles</h2>
              <p className="text-sm text-slate-500">
                {filteredSchools.length} résultat(s)
              </p>
            </div>

            <div className="w-full lg:w-[380px]">
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <span className="text-slate-400">🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher par nom, code, email, ville..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="text-left px-5 py-4 font-medium">Escola</th>
                  <th className="text-left px-5 py-4 font-medium">Código</th>
                  <th className="text-left px-5 py-4 font-medium">Contato</th>
                  <th className="text-left px-5 py-4 font-medium">Localização</th>
                  <th className="text-left px-5 py-4 font-medium">Status</th>
                  <th className="text-right px-5 py-4 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      Carregando escolas...
                    </td>
                  </tr>
                ) : filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                      Nenhuma escola encontrada
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id} className="border-slate-100 transition hover:bg-slate-50/80">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                            {getInitials(school.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{school.name}</p>
                            <p className="text-xs text-gray-500">{school.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium">
                          {school.code || "Não definido"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <p>{school.phone || "Telefone não definido"}</p>
                        <p className="text-xs text-gray-400">{school.email}</p>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <p>{school.city || "Cidade não definida"}</p>
                        <p className="text-xs text-gray-400">{school.country || "País não definido"}</p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge active={school.is_active !== false} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <ActionButton label="Ver" onClick={() => openDetailsModal(school)} />
                          <ActionButton label="Editar" onClick={() => openEditModal(school)} />
                          {school.is_active === false ? (
                            <ActionButton label="Reativar" onClick={() => activateSchool(school)} green />
                          ) : (
                            <ActionButton label="Desativar" onClick={() => openConfirmModal(school)} red />
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
                Carregando escolas...
              </div>
            ) : filteredSchools.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Nenhuma escola encontrada
              </div>
            ) : (
              filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                        {getInitials(school.name)}
                      </div>

                      <div>
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-xs text-gray-500">{school.email}</p>
                      </div>
                    </div>

                    <StatusBadge active={school.is_active !== false} />
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Código: {school.code || "Não definido"}</p>
                    <p>Telefone: {school.phone || "Não definido"}</p>
                    <p>Cidade: {school.city || "Não definida"}</p>
                    <p>País: {school.country || "Não definido"}</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <ActionButton label="Ver" onClick={() => openDetailsModal(school)} full />
                    <ActionButton label="Editar" onClick={() => openEditModal(school)} full />
                    {school.is_active === false ? (
                      <ActionButton label="Reativar" onClick={() => activateSchool(school)} green full />
                    ) : (
                      <ActionButton label="Desativar" onClick={() => openConfirmModal(school)} red full />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {modalOpen && (
        <Modal
          title={selected ? "Editar Escola" : "Criar Nova Escola"}
          onClose={() => setModalOpen(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nome da Escola" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Código" value={form.code} onChange={(v) => setForm({ ...form, code: v })} />
            <Input label="Email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input label="Telefone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Input label="Cidade" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Input label="País" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
            <div className="md:col-span-2">
              <Input label="Endereço" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            </div>

            {!selected && (
              <div className="md:col-span-2">
                <Input
                  label="Senha do Administrador"
                  required
                  type="password"
                  value={form.password}
                  onChange={(v) => setForm({ ...form, password: v })}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Esta senha será usada para criar a conta de administrador desta escola.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              onClick={() => setModalOpen(false)}
              className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>

            <button
              onClick={saveSchool}
              disabled={saving}
              className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {saving ? "Salvando..." : selected ? "Atualizar" : "Criar Escola"}
            </button>
          </div>
        </Modal>
      )}

      {detailsOpen && selected && (
        <Modal title="Detalhes da Escola" onClose={() => setDetailsOpen(false)}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-3xl bg-indigo-50 p-4">
              <div className="h-14 w-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                {getInitials(selected.name)}
              </div>

              <div>
                <h3 className="font-bold text-lg">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Info label="Código" value={selected.code} />
              <Info label="Telefone" value={selected.phone} />
              <Info label="Cidade" value={selected.city} />
              <Info label="País" value={selected.country} />
              <Info label="Endereço" value={selected.address} />
              <Info label="Status" value={selected.is_active === false ? "Desativada" : "Ativa"} />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => {
                  setDetailsOpen(false);
                  openEditModal(selected);
                }}
                className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Editar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirmOpen && selected && (
        <Modal title="Desativar esta escola?" onClose={() => setConfirmOpen(false)}>
          <p className="text-sm text-gray-600 leading-6">
            Esta ação desativará a escola, seus usuários, alunos,
            professores, classes e matérias. Você poderá reativar
            a escola mais tarde.
          </p>

          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 mt-4 text-red-700 text-sm">
            Escola selecionada: <strong>{selected.name}</strong>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              onClick={() => setConfirmOpen(false)}
              className="cursor-pointer rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>

            <button
              onClick={deactivateSchool}
              disabled={saving}
              className="cursor-pointer rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition"
            >
              {saving ? "Desativando..." : "Desativar"}
            </button>
          </div>
        </Modal>
      )}
    </>
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
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
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