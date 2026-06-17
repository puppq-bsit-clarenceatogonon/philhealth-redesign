"use client";

import * as React from "react";
import {
  Stethoscope,
  FileText,
  Building2,
  Users,
  Wallet,
  CheckCircle2,
  Clock,
  TrendingUp,
  Download,
  ArrowRight,
  Search,
  LogIn,
  Activity,
  Award,
} from "lucide-react";
import { useNavigation } from "@/store/navigation-store";
import { PageHeader, Section, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const providerStats = [
  { label: "Active Patients", value: "3,248", change: "+124 this week", icon: Users },
  { label: "Claims Submitted (May)", value: "847", change: "94% approval rate", icon: FileText },
  { label: "Total Paid (YTD)", value: "₱18.2M", change: "+12% vs last year", icon: Wallet },
  { label: "Avg Processing Time", value: "8.4 days", change: "Below 10-day target", icon: Clock },
];

const claimsPipeline = [
  { stage: "Submitted", count: 12, color: "bg-blue-100 text-blue-700" },
  { stage: "Initial Review", count: 8, color: "bg-amber-100 text-amber-700" },
  { stage: "Validation", count: 5, color: "bg-violet-100 text-violet-700" },
  { stage: "Approval", count: 3, color: "bg-emerald-100 text-emerald-700" },
  { stage: "Payment", count: 19, color: "bg-ph-green-light text-ph-green-darker" },
];

const recentClaims = [
  { id: "CLM-PROV-0042", patient: "Anonymous", procedure: "Hemodialysis Session", amount: "₱4,000", status: "Paid", date: "May 28, 2025" },
  { id: "CLM-PROV-0041", patient: "Anonymous", procedure: "Primary Care Consultation", amount: "₱4,200", status: "Processing", date: "May 27, 2025" },
  { id: "CLM-PROV-0040", patient: "Anonymous", procedure: "Cesarean Section", amount: "₱19,000", status: "Paid", date: "May 26, 2025" },
  { id: "CLM-PROV-0039", patient: "Anonymous", procedure: "Appendectomy", amount: "₱24,000", status: "Validation", date: "May 26, 2025" },
];

const quickActions = [
  { title: "Submit New Claim", desc: "File a claim for a recent patient encounter", icon: FileText, color: "bg-ph-green-light text-ph-green-darker" },
  { title: "Track Claims", desc: "View status of all submitted claims in real time", icon: Activity, color: "bg-emerald-50 text-emerald-700" },
  { title: "Case Rate Lookup", desc: "Search 1,200+ procedures and their coverage", icon: Search, color: "bg-amber-50 text-amber-700" },
  { title: "Accreditation", desc: "Apply for or renew facility/professional accreditation", icon: Award, color: "bg-blue-50 text-blue-700" },
];

export function ProviderPortalPage() {
  const { navigate } = useNavigation();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Provider Portal" }]}
        eyebrow="Healthcare Provider Portal"
        title="Streamlined claims & accreditation"
        description="For accredited hospitals, clinics, and healthcare professionals. Submit claims, track payments, and manage your accreditation — all in one place."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("services")} className="bg-white">
              <Stethoscope className="h-4 w-4 mr-2" />
              Apply for Accreditation
            </Button>
            <Button className="bg-ph-green hover:bg-ph-green-dark text-white">
              <LogIn className="h-4 w-4 mr-2" />
              Provider Sign In
            </Button>
          </>
        }
      />

      <Section className="!py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {providerStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-ph-green-darker mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.desc}</p>
                <div className="mt-3 text-sm font-medium text-ph-green flex items-center gap-1">
                  Start now <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Claims pipeline */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Claims Pipeline</h2>
                <p className="text-sm text-muted-foreground">Active claims by stage</p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-ph-green mr-1.5" />
                Live
              </Badge>
            </div>
            <div className="space-y-3">
              {claimsPipeline.map((stage) => {
                const max = Math.max(...claimsPipeline.map((s) => s.count));
                const pct = (stage.count / max) * 100;
                return (
                  <div key={stage.stage} className="flex items-center gap-3">
                    <div className="w-32 text-sm font-medium text-foreground flex-shrink-0">
                      {stage.stage}
                    </div>
                    <div className="flex-1 h-7 rounded-md bg-muted overflow-hidden relative">
                      <div
                        className={`h-full ${stage.color} flex items-center px-2 transition-all`}
                        style={{ width: `${Math.max(pct, 15)}%` }}
                      >
                        <span className="text-xs font-semibold">{stage.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
              Total active claims: <strong className="text-foreground">{claimsPipeline.reduce((a, s) => a + s.count, 0)}</strong>
            </div>
          </Card>

          {/* Recent claims */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">Recent Claims</h2>
                <p className="text-sm text-muted-foreground">Latest 4 submissions</p>
              </div>
              <Button variant="outline" size="sm">
                View all
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
            <div className="space-y-2">
              {recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground truncate">
                      {claim.procedure}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {claim.id} · {claim.date}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-foreground">{claim.amount}</div>
                    <StatusBadge
                      status={
                        claim.status === "Paid"
                          ? "success"
                          : claim.status === "Processing"
                          ? "pending"
                          : "neutral"
                      }
                    >
                      {claim.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Accreditation status */}
        <Card className="p-5 mt-5 bg-ph-green-light/30 border-ph-green/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ph-green text-white flex-shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-foreground">Facility Accreditation: Active</h3>
                <StatusBadge status="active">Valid until Dec 31, 2026</StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                The Medical City — Pasig (Tertiary Hospital, Level 3) · Accreditation No. PH-TC-2019-0451
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Certificate
                </Button>
                <Button size="sm" variant="outline">
                  Renew accreditation
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
