"use client";

import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className={`mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${className}`}
            {...props}
          />
          <span className="text-sm text-gray-600">{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
