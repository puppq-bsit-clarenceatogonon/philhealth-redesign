"use client";

import * as React from "react";
import {
  Building2,
  Upload,
  FileText,
  Users,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Download,
  ArrowRight,
  Calendar,
  Bell,
  LogIn,
} from "lucide-react";
import { useNavigation } from "@/store/navigation-store";
import { PageHeader, Section, Card, StatusBadge } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const employerStats = [
  { label: "Total Employees", value: "1,247", change: "+12 this month", trend: "up" as const },
  { label: "May 2025 Remittance", value: "₱529,875", change: "Submitted on May 09", trend: "up" as const },
  { label: "Pending RF-1", value: "0", change: "All caught up", trend: "up" as const },
  { label: "Compliance Rate", value: "100%", change: "Fully compliant", trend: "up" as const },
];

const recentRemittances = [
  { month: "May 2025", employees: 1247, amount: "₱529,875", status: "Paid", date: "May 09, 2025" },
  { month: "April 2025", employees: 1235, amount: "₱524,875", status: "Paid", date: "Apr 09, 2025" },
  { month: "March 2025", employees: 1228, amount: "₱521,900", status: "Paid", date: "Mar 10, 2025" },
  { month: "February 2025", employees: 1219, amount: "₱518,075", status: "Paid", date: "Feb 10, 2025" },
];

const quickActions = [
  { title: "Submit Monthly RF-1", desc: "Upload your Electronic Remittance Report and pay premiums", icon: Upload, color: "bg-ph-green-light text-ph-green-darker" },
  { title: "Add New Employee", desc: "Register a new hire under your company", icon: Users, color: "bg-emerald-50 text-emerald-700" },
  { title: "Download Reports", desc: "Generate remittance certificates and compliance reports", icon: Download, color: "bg-amber-50 text-amber-700" },
  { title: "Update Employer Info", desc: "Change company details, signatories, or contact", icon: Building2, color: "bg-blue-50 text-blue-700" },
];

export function EmployerPortalPage() {
  const { navigate } = useNavigation();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Employer Portal" }]}
        eyebrow="Employer Portal"
        title="Manage your workforce, simplified"
        description="Submit RF-1 remittances, manage employee records, and stay compliant with PhilHealth regulations — all in one secure portal."
        actions={
          <>
            <Button variant="outline" onClick={() => navigate("downloads")} className="bg-white">
              <FileText className="h-4 w-4 mr-2" />
              RF-1 Template
            </Button>
            <Button className="bg-ph-green hover:bg-ph-green-dark text-white">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </>
        }
      />

      <Section className="!py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {employerStats.map((stat) => (
            <Card key={stat.label} className="p-5">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-bold text-foreground mt-2">{stat.value}</div>
              <div className="text-xs text-ph-green-darker mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {stat.change}
              </div>
            </Card>
          ))}
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

        {/* Remittance table */}
        <Card className="p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Recent Remittances</h2>
              <p className="text-sm text-muted-foreground">Your last 4 monthly submissions</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export all
            </Button>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-3 px-5 font-medium text-muted-foreground">Month</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Employees</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date Paid</th>
                  <th className="text-left p-3 px-5 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRemittances.map((r) => (
                  <tr key={r.month} className="border-b border-border/60 hover:bg-muted/20">
                    <td className="p-3 px-5 font-medium">{r.month}</td>
                    <td className="p-3 text-right text-muted-foreground">{r.employees.toLocaleString()}</td>
                    <td className="p-3 text-right font-semibold text-ph-green-darker">{r.amount}</td>
                    <td className="p-3 text-muted-foreground">{r.date}</td>
                    <td className="p-3 px-5">
                      <StatusBadge status="success">{r.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Remittance deadline banner */}
        <Card className="p-5 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">Upcoming Deadline: June 10, 2025</h3>
              <p className="text-sm text-amber-800 mt-1">
                Your May 2025 remittance is due on or before June 10. Late submissions incur a 1% per month surcharge.
                Submit early to avoid penalties.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Submit RF-1 Now
                </Button>
                <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                  View deadlines
                </Button>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-amber-700 mb-1">
                  <span>Days remaining</span>
                  <span className="font-medium">22 of 30 days</span>
                </div>
                <Progress value={27} className="h-1.5 bg-amber-200" />
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
