"use client";

import * as React from "react";
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  Banknote,
  Activity,
  Filter,
  Search,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart,
  Eye,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  transparencyDocuments,
  performanceMetrics,
  monthlyClaimsData,
  membershipDistribution,
  philHealthStats,
} from "@/lib/philhealth-data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const docTypeIcons: Record<string, React.ElementType> = {
  Budget: Banknote,
  Performance: Activity,
  Audit: CheckCircle2,
  Procurement: FileText,
  "Annual Report": BarChart3,
};

const docTypeColors: Record<string, string> = {
  Budget: "bg-amber-50 text-amber-700 border-amber-200",
  Performance: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Audit: "bg-blue-50 text-blue-700 border-blue-200",
  Procurement: "bg-violet-50 text-violet-700 border-violet-200",
  "Annual Report": "bg-rose-50 text-rose-700 border-rose-200",
};

export function TransparencyPage() {
  const { navigate } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [activeType, setActiveType] = React.useState<string>("all");

  const filteredDocs = transparencyDocuments.filter((d) => {
    if (activeType !== "all" && d.type !== activeType) return false;
    if (search) {
      return d.title.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Transparency Portal" }]}
        eyebrow="Transparency Portal"
        title="Open data, public trust"
        description="PhilHealth is committed to transparency. Explore our budget, performance, audits, and procurement data — all in one open portal."
        actions={
          <Button
            variant="outline"
            onClick={() => navigate("downloads")}
            className="bg-white"
          >
            <Download className="h-4 w-4 mr-2" />
            All downloads
          </Button>
        }
      />

      {/* KPI banner */}
      <div className="border-b border-border bg-white">
        <div className="container-ph-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: philHealthStats.benefitsPaid, label: "Benefits paid in 2024", icon: Banknote, trend: "+8.4%" },
            { value: philHealthStats.claimsProcessed, label: "Claims processed", icon: Activity, trend: "+12.1%" },
            { value: philHealthStats.members, label: "Filipinos covered", icon: Users, trend: "+3.2M" },
            { value: "87%", label: "Claims within 10 days", icon: Clock, trend: "+3.2 pts" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <span className="text-[10px] font-medium text-ph-green flex items-center">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Section className="!py-8">
        {/* Performance metrics */}
        <div className="mb-10">
          <SectionHeading
            eyebrow="Performance Scorecard"
            title="How we're doing"
            description="Key performance indicators tracked quarterly and published openly."
          />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => {
              const isImproving =
                (metric.trend === "up" && metric.unit !== "min") ||
                (metric.trend === "down" && metric.unit === "min");
              return (
                <Card key={metric.label} className="p-5">
                  <div className="text-xs font-medium text-muted-foreground">{metric.label}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      {isImproving ? (
                        <ArrowUpRight className="h-3 w-3 text-ph-green" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-amber-600" />
                      )}
                      <span className={isImproving ? "text-ph-green font-medium" : "text-amber-600 font-medium"}>
                        {metric.change}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Target: {metric.target}{metric.unit}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        isImproving ? "bg-ph-green" : "bg-amber-500"
                      )}
                      style={{
                        width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                      }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Public dashboards */}
        <div className="mb-10">
          <SectionHeading
            eyebrow="Public Dashboards"
            title="Real-time data dashboards"
            description="Live, interactive dashboards showing PhilHealth operations and impact."
          />
          <div className="mt-6 grid lg:grid-cols-2 gap-5">
            {/* Claims volume chart */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Claims & Payments Volume</h3>
                  <p className="text-xs text-muted-foreground">Monthly, in millions of claims</p>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-ph-green mr-1.5" />
                  Live
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyClaimsData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="claims" name="Claims filed" fill="#009966" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Claims paid" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Membership distribution */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Membership Distribution</h3>
                  <p className="text-xs text-muted-foreground">By member type (2024)</p>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  111.4M total
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={membershipDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                  >
                    {membershipDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </RePieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {membershipDistribution.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
                    <span className="text-muted-foreground truncate">{m.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Documents */}
        <div>
          <SectionHeading
            eyebrow="Public Documents"
            title="Downloadable records"
            description="Annual reports, budgets, audit findings, and procurement plans."
          />

          {/* Search & filter */}
          <Card className="p-4 mt-6 mb-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search documents..."
                  className="pl-9 h-11"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-thin mt-3 pt-3 border-t">
              <button
                onClick={() => setActiveType("all")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                  activeType === "all" ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
                )}
              >
                All types
              </button>
              {Object.keys(docTypeIcons).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
                    activeType === type ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => {
              const Icon = docTypeIcons[doc.type] ?? FileText;
              return (
                <Card key={doc.id} className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border", docTypeColors[doc.type])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {doc.year}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{doc.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {doc.publishedOn}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {doc.fileType}
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                      <Eye className="h-3 w-3 mr-1.5" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1 h-8 text-xs bg-ph-green hover:bg-ph-green-dark text-white">
                      <Download className="h-3 w-3 mr-1.5" />
                      Download
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredDocs.length === 0 && (
            <Card className="p-12 text-center mt-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No documents found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try a different search term.</p>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}
