"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, fullWidth, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark active:scale-[0.98]",
      secondary: "bg-accent text-white hover:bg-accent-dark active:scale-[0.98]",
      danger: "bg-danger text-white hover:bg-danger-dark active:scale-[0.98]",
      success: "bg-accent text-white hover:bg-accent-dark active:scale-[0.98]",
      ghost: "bg-transparent text-primary hover:bg-primary-light active:scale-[0.98]",
      outline: "bg-white text-primary border-2 border-primary hover:bg-primary-light active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2.5 text-base rounded-xl",
      lg: "px-6 py-3.5 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };