"use client";

export default function AnnoncesPage() {

  const annonces = [
    {
      title: "Rentrée scolaire 2025-2026",
      content: "La rentrée scolaire est fixée au 2 septembre 2025...",
      author: "Jean-Pierre Martin",
      date: "2025-08-15",
      important: true,
      color: "red",
    },
    {
      title: "Réunion parents-professeurs",
      content: "Une réunion aura lieu...",
      author: "Jean-Pierre Martin",
      date: "2025-09-10",
      important: true,
      color: "red",
    },
    {
      title: "Examens du premier trimestre",
      content: "Les examens se dérouleront...",
      author: "Marie Louis",
      date: "2025-11-20",
      important: false,
      color: "blue",
    },
    {
      title: "Journée sportive",
      content: "La journée sportive annuelle...",
      author: "Jean-Pierre Martin",
      date: "2025-10-25",
      important: false,
      color: "blue",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Annonces
          </h1>
          <p className="text-sm text-gray-500">
            Communications et actualités
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm cursor-pointer">
          <span className="text-lg">+</span>
          Nouvelle annonce
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {annonces.map((a, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-4 hover:shadow-md transition cursor-pointer"
          >

            {/* ICON */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                a.color === "red"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              📢
            </div>

            {/* CONTENT */}
            <div className="flex-1">

              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-gray-900">
                  {a.title}
                </h3>

                {a.important && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    Important
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {a.content}
              </p>

              <p className="text-xs text-gray-400">
                {a.author} • {a.date}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}