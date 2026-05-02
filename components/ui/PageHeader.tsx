import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  description,
  badge,
  actions,
}: Readonly<PageHeaderProps>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1.5 min-w-0">
        {badge && (
          <span className="inline-flex w-fit items-center rounded-full border border-gradient-to-r from-indigo-200 to-purple-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 shadow-sm">
            {badge}
          </span>
        )}
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        )}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
