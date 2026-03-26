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
      "bg-gradient-to-br from-[var(--color-primary-light)] via-[var(--color-primary)] to-[var(--color-primary-dark)] text-black " +
      "shadow-[0_6px_20px_rgba(251,191,36,0.35)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:-translate-y-[2px] focus:ring-[var(--color-primary-light)]",

    // ✨ CLEAN PROFESSIONAL
    secondary:
      "bg-[var(--color-secondary)] text-white " +
      "shadow-[0_6px_20px_rgba(251,191,36,0.35)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:-translate-y-[2px] hover:bg-[var(--color-secondary-dark)] focus:ring-[var(--color-secondary)]",

    // ⚡ MINIMAL OUTLINE
    outline:
      "border border-[var(--color-primary)] text-[var(--color-secondary)] " +
      "hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary-light)] " +
      "shadow-[0_6px_20px_rgba(251,191,36,0.35)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:-translate-y-[2px] focus:ring-[var(--color-primary)]",

    // 💡 SUBTLE ACTION
    ghost:
      "text-[var(--color-secondary)] hover:bg-[var(--color-primary-light)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:-translate-y-[2px] focus:ring-[var(--color-secondary-light)]",

    // 🚨 DANGER
    danger:
      "bg-[var(--color-danger)] text-white " +
      "shadow-[0_6px_20px_rgba(251,191,36,0.35)] " +
      "hover:shadow-[0_10px_30px_rgba(251,191,36,0.55)] " +
      "hover:bg-[var(--color-danger)] hover:-translate-y-[2px] focus:ring-[var(--color-danger)]",

    // 💎 GLASS PREMIUM (best on dark bg)
    glass:
      "bg-[var(--color-primary-light)]/20 backdrop-blur-xl text-[var(--color-secondary-light) " +
      "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(251,191,36,0.25)] " +
      "hover:bg-[var(--color-primary-light)]/30 focus:ring-[var(--color-primary)] hover:-translate-y-[2px]",
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
      <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-[var(--color-primary-light)]/25 to-[var(--color-primary)]/25 blur-md"></span>

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