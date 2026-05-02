import type { ReactNode } from "react";

export type ChartPanelProps = {
  title: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function ChartPanel({
  title,
  action,
  children,
  className = "",
}: Readonly<ChartPanelProps>) {
  return (
    <div
      className={`rounded-2xl border border-gradient-to-r from-indigo-200/30 to-purple-200/30 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-lg shadow-indigo-500/5 ring-1 ring-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 ${className}`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          {title}
        </h3>
        {action}
      </div>
      {children ?? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 text-center">
          <p className="text-sm text-slate-500">Aucune donnée pour le moment</p>
        </div>
      )}
    </div>
  );
}
