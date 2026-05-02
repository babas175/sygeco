import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
}

export default function Card({ children, className = "", clickable = false }: Readonly<CardProps>) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${
        clickable ? "cursor-pointer hover:border-blue-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
