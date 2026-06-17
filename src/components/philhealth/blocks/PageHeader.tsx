"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard page header used across all secondary pages.
 * Provides breadcrumbs, title, description, and consistent spacing.
 */
export function PageHeader({
  breadcrumbs,
  title,
  description,
  eyebrow,
  actions,
  className,
}: {
  breadcrumbs?: { label: string; page?: string }[];
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border bg-gradient-ph-soft", className)}>
      <div className="container-ph-wide py-8 md:py-12">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground/50">/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ph-green-darker bg-ph-green-light border border-ph-green/20 rounded-full px-3 py-1 mb-3">
            {eyebrow}
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-base md:text-lg text-muted-foreground text-pretty">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

/**
 * Section wrapper for consistent spacing and width.
 */
export function Section({
  children,
  className,
  containerClassName,
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-10 md:py-14", className)}
    >
      <div className={cn("container-ph-wide", containerClassName)}>{children}</div>
    </section>
  );
}

/**
 * Standard section heading with eyebrow.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ph-green-darker bg-ph-green-light border border-ph-green/20 rounded-full px-3 py-1 mb-3"
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-base text-muted-foreground text-pretty">{description}</p>
      )}
    </div>
  );
}

/**
 * Card surface used throughout the redesign.
 */
export function Card({
  children,
  className,
  as: Comp = "div",
  hoverable = false,
  ...props
}: React.ComponentProps<"div"> & {
  as?: React.ElementType;
  hoverable?: boolean;
}) {
  return (
    <Comp
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        hoverable &&
          "transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Status badge with consistent colors for system status visibility.
 */
export function StatusBadge({
  status,
  children,
}: {
  status: "active" | "pending" | "warning" | "error" | "neutral" | "success";
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    active: "bg-ph-green-light text-ph-green-darker border-ph-green/30",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-ph-green animate-pulse",
          status === "success" && "bg-emerald-500",
          status === "pending" && "bg-amber-500",
          status === "warning" && "bg-amber-500",
          status === "error" && "bg-red-500",
          status === "neutral" && "bg-slate-400"
        )}
      />
      {children}
    </span>
  );
}
