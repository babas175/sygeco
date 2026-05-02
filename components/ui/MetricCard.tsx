import type { ReactNode } from "react";

export type MetricVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

const shells: Record<MetricVariant, string> = {
  neutral: "border-slate-200/50 bg-gradient-to-br from-slate-50 to-slate-100/50 shadow-md shadow-slate-500/10",
  primary: "border-indigo-200/50 bg-gradient-to-br from-indigo-50 to-purple-50/50 shadow-md shadow-indigo-500/15",
  success: "border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-teal-50/50 shadow-md shadow-emerald-500/15",
  warning: "border-amber-200/50 bg-gradient-to-br from-amber-50 to-yellow-50/50 shadow-md shadow-amber-500/15",
  danger: "border-red-200/50 bg-gradient-to-br from-red-50 to-rose-50/50 shadow-md shadow-red-500/15",
};

const iconBg: Record<MetricVariant, string> = {
  neutral: "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600",
  primary: "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600",
  success: "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600",
  warning: "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600",
  danger: "bg-gradient-to-br from-red-100 to-rose-100 text-red-600",
};

export type MetricCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  variant?: MetricVariant;
};

export function MetricCard({
  title,
  value,
  icon,
  variant = "neutral",
}: Readonly<MetricCardProps>) {
  return (
    <div
      className={`rounded-2xl border p-6 ring-1 ring-slate-950/2 ${shells[variant]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {value}
          </p>
        </div>
        {icon ? (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg[variant]} ring-1 ring-white/80`}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
