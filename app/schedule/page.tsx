"use client";

export default function SchedulePage() {

  const schedule = {
    Lundi: [
      {
        time: "07:30 - 09:00",
        subject: "Mathématiques",
        teacher: "Marie Louis",
        room: "Salle 101",
      },
      {
        time: "09:15 - 10:45",
        subject: "Français",
        teacher: "Jacques Jean-Baptiste",
        room: "Salle 101",
      },
      {
        time: "11:00 - 12:30",
        subject: "Sciences Naturelles",
        teacher: "Marie Louis",
        room: "Labo",
      },
    ],
    Mardi: [
      {
        time: "07:30 - 09:00",
        subject: "Anglais",
        teacher: "Sophie Charles",
        room: "Salle 101",
      },
      {
        time: "09:15 - 10:45",
        subject: "Histoire-Géographie",
        teacher: "Jacques Jean-Baptiste",
        room: "Salle 101",
      },
    ],
    Mercredi: [
      {
        time: "07:30 - 09:00",
        subject: "Mathématiques",
        teacher: "Marie Louis",
        room: "Salle 101",
      },
    ],
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">
          Emploi du temps
        </h1>
        <p className="text-sm text-gray-500">
          Planning hebdomadaire des cours
        </p>
      </div>

      {/* FILTER */}
      <div>
        <select className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-sm cursor-pointer">
          <option>6ème A</option>
          <option>5ème A</option>
          <option>4ème A</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(schedule).map(([day, courses]) => (
          <div
            key={day}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="bg-[#132f7a] text-white px-4 py-2 text-sm font-semibold">
              {day}
            </div>

            <div className="p-3 space-y-3">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    🕒 {course.time}
                  </p>

                  <p className="font-medium text-sm">
                    {course.subject}
                  </p>

                  <p className="text-xs text-gray-500">
                    {course.teacher}
                  </p>

                  <p className="text-xs text-gray-400">
                    {course.room}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}