import React, { useState } from "react";

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  rows = 4,
  className = "",
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      {label && (
        <label
          className={`block text-xs font-medium transition-colors duration-200
          ${
            error
              ? "text-[var(--color-danger)]"
              : focused
              ? "text-[var(--color-secondary)]"
              : "text-gray-500"
          }`}
        >
          {label} {required && <span className="text-[var(--color-danger)]">*</span>}
        </label>
      )}

      {/* Textarea Wrapper */}
      <div
        className={`group rounded border bg-white transition-all duration-200
        ${
          error
            ? "border-[var(--color-danger)] focus-within:ring-2 focus-within:ring-[var(--color-danger)]"
            : "border-gray-300 focus-within:border-[var(--color-primary-light)] focus-within:ring-2 focus-within:ring-[var(--color-primary-light)]"
        }
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-70"
            : "hover:border-[var(--color-primary)]"
        }
        `}
      >
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full resize-none bg-transparent px-3 py-2.5 outline-none text-sm text-gray-800 placeholder-gray-400 rounded-xl ${className}`}
        />
      </div>

      {/* Error */}
      {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}

      {/* Helper */}
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;