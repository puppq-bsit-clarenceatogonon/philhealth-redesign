"use client";

import * as React from "react";
import {
  Bell,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  Star,
  AlertCircle,
  Info,
  FileText,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { latestAdvisories, type Advisory } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

const categoryColors: Record<Advisory["category"], string> = {
  Advisory: "bg-amber-50 text-amber-700 border-amber-200",
  Adoption: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Circular: "bg-blue-50 text-blue-700 border-blue-200",
  News: "bg-ph-green-light text-ph-green-darker border-ph-green/20",
  "Press Release": "bg-violet-50 text-violet-700 border-violet-200",
};

const priorityBadge: Record<NonNullable<Advisory["priority"]>, { label: string; color: string }> = {
  high: { label: "High Priority", color: "bg-red-50 text-red-700 border-red-200" },
  medium: { label: "Important", color: "bg-amber-50 text-amber-700 border-amber-200" },
  low: { label: "Informational", color: "bg-slate-50 text-slate-700 border-slate-200" },
};

export function NewsPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Duplicate advisories for more content
  const allAdvisories: Advisory[] = [...latestAdvisories, ...latestAdvisories.map((a, i) => ({
    ...a,
    id: `${a.id}-dup-${i}`,
    date: "Apr 2025",
  }))];

  const categories = ["all", ...Array.from(new Set(allAdvisories.map((a) => a.category)))];

  const filtered = allAdvisories.filter((a) => {
    if (activeCategory !== "all" && a.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  const featured = filtered[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "News & Advisories" }]}
        eyebrow="News & Advisories"
        title="Stay informed with PhilHealth"
        description="Official circulars, advisories, press releases, and announcements — all in one place, updated regularly."
        actions={
          <Button
            variant="outline"
            onClick={() => navigate("downloads")}
            className="bg-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Circulars archive
          </Button>
        }
      />

      <Section className="!py-8">
        {/* Search & filter */}
        <Card className="p-4 mb-5 sticky top-16 lg:top-18 z-30 bg-white/95 backdrop-blur">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search advisories, circulars, and news..."
                className="pl-9 h-11"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin mt-3 pt-3 border-t">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                  activeCategory === cat ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
                )}
              >
                {cat === "all" ? "All categories" : cat}
              </button>
            ))}
          </div>
        </Card>

        {/* Featured article */}
        {featured && (
          <Card className="overflow-hidden mb-5 cursor-pointer hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 gradient-ph-brand p-6 md:p-8 text-white min-h-[200px] flex flex-col justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-white/20 text-white hover:bg-white/20">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                  <Badge className={cn("border", categoryColors[featured.category])}>
                    {featured.category}
                  </Badge>
                </div>
                <div>
                  <div className="text-xs text-white/80 uppercase tracking-wider">
                    {featured.date}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mt-2 leading-tight">
                    {featured.title}
                  </h2>
                </div>
              </div>
              <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-ph-green">
                  Read full article
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(1).map((adv) => {
            const Icon = adv.priority === "high" ? AlertCircle : adv.priority === "medium" ? Info : Newspaper;
            return (
              <Card
                key={adv.id}
                className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  {adv.priority && (
                    <Badge variant="outline" className={cn("text-[10px] border", priorityBadge[adv.priority].color)}>
                      {priorityBadge[adv.priority].label}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  <span className={cn("px-1.5 py-0.5 rounded border", categoryColors[adv.category])}>
                    {adv.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {adv.date}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-tight">{adv.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3 flex-1">
                  {adv.excerpt}
                </p>
                <div className="mt-3 text-xs font-medium text-ph-green flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No advisories found</h3>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term.</p>
          </Card>
        )}
      </Section>
    </div>
  );
}
