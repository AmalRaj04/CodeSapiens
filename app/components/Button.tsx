"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all";

  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </motion.button>
  );
}
