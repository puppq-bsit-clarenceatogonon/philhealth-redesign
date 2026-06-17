"use client";

import * as React from "react";
import {
  Users,
  Building2,
  FileText,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyClaimsData, performanceMetrics } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

const digitalAdoptionData = [
  { month: "Jan", online: 38, branch: 62 },
  { month: "Feb", online: 42, branch: 58 },
  { month: "Mar", online: 47, branch: 53 },
  { month: "Apr", online: 51, branch: 49 },
  { month: "May", online: 56, branch: 44 },
  { month: "Jun", online: 64, branch: 36 },
];

const regionalData = [
  { region: "NCR", members: 14.2, claims: 2.4 },
  { region: "CALABARZON", members: 16.8, claims: 2.1 },
  { region: "Central Luzon", members: 12.4, claims: 1.6 },
  { region: "Central Visayas", members: 8.1, claims: 1.1 },
  { region: "Western Visayas", members: 7.4, claims: 0.9 },
  { region: "Davao", members: 6.8, claims: 0.8 },
  { region: "Northern Mindanao", members: 5.2, claims: 0.6 },
];

const serviceUsage = [
  { service: "Member Verification", count: "4.2M", trend: "+18%" },
  { service: "Premium Payment", count: "2.8M", trend: "+24%" },
  { service: "Claims Tracking", count: "2.1M", trend: "+31%" },
  { service: "Benefits Explorer", count: "1.9M", trend: "+15%" },
  { service: "Download Forms", count: "1.4M", trend: "+8%" },
  { service: "Branch Locator", count: "890K", trend: "+12%" },
];

export function DashboardPage() {
  const { navigate } = useNavigation();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Online Services Dashboard" }]}
        eyebrow="Public Dashboard"
        title="PhilHealth Online Services Dashboard"
        description="Real-time view of PhilHealth's digital operations: service usage, claim volumes, digital adoption, and regional performance."
        actions={
          <Badge variant="outline" className="bg-white">
            <span className="flex h-1.5 w-1.5 rounded-full bg-ph-green mr-1.5 animate-pulse" />
            Live · Updated 2 min ago
          </Badge>
        }
      />

      <Section className="!py-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active online users", value: "47,892", change: "+12.4%", trend: "up", icon: Users },
            { label: "Services used today", value: "284,102", change: "+8.1%", trend: "up", icon: Activity },
            { label: "Avg response time", value: "1.2s", change: "-0.3s", trend: "up", icon: Clock },
            { label: "System uptime (30d)", value: "99.97%", change: "Target: 99.9%", trend: "up", icon: CheckCircle2 },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {kpi.label}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="text-xs text-ph-green flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {kpi.change}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main charts */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          {/* Claims & payments */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Claims & Payments Volume</h3>
                <p className="text-xs text-muted-foreground">Monthly, in millions</p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Last 12 months
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyClaimsData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009966" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009966" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="claims"
                  name="Claims filed"
                  stroke="#009966"
                  fillOpacity={1}
                  fill="url(#colorClaims)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="paid"
                  name="Claims paid"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorPaid)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Digital adoption */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Digital vs Branch Adoption</h3>
                <p className="text-xs text-muted-foreground">Service channel mix, % of total</p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-ph-green mr-1.5" />
                Trending up
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={digitalAdoptionData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" unit="%" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="online" name="Online" stackId="a" fill="#009966" radius={[0, 0, 0, 0]} />
                <Bar dataKey="branch" name="In-branch" stackId="a" fill="#DFF6EA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Regional breakdown + Service usage */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Regional Coverage</h3>
                <p className="text-xs text-muted-foreground">Members (M) and claims (M) by region</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={regionalData} layout="vertical" margin={{ top: 5, right: 5, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 10 }} stroke="#94a3b8" width={80} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="members" name="Members (M)" fill="#009966" radius={[0, 4, 4, 0]} />
                <Bar dataKey="claims" name="Claims (M)" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Most Used Services</h3>
                <p className="text-xs text-muted-foreground">Top 6 online services (2024)</p>
              </div>
            </div>
            <div className="space-y-2">
              {serviceUsage.map((s, i) => (
                <div
                  key={s.service}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{s.service}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-foreground">{s.count}</div>
                    <div className="text-[10px] text-ph-green flex items-center justify-end gap-0.5">
                      <ArrowUpRight className="h-2.5 w-2.5" />
                      {s.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance metrics */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Performance Scorecard</h3>
              <p className="text-xs text-muted-foreground">Q1 2025 — actual vs target</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("transparency")}>
              View full report
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric) => {
              const isImproving =
                (metric.trend === "up" && metric.unit !== "min") ||
                (metric.trend === "down" && metric.unit === "min");
              return (
                <div key={metric.label} className="rounded-lg border border-border p-3">
                  <div className="text-xs font-medium text-muted-foreground">{metric.label}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-foreground">{metric.value}</span>
                    <span className="text-xs text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className={isImproving ? "text-ph-green font-medium" : "text-amber-600 font-medium"}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground">Target: {metric.target}{metric.unit}</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", isImproving ? "bg-ph-green" : "bg-amber-500")}
                      style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Section>
    </div>
  );
}
