"use client";
import { ChevronDown } from "lucide-react";
import { Label } from "../ui/label";
import { useEffect } from "react";

export type SearchableFieldOption = {
  value: string;
  label: string;
};

type Props = {
  options: SearchableFieldOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
};

export default function SearchableFieldSelector({
  options,
  value,
  onChange,
  placeholder = "Select field to search",
  className = "",
  label = "Search In",
  disabled = false,
  error,
}: Props) {
  const id = "searchable-field-selector";
  const hasValue = value && value !== "";

  useEffect(() => {
    if (!hasValue && options.length > 0 && !disabled) {
      onChange(options[0].value);
    }
  }, [hasValue, options, onChange, disabled]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            appearance-none w-full px-3 py-2 pr-10 text-sm rounded-md
            border transition-all duration-200
            ${hasValue ? "text-gray-900" : "text-gray-500"}
            ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }
            ${
              disabled
                ? "bg-gray-50 text-gray-500 cursor-not-allowed opacity-60"
                : "bg-white hover:border-gray-400 cursor-pointer"
            }
            focus:outline-none focus:ring-2
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`
            absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
            transition-colors duration-200
            ${disabled ? "text-gray-400" : "text-gray-500"}
          `}
          size={16}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
