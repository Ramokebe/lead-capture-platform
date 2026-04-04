"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface CurrencyInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            R
          </span>
          <input
            ref={ref}
            id={props.id || props.name}
            type="number"
            step="0.01"
            min="0"
            className={`w-full pl-9 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
export default CurrencyInput;
