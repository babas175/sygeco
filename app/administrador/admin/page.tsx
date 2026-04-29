/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../../lib/api";

export default function AdminDashboard() {
  const [ecoles, setEcoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    nom: "",
    code: "",
    adresse: "",
    telephone: "",
    email: "",
    password: "",
  });

  // ======================
  // LOAD
  // ======================
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/ecoles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setEcoles(data);
      setLoading(false);
    }

    load();
  }, []);

  // ======================
  // CREATE
  // ======================
  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/ecoles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setEcoles((prev) => [...prev, data.ecole]);
    closeModal();
  };

  // ======================
  // UPDATE
  // ======================
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/ecoles/${editing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const updated = await res.json();

    setEcoles((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );

    closeModal();
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette école ?")) return;

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/ecoles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setEcoles((prev) => prev.filter((e) => e.id !== id));
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (e: any) => {
    setEditing(e);

    setForm({
      nom: e.nom || "",
      code: e.code || "",
      adresse: e.adresse || "",
      telephone: e.telephone || "",
      email: e.email || "",
      password: "",
    });

    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditing(null);

    setForm({
      nom: "",
      code: "",
      adresse: "",
      telephone: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#0b3aa5] text-white p-6 flex-col">
        <h1 className="text-xl font-bold mb-8">SYGECO</h1>

        <nav className="space-y-3 text-sm">
          <p className="opacity-90">Dashboard</p>
          <p className="opacity-90 font-medium">Écoles</p>
        </nav>

        <button className="mt-auto text-sm text-blue-200">
          Déconnexion
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Écoles
            </h1>
            <p className="text-sm text-gray-600">
              Gestion des établissements
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
          >
            + Nouvelle école
          </button>

        </div>

        {/* LIST */}
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {ecoles.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {e.nom}
                  </h3>
                  <p className="text-xs text-gray-500">{e.code}</p>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p><b>Email:</b> {e.email}</p>
                  <p><b>Téléphone:</b> {e.telephone || "-"}</p>
                  <p><b>Adresse:</b> {e.adresse || "-"}</p>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(e)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

      </main>

      {/* MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-5">
              {editing ? "Modifier école" : "Nouvelle école"}
            </h2>

            <div className="space-y-4">
              <Input label="Nom" value={form.nom} onChange={(v)=>setForm({...form, nom:v})}/>
              <Input label="Code" value={form.code} onChange={(v)=>setForm({...form, code:v})}/>
              <Input label="Adresse" value={form.adresse} onChange={(v)=>setForm({...form, adresse:v})}/>
              <Input label="Téléphone" value={form.telephone} onChange={(v)=>setForm({...form, telephone:v})}/>
              <Input label="Email" value={form.email} onChange={(v)=>setForm({...form, email:v})}/>
              <Input label="Mot de passe" value={form.password} onChange={(v)=>setForm({...form, password:v})}/>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>

              <button
                onClick={editing ? handleUpdate : handleCreate}
                className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
              >
                {editing ? "Mettre à jour" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* INPUT */
function Input({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
        text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none"
      />
    </div>
  );
}