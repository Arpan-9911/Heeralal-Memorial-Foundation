import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  icon,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      {label && (
        <label
          className={`block text-xs font-medium transition-colors duration-200
          ${
            error
              ? "text-red-500"
              : focused
                ? "text-amber-600"
                : "text-gray-500"
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`group flex items-center rounded border px-3 py-2.5 bg-white
        transition-all duration-200
        ${
          error
            ? "border-red-400 focus-within:ring-3 focus-within:ring-red-200"
            : "border-gray-300 focus-within:border-amber-400 focus-within:ring-3 focus-within:ring-amber-200"
        }
        ${
          disabled
            ? "bg-gray-100 cursor-not-allowed opacity-70"
            : "hover:border-amber-300"
        }
        `}
      >
        {/* Left Icon */}
        {icon && (
          <span className="mr-2 text-gray-400 transition-colors duration-200 group-focus-within:text-amber-500">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 ${className}`}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            className="ml-2 text-gray-400 hover:text-amber-500 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Helper */}
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
