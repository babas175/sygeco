"use client";

export default function AttendancePage() {

  const students = [
    { name: "Pierre Duval", initials: "PD", class: "6ème A", status: "present" },
    { name: "Marie Joseph", initials: "MJ", class: "6ème A", status: "present" },
    { name: "Jean Baptiste", initials: "JB", class: "6ème A", status: "absent" },
    { name: "Anne Clermont", initials: "AC", class: "6ème A", status: "late" },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Gestion des présences
        </h1>
        <p className="text-sm text-gray-500">
          Enregistrer et consulter les présences
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">

        <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm cursor-pointer focus:ring-2 focus:ring-blue-500">
          <option>6ème A</option>
          <option>5ème A</option>
          <option>4ème A</option>
        </select>

        <input
          type="date"
          defaultValue="2025-09-02"
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm cursor-pointer focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition cursor-pointer">
          Enregistrer
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Élève</th>
              <th className="px-5 py-3 text-left">Classe</th>
              <th className="px-5 py-3 text-left">Statut</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {students.map((s, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-100 transition cursor-pointer"
              >

                {/* NAME */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <div className="bg-blue-700 text-white w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold">
                      {s.initials}
                    </div>

                    <p className="font-medium text-gray-900">
                      {s.name}
                    </p>

                  </div>
                </td>

                {/* CLASS */}
                <td className="px-5 py-4 text-gray-700">
                  {s.class}
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <StatusBadge status={s.status} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: any) {

  if (status === "present") {
    return (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
        ✓ Présent
      </span>
    );
  }

  if (status === "absent") {
    return (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
        ✕ Absent
      </span>
    );
  }

  return (
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
      ⏱ En retard
    </span>
  );
}