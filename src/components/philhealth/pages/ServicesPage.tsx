"use client";

import * as React from "react";
import {
  Search,
  UserPlus,
  Wallet,
  FileSearch,
  Stethoscope,
  Building2,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  Upload,
  Plane,
  Users,
  Accessibility,
  CreditCard,
  UserCog,
  ScrollText,
  Star,
  Info,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  services,
  serviceCategories,
  type ServiceItem,
} from "@/lib/philhealth-data";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, Icons.LucideIcon> = {
  UserPlus,
  Wallet,
  FileSearch,
  Stethoscope,
  Building2,
  Sparkles,
  FileText,
  Scale,
  Upload,
  Plane,
  Users,
  Accessibility,
  CreditCard,
  UserCog,
  ScrollText,
};

export function ServicesPage() {
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [onlineOnly, setOnlineOnly] = React.useState(false);

  const filteredServices = services.filter((s) => {
    if (activeCategory !== "all" && s.category !== activeCategory) return false;
    if (onlineOnly && !s.onlineAvailable) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.requirements.some((r) => r.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Services" }]}
        eyebrow="PhilHealth Services"
        title="Government services, redesigned for you"
        description="Every PhilHealth service in one place — with clear requirements, processing times, and online availability. No more guessing."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => navigate("downloads")}
              className="bg-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Forms & Downloads
            </Button>
            <Button
              onClick={() => navigate("member-portal")}
              className="bg-ph-green hover:bg-ph-green-dark text-white"
            >
              Open Member Portal
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </>
        }
      />

      {/* Stats banner */}
      <div className="border-b border-border bg-white">
        <div className="container-ph-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "16", label: "Services available online", icon: CheckCircle2 },
            { value: "1–3 days", label: "Average processing time", icon: Clock },
            { value: "24/7", label: "Online portal availability", icon: Sparkles },
            { value: "0", label: "Paperwork required for online", icon: FileText },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & search bar */}
      <Section className="!py-8">
        <Card className="p-4 md:p-5 sticky top-16 lg:top-18 z-30 bg-white/95 backdrop-blur shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, requirements, or keywords..."
                className="pl-9 h-11"
                aria-label="Search services"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1 md:pb-0">
              <button
                onClick={() => setOnlineOnly(!onlineOnly)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  onlineOnly
                    ? "bg-ph-green text-white border-ph-green"
                    : "bg-white text-foreground border-border hover:bg-muted"
                )}
              >
                <CheckCircle2 className="h-3 w-3" />
                Online only
              </button>
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {filteredServices.length} services
              </Badge>
            </div>
          </div>
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-thin mt-3 pt-3 border-t">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                activeCategory === "all"
                  ? "bg-ph-green text-white"
                  : "bg-muted hover:bg-ph-green-light hover:text-ph-green-darker"
              )}
            >
              All categories
            </button>
            {serviceCategories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                    activeCategory === cat.id
                      ? "bg-ph-green text-white"
                      : "bg-muted hover:bg-ph-green-light hover:text-ph-green-darker"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Category overview cards */}
        {activeCategory === "all" && !search && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? Sparkles;
              const count = services.filter((s) => s.category === cat.id).length;
              return (
                <Card
                  key={cat.id}
                  className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {count} services
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-ph-green flex items-center gap-1">
                    View services <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Services list */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">
              {activeCategory === "all"
                ? "All Services"
                : serviceCategories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm text-muted-foreground">
              Showing {filteredServices.length} of {services.length}
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No services match your search</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different keyword or clear your filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                  setOnlineOnly(false);
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onStart={() => navigate("member-portal")}
                />
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}

function ServiceCard({ service, onStart }: { service: ServiceItem; onStart: () => void }) {
  const Icon = iconMap[service.icon] ?? Sparkles;
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="p-5 flex flex-col hover:shadow-md hover:border-ph-green/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex gap-1">
          {service.onlineAvailable && (
            <Badge className="bg-ph-green-light text-ph-green-darker hover:bg-ph-green-light text-[10px]">
              Online
            </Badge>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-foreground">{service.title}</h3>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed flex-1">
        {service.description}
      </p>

      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {service.processingTime}
        </span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-3 text-sm font-medium text-ph-green hover:underline flex items-center gap-1 self-start"
        aria-expanded={open}
      >
        <Info className="h-3.5 w-3.5" />
        {open ? "Hide requirements" : "View requirements"}
      </button>

      {open && (
        <div className="mt-3 rounded-lg bg-muted/50 p-3 border border-border animate-fade-in-up">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Requirements
          </div>
          <ul className="space-y-1.5">
            {service.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-xs text-foreground/80">
                <CheckCircle2 className="h-3.5 w-3.5 text-ph-green flex-shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        onClick={onStart}
        className="mt-4 w-full bg-ph-green hover:bg-ph-green-dark text-white"
        disabled={!service.onlineAvailable}
      >
        {service.onlineAvailable ? "Start service" : "Visit branch"}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
}
