import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:from-indigo-700 hover:to-purple-700 focus-visible:ring-2 focus-visible:ring-indigo-500/40",
  secondary:
    "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md hover:shadow-lg hover:from-slate-800 hover:to-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400/30",
  outline:
    "border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-300/50",
  ghost:
    "text-slate-600 hover:bg-gradient-to-r hover:from-indigo-100/50 hover:to-purple-100/50 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-300/50",
  danger:
    "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-700 hover:to-rose-700 focus-visible:ring-2 focus-visible:ring-red-500/40",
};

const sizes: Record<Size, string> = {
  sm: "gap-1.5 px-3 py-2 text-xs font-medium rounded-lg",
  md: "gap-2 px-4 py-2.5 text-sm font-medium rounded-xl",
  lg: "gap-2 px-5 py-3 text-sm font-semibold rounded-xl",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
