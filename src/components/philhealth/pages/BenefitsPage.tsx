"use client";

import * as React from "react";
import {
  Search,
  BedDouble,
  Stethoscope,
  HeartPulse,
  ShieldPlus,
  Accessibility,
  Microscope,
  ArrowRight,
  CheckCircle2,
  Clock,
  Info,
  ChevronDown,
  Sparkles,
  X,
  Filter,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  benefitCategories,
  type BenefitCategory,
  type BenefitProgram,
} from "@/lib/philhealth-data";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, Icons.LucideIcon> = {
  BedDouble,
  Stethoscope,
  HeartPulse,
  ShieldPlus,
  Accessibility,
  Microscope,
};

export function BenefitsPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [compareList, setCompareList] = React.useState<string[]>([]);
  const [showCompareDialog, setShowCompareDialog] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<BenefitProgram | null>(null);

  const filteredCategories = benefitCategories.filter((cat) => {
    if (activeCategory !== "all" && cat.id !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.programs.some(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.coverage.toLowerCase().includes(q)
        )
      );
    }
    return true;
  });

  const allPrograms = benefitCategories.flatMap((c) => c.programs);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((x) => x !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    }
  };

  const comparedPrograms = allPrograms.filter((p) => compareList.includes(p.id));

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Benefits" }]}
        eyebrow="PhilHealth Benefits"
        title="Comprehensive coverage, made transparent"
        description="Every benefit, every package, every case rate — explained in plain language. Know exactly what you're covered for before you need it."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => navigate("downloads")}
              className="bg-white"
            >
              <Info className="h-4 w-4 mr-2" />
              Benefit Schedules (PDF)
            </Button>
            <Button
              onClick={() => navigate("member-portal")}
              className="bg-ph-green hover:bg-ph-green-dark text-white"
            >
              Check my eligibility
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </>
        }
      />

      {/* Quick stats */}
      <div className="border-b border-border bg-white">
        <div className="container-ph-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "6", label: "Benefit categories", icon: Sparkles },
            { value: "1,200+", label: "Covered procedures", icon: CheckCircle2 },
            { value: "₱152.8B", label: "Paid in benefits (2024)", icon: Wallet },
            { value: "100%", label: "Filipinos covered", icon: Users },
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

      {/* Search & filter */}
      <Section className="!py-8">
        <Card className="p-4 md:p-5 sticky top-16 lg:top-18 z-30 bg-white/95 backdrop-blur shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search benefits, procedures, or conditions..."
                className="pl-9 h-11"
                aria-label="Search benefits"
              />
            </div>
            {compareList.length > 0 && (
              <Button
                onClick={() => setShowCompareDialog(true)}
                className="bg-ph-green hover:bg-ph-green-dark text-white"
              >
                Compare ({compareList.length})
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
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
            {benefitCategories.map((cat) => {
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

        {/* Benefit category cards */}
        <div className="mt-8 space-y-6">
          {filteredCategories.map((cat) => (
            <BenefitCategoryBlock
              key={cat.id}
              category={cat}
              onProgramClick={setSelectedProgram}
              onCompareToggle={toggleCompare}
              compareList={compareList}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <Card className="p-12 text-center mt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No benefits match your search</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different keyword or browse all categories.
            </p>
          </Card>
        )}
      </Section>

      {/* Compare dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compare Benefits</DialogTitle>
            <DialogDescription>
              Side-by-side comparison of {comparedPrograms.length} benefit programs.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  {comparedPrograms.map((p) => (
                    <th key={p.id} className="text-left p-3 border-b text-sm font-semibold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b text-sm font-medium">Description</td>
                  {comparedPrograms.map((p) => (
                    <td key={p.id} className="p-3 border-b text-sm text-muted-foreground">
                      {p.shortDescription}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 border-b text-sm font-medium">Coverage</td>
                  {comparedPrograms.map((p) => (
                    <td key={p.id} className="p-3 border-b text-sm text-muted-foreground">
                      {p.coverage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 border-b text-sm font-medium">Eligibility</td>
                  {comparedPrograms.map((p) => (
                    <td key={p.id} className="p-3 border-b text-sm">
                      <ul className="space-y-1">
                        {p.eligibility.map((e) => (
                          <li key={e} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-ph-green mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{e}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                {comparedPrograms.some((p) => p.caseRates) && (
                  <tr>
                    <td className="p-3 border-b text-sm font-medium">Case Rates</td>
                    {comparedPrograms.map((p) => (
                      <td key={p.id} className="p-3 border-b text-sm">
                        {p.caseRates ? (
                          <ul className="space-y-1">
                            {p.caseRates.map((r) => (
                              <li key={r.procedure} className="text-muted-foreground">
                                <span className="font-medium text-foreground">{r.amount}</span>
                                <span className="block text-xs">{r.procedure}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Program detail dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={(o) => !o && setSelectedProgram(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.name}</DialogTitle>
            <DialogDescription>
              {selectedProgram?.shortDescription} · As of {selectedProgram?.asOf}
            </DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Coverage
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">{selectedProgram.coverage}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Eligibility Requirements
                </h4>
                <ul className="space-y-2">
                  {selectedProgram.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-ph-green flex-shrink-0 mt-0.5" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              {selectedProgram.caseRates && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Case Rates
                  </h4>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 font-medium">Procedure</th>
                          <th className="text-right p-3 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProgram.caseRates.map((r) => (
                          <tr key={r.procedure} className="border-t border-border">
                            <td className="p-3 text-foreground/90">{r.procedure}</td>
                            <td className="p-3 text-right font-semibold text-ph-green-darker">{r.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="rounded-lg bg-ph-green-light/50 border border-ph-green/20 p-4">
                <div className="flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-ph-green-darker flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-ph-green-darker">
                    <strong>How to avail:</strong> Visit any accredited facility or your registered
                    Konsulta provider. Present your PhilHealth ID and meet the eligibility requirements
                    above. The facility will file the claim on your behalf.
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedProgram(null);
                    navigate("member-portal");
                  }}
                  className="flex-1 bg-ph-green hover:bg-ph-green-dark text-white"
                >
                  Check my eligibility
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProgram(null);
                    navigate("branch-locator");
                  }}
                >
                  Find a facility
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BenefitCategoryBlock({
  category,
  onProgramClick,
  onCompareToggle,
  compareList,
}: {
  category: BenefitCategory;
  onProgramClick: (p: BenefitProgram) => void;
  onCompareToggle: (id: string) => void;
  compareList: string[];
}) {
  const Icon = iconMap[category.icon] ?? Sparkles;
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Card className="overflow-hidden">
      <div className="p-5 md:p-6 flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border",
            category.color
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
            <Badge variant="outline" className="text-[10px]">
              {category.programs.length} {category.programs.length === 1 ? "program" : "programs"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
          <div className="mt-2 text-xs font-medium text-ph-green-darker flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" />
            {category.coverageLabel}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", !expanded && "-rotate-90")} />
        </Button>
      </div>

      {expanded && (
        <div className="border-t border-border bg-muted/20 p-4 md:p-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {category.programs.map((program) => {
              const inCompare = compareList.includes(program.id);
              return (
                <Card key={program.id} className="p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-sm leading-tight flex-1">
                      {program.name}
                    </h3>
                    <button
                      onClick={() => onCompareToggle(program.id)}
                      disabled={!inCompare && compareList.length >= 3}
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border transition-colors flex-shrink-0",
                        inCompare
                          ? "bg-ph-green text-white border-ph-green"
                          : "bg-white text-muted-foreground border-border hover:bg-ph-green-light hover:text-ph-green-darker disabled:opacity-50"
                      )}
                    >
                      {inCompare ? "✓ Comparing" : "Compare"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {program.shortDescription}
                  </p>
                  {program.caseRates && program.caseRates.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {program.caseRates.slice(0, 2).map((r) => (
                        <span
                          key={r.procedure}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-ph-green-light text-ph-green-darker"
                        >
                          {r.procedure}: <strong>{r.amount}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onProgramClick(program)}
                      className="flex-1 h-8 text-xs"
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onCompareToggle(program.id)}
                      className="h-8 text-xs"
                      disabled={!inCompare && compareList.length >= 3}
                    >
                      {inCompare ? <X className="h-3 w-3" /> : "Add"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
