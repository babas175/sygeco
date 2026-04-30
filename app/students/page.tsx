"use client";

import { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const students = [
    { id: "STD-001", name: "Pierre Duval", dob: "2012-03-15", gender: "Masculin", class: "6ème A", initials: "PD" },
    { id: "STD-002", name: "Marie Joseph", dob: "2012-07-22", gender: "Féminin", class: "6ème A", initials: "MJ" },
    { id: "STD-003", name: "Jean Baptiste", dob: "2012-11-08", gender: "Masculin", class: "6ème A", initials: "JB" },
    { id: "STD-004", name: "Anne Clermont", dob: "2012-01-30", gender: "Féminin", class: "6ème A", initials: "AC" },
    { id: "STD-005", name: "Marc Désir", dob: "2011-05-12", gender: "Masculin", class: "5ème A", initials: "MD" },
    { id: "STD-006", name: "Stéphanie François", dob: "2011-09-03", gender: "Féminin", class: "5ème A", initials: "SF" },
  ];

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Élèves
          </h1>
          <p className="text-sm text-gray-500">
            {filtered.length} élèves inscrits
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer">
          <Plus size={16} />
          Nouvel élève
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3">

        <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl px-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Rechercher un élève..."
            className="w-full px-2 py-2 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="bg-white border border-gray-200 px-4 rounded-xl text-sm hover:bg-gray-50 cursor-pointer shadow-sm">
          Toutes les classes
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          {/* HEAD */}
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Nom</th>
              <th className="px-5 py-3 text-left">Sexe</th>
              <th className="px-5 py-3 text-left">Classe</th>
              <th className="px-5 py-3 text-left">Naissance</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-gray-50 transition cursor-pointer"
              >

                {/* NAME */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 bg-blue-700 text-white flex items-center justify-center rounded-full text-xs font-semibold">
                      {s.initials}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {s.id}
                      </p>
                    </div>

                  </div>
                </td>

                {/* GENDER */}
                <td className="px-5 py-4 text-gray-700">
                  {s.gender}
                </td>

                {/* CLASS */}
                <td className="px-5 py-4">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    {s.class}
                  </span>
                </td>

                {/* DOB */}
                <td className="px-5 py-4 text-gray-500">
                  {s.dob}
                </td>

                {/* ACTION */}
                <td className="px-5 py-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                    <Eye size={16} className="text-gray-500" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}