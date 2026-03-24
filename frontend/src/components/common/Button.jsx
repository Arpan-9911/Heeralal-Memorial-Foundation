import React from "react";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const Button = ({
  children,
  onClick,
  type = "button",
  to,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  className = "",
}) => {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded font-semibold tracking-wide transition-all duration-300 ease-out active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden";

  const variants = {
    // 🔥 MAIN PREMIUM BUTTON
    primary:
      "bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-black " +
      "shadow-[0_6px_20px_rgba(251,191,36,0.35)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:-translate-y-[2px] focus:ring-amber-400",

    // ✨ CLEAN PROFESSIONAL
    secondary:
      "bg-amber-600 text-white border border-amber-200 " +
      "shadow-sm hover:shadow-md hover:-translate-y-[1px] " +
      "hover:bg-amber-700 focus:ring-amber-800",

    // ⚡ MINIMAL OUTLINE
    outline:
      "border border-amber-300 text-amber-600 " +
      "hover:bg-amber-50 hover:border-amber-400 " +
      "focus:ring-amber-300",

    // 💡 SUBTLE ACTION
    ghost:
      "text-amber-600 hover:bg-amber-100/60 focus:ring-amber-200",

    // 🚨 DANGER
    danger:
      "bg-red-500 text-white shadow-sm " +
      "hover:bg-red-600 hover:shadow-md hover:-translate-y-[1px] focus:ring-red-400",

    // 💎 GLASS PREMIUM (best on dark bg)
    glass:
      "bg-amber-400/20 backdrop-blur-xl text-amber-200 border border-amber-300/30 " +
      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(251,191,36,0.25)] " +
      "hover:bg-amber-400/30 focus:ring-amber-300",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none";

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${
    disabled || loading ? disabledStyle : ""
  } ${className}`;

  const content = (
    <>
      {loading ? (
        <FiLoader className="animate-spin text-base" />
      ) : (
        icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )
      )}

      <span className="relative z-10">{children}</span>

      {/* 🌟 Glow Aura */}
      <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-amber-200/50 via-yellow-200/50 to-amber-300/50 blur-md"></span>

      {/* ✨ Top Shine Line */}
      <span className="absolute top-0 left-0 w-full h-px bg-white/40 opacity-50"></span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;