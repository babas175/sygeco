"use client";

import { Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <div className="space-y-8">
      <PageHeader
        title="Emploi du temps"
        description="Planning hebdomadaire des cours."
      />

      <div>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20">
          <option>6ème A</option>
          <option>5ème A</option>
          <option>4ème A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(schedule).map(([day, courses]) => (
          <div
            key={day}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02]"
          >
            <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white">
              {day}
            </div>

            <div className="space-y-3 p-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-indigo-100 hover:bg-white"
                >
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock size={14} strokeWidth={2} className="text-indigo-500" aria-hidden />
                    {course.time}
                  </p>

                  <p className="font-semibold text-slate-900">{course.subject}</p>

                  <p className="mt-1 text-xs text-slate-600">{course.teacher}</p>

                  <p className="mt-2 text-xs font-medium text-slate-400">{course.room}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
