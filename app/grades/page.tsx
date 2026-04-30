"use client";

export default function NotesPage() {

  const notes = [
    { student: "Pierre Duval", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "17/20", date: "2025-09-15" },
    { student: "Pierre Duval", subject: "Français", class: "6ème A", category: "Examen", grade: "15/20", date: "2025-09-20" },
    { student: "Marie Joseph", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "14/20", date: "2025-09-15" },
    { student: "Marie Joseph", subject: "Français", class: "6ème A", category: "Examen", grade: "18/20", date: "2025-09-20" },
    { student: "Jean Baptiste", subject: "Mathématiques", class: "6ème A", category: "Devoir", grade: "12/20", date: "2025-09-15" },
    { student: "Marc Désir", subject: "Mathématiques", class: "5ème A", category: "Devoir", grade: "16/20", date: "2025-09-15" },
    { student: "Marc Désir", subject: "Français", class: "5ème A", category: "Quiz", grade: "8/10", date: "2025-09-18" },
    { student: "Esther Noël", subject: "Anglais", class: "4ème A", category: "Participation", grade: "9/10", date: "2025-09-22" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Gestion des notes
          </h1>
          <p className="text-sm text-gray-500">
            Saisir et consulter les notes
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm cursor-pointer">
          <span className="text-lg">+</span>
          Ajouter des notes
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
          <option>Toutes les classes</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
          <option>Toutes les matières</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Élève</th>
              <th className="px-4 py-3 text-left">Matière</th>
              <th className="px-4 py-3 text-left">Classe</th>
              <th className="px-4 py-3 text-left">Catégorie</th>
              <th className="px-4 py-3 text-left">Note</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {notes.map((n, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {n.student}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {n.subject}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {n.class}
                </td>

                <td className="px-4 py-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {n.category}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`font-semibold ${
                      n.grade.startsWith("1") || n.grade.startsWith("9")
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {n.grade}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500 text-xs">
                  {n.date}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}