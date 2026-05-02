import type { ReactNode } from "react";

export type StatGradient =
  | "indigo"
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "cyan"
  | "orange"
  | "pink";

const gradients: Record<StatGradient, string> = {
  indigo: "from-indigo-500 to-purple-600",
  blue: "from-blue-500 to-cyan-600",
  green: "from-green-500 to-emerald-600",
  amber: "from-amber-500 to-orange-600",
  rose: "from-rose-500 to-pink-600",
  cyan: "from-cyan-500 to-blue-600",
  orange: "from-orange-500 to-red-600",
  pink: "from-pink-500 to-rose-600",
};

const gradientBackgrounds: Record<StatGradient, string> = {
  indigo: "bg-gradient-to-br from-indigo-50 to-purple-50/50",
  blue: "bg-gradient-to-br from-blue-50 to-cyan-50/50",
  green: "bg-gradient-to-br from-green-50 to-emerald-50/50",
  amber: "bg-gradient-to-br from-amber-50 to-orange-50/50",
  rose: "bg-gradient-to-br from-rose-50 to-pink-50/50",
  cyan: "bg-gradient-to-br from-cyan-50 to-blue-50/50",
  orange: "bg-gradient-to-br from-orange-50 to-red-50/50",
  pink: "bg-gradient-to-br from-pink-50 to-rose-50/50",
};

const borderGradients: Record<StatGradient, string> = {
  indigo: "border-indigo-200/50",
  blue: "border-blue-200/50",
  green: "border-green-200/50",
  amber: "border-amber-200/50",
  rose: "border-rose-200/50",
  cyan: "border-cyan-200/50",
  orange: "border-orange-200/50",
  pink: "border-pink-200/50",
};

export type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  gradient?: StatGradient;
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  gradient = "indigo",
}: Readonly<StatCardProps>) {
  const g = gradients[gradient];
  const bg = gradientBackgrounds[gradient];
  const border = borderGradients[gradient];

  return (
    <div className={`group relative overflow-hidden rounded-2xl border ${border} ${bg} p-6 shadow-lg shadow-slate-950/5 ring-1 ring-white/80`}>
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-linear-to-br ${g} opacity-10`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {value}
          </p>
          <p className="text-xs font-medium text-slate-500">{subtitle}</p>
        </div>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${g} text-white shadow-lg shadow-slate-950/20 ring-1 ring-white/30`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
