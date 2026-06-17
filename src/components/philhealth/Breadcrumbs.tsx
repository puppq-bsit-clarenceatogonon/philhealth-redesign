"use client";

import { ChevronRight, Home } from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";

type Crumb = { label: string; page?: PageKey };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { navigate } = useNavigation();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-muted-foreground"
    >
      <ol className="flex items-center flex-wrap gap-1">
        <li>
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-1 hover:text-ph-green transition-colors p-1 rounded"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </button>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5 mx-0.5 text-muted-foreground/60" />
            {item.page && i < items.length - 1 ? (
              <button
                onClick={() => navigate(item.page!)}
                className="hover:text-ph-green transition-colors p-1"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-foreground font-medium p-1" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
