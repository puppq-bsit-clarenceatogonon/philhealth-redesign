"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Navigation,
  Building2,
  Filter,
  Star,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { branches } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

export function BranchLocatorPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("all");
  const [selectedBranch, setSelectedBranch] = React.useState<string | null>(branches[0].id);

  const regions = ["all", ...Array.from(new Set(branches.map((b) => b.region)))];

  const filtered = branches.filter((b) => {
    if (selectedRegion !== "all" && b.region !== selectedRegion) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const current = branches.find((b) => b.id === selectedBranch) ?? branches[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Branch Locator" }]}
        eyebrow="Branch Locator"
        title="Find a PhilHealth branch near you"
        description="80+ branches and Local Health Insurance Offices across all 17 regions of the Philippines. Walk-in services available during business hours."
      />

      <div className="border-b border-border bg-white">
        <div className="container-ph-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "80+", label: "Branches nationwide", icon: Building2 },
            { value: "17", label: "Regions covered", icon: MapPin },
            { value: "8–5", label: "Office hours (Mon–Fri)", icon: Clock },
            { value: "24/7", label: "Hotline support", icon: Phone },
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

      <Section className="!py-8">
        {/* Search & filter */}
        <Card className="p-4 mb-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by branch name, region, or address..."
                className="pl-9 h-11"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin mt-3 pt-3 border-t">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                  selectedRegion === region ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
                )}
              >
                {region === "all" ? "All regions" : region}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Branch list */}
          <div className="lg:col-span-5 space-y-2 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
            {filtered.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={cn(
                  "w-full text-left rounded-xl border p-4 transition-all",
                  selectedBranch === branch.id
                    ? "border-ph-green bg-ph-green-light/30 shadow-sm"
                    : "border-border bg-white hover:border-ph-green/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0",
                      selectedBranch === branch.id
                        ? "bg-ph-green text-white"
                        : "bg-ph-green-light text-ph-green-darker"
                    )}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {branch.name}
                      </h3>
                      <Badge variant="outline" className="text-[10px] flex-shrink-0">
                        {branch.region}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{branch.address}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {branch.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No branches found. Try a different search.</p>
              </Card>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden sticky top-20">
              <div className="relative aspect-square lg:aspect-[4/3] bg-gradient-to-br from-ph-green-light via-emerald-50 to-sky-50">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#009966" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Branch pins */}
                {filtered.map((branch, i) => {
                  // Position deterministically based on index
                  const x = 15 + (i * 13) % 70;
                  const y = 20 + (i * 17) % 60;
                  const isCurrent = branch.id === current.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch.id)}
                      className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      aria-label={`Branch: ${branch.name}`}
                    >
                      {isCurrent && (
                        <div className="bg-ph-green text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm whitespace-nowrap mb-1">
                          {branch.region}
                        </div>
                      )}
                      <MapPin
                        className={cn(
                          "h-7 w-7 transition-all",
                          isCurrent
                            ? "text-ph-green fill-ph-green scale-125"
                            : "text-ph-green/70 fill-ph-green-light"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Selected branch details */}
              <div className="p-5 border-t border-border bg-white">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-foreground">{current.name}</h3>
                    <Badge variant="outline" className="text-[10px] mt-1">
                      {current.region}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Navigation className="h-3.5 w-3.5 mr-1.5" />
                    Directions
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{current.address}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{current.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{current.hours}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Services available
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {current.services.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
