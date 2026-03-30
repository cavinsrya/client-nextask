"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function FormInput({
  label,
  error,
  icon,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-clash font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-2.5 text-slate-900 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm",
            icon && "pl-10",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
