import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  children,
  className = "",
  clickable = false,
  padding = "md",
}: Readonly<CardProps>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[var(--card-shadow)] ring-1 ring-slate-950/[0.02] transition ${
        clickable
          ? "cursor-pointer hover:border-indigo-200/80 hover:shadow-md"
          : ""
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
