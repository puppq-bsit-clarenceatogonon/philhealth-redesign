"use client";

import * as React from "react";
import {
  BadgeCheck,
  Wallet,
  FileSearch,
  ShieldCheck,
  Download,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Info,
  X,
  HeartPulse,
  Calendar,
  Users,
  Mail,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  Eye,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { useNavigation } from "@/store/navigation-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  mockMember,
  contributionHistory,
  claimsHistory,
  memberNotifications,
} from "@/lib/philhealth-data";
import { StatusBadge } from "../blocks/PageHeader";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "membership", label: "Membership", icon: BadgeCheck },
  { id: "contributions", label: "Contributions", icon: Wallet },
  { id: "claims", label: "Claims", icon: FileSearch },
  { id: "benefits", label: "Benefits", icon: ShieldCheck },
  { id: "records", label: "Download Records", icon: Download },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export function MemberPortalPage() {
  const { navigate, setAuthenticated, isAuthenticated } = useNavigation();
  const [activeTab, setActiveTab] = React.useState("overview");
  const [showNotifPanel, setShowNotifPanel] = React.useState(false);
  const [selectedClaim, setSelectedClaim] = React.useState<typeof claimsHistory[number] | null>(null);

  // Auto-redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      // For demo, allow direct access — pretend user is logged in
      setAuthenticated(true);
    }
  }, [isAuthenticated, setAuthenticated]);

  const unreadCount = memberNotifications.filter((n) => n.unread).length;

  return (
    <div className="bg-muted/20">
      {/* Member portal top bar */}
      <div className="gradient-ph-brand text-white">
        <div className="container-ph-wide py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white font-semibold">
                  {mockMember.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-bold">{mockMember.name}</h1>
                  <StatusBadge status="active">Active Member</StatusBadge>
                </div>
                <div className="text-sm text-white/80 mt-0.5">
                  PhilHealth ID: <span className="font-mono">{mockMember.philhealthId}</span> ·{" "}
                  {mockMember.membershipType}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotifPanel(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={`Notifications, ${unreadCount} unread`}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <Button
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={() => navigate("help-center")}
              >
                <Info className="h-4 w-4 mr-2" />
                Help
              </Button>
              <Button
                variant="secondary"
                className="bg-white text-ph-green-darker hover:bg-white/90"
                onClick={() => {
                  setAuthenticated(false);
                  navigate("home");
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with sidebar */}
      <div className="container-ph-wide py-6 grid lg:grid-cols-12 gap-6">
        {/* Sidebar nav */}
        <aside className="lg:col-span-3">
          <Card className="p-2 sticky top-20">
            <nav className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeTab === item.id
                        ? "bg-ph-green text-white"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="mt-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("contact")}
                className="w-full justify-start text-muted-foreground"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </Card>
        </aside>

        {/* Main panel */}
        <div className="lg:col-span-9">
          {activeTab === "overview" && (
            <OverviewPanel onClaimClick={setSelectedClaim} onNavigate={setActiveTab} />
          )}
          {activeTab === "membership" && <MembershipPanel />}
          {activeTab === "contributions" && <ContributionsPanel />}
          {activeTab === "claims" && (
            <ClaimsPanel onClaimClick={setSelectedClaim} />
          )}
          {activeTab === "benefits" && (
            <BenefitsPanel onViewAll={() => navigate("benefits")} />
          )}
          {activeTab === "records" && <RecordsPanel />}
          {activeTab === "profile" && <ProfilePanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>

      {/* Notification panel dialog */}
      <Dialog open={showNotifPanel} onOpenChange={setShowNotifPanel}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              You have {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {memberNotifications.map((n) => {
              const Icon =
                n.type === "success"
                  ? CheckCircle2
                  : n.type === "warning"
                  ? AlertCircle
                  : Info;
              return (
                <Card key={n.id} className={cn("p-3", n.unread && "border-ph-green/30 bg-ph-green-light/30")}>
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0",
                        n.type === "success" && "bg-emerald-50 text-emerald-700",
                        n.type === "warning" && "bg-amber-50 text-amber-700",
                        n.type === "info" && "bg-blue-50 text-blue-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-foreground">{n.title}</div>
                        {n.unread && (
                          <span className="h-2 w-2 rounded-full bg-ph-green flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                      <div className="text-[10px] text-muted-foreground mt-1">{n.date}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Claim detail dialog */}
      <Dialog open={!!selectedClaim} onOpenChange={(o) => !o && setSelectedClaim(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 flex-wrap">
              Claim Status: {selectedClaim?.id}
              {selectedClaim && (
                <StatusBadge
                  status={
                    selectedClaim.status === "Paid" ? "success" : selectedClaim.status === "Processing" ? "pending" : "neutral"
                  }
                >
                  {selectedClaim.status}
                </StatusBadge>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedClaim?.type} — filed {selectedClaim?.filedDate}
            </DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Facility</div>
                  <div className="text-sm font-semibold mt-0.5">{selectedClaim.facility}</div>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Amount</div>
                  <div className="text-sm font-semibold mt-0.5 text-ph-green-darker">{selectedClaim.amount}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Progress
                  </h4>
                  <span className="text-xs font-semibold text-ph-green-darker">
                    {selectedClaim.progress}% complete
                  </span>
                </div>
                <Progress value={selectedClaim.progress} className="h-2" />
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Timeline
                </h4>
                <ol className="relative border-l-2 border-muted ml-2 space-y-4">
                  {selectedClaim.stages.map((stage) => (
                    <li key={stage.label} className="ml-4 relative">
                      <div
                        className={cn(
                          "absolute -left-[1.35rem] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2",
                          stage.done
                            ? "bg-ph-green border-ph-green"
                            : "bg-white border-muted"
                        )}
                      >
                        {stage.done && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className={cn("text-sm font-medium", stage.done ? "text-foreground" : "text-muted-foreground")}>
                          {stage.label}
                        </div>
                        <div className="text-xs text-muted-foreground">{stage.date}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg bg-ph-green-light/50 border border-ph-green/20 p-4 text-sm text-ph-green-darker">
                <strong>Estimated completion:</strong>{" "}
                {selectedClaim.status === "Paid"
                  ? "Completed"
                  : "3–5 business days from current stage"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OverviewPanel({
  onClaimClick,
  onNavigate,
}: {
  onClaimClick: (claim: typeof claimsHistory[number]) => void;
  onNavigate: (tab: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Membership",
            value: "Active",
            sub: `Since ${mockMember.statusSince}`,
            icon: BadgeCheck,
            color: "bg-ph-green-light text-ph-green-darker",
            onClick: () => onNavigate("membership"),
          },
          {
            label: "This year contributions",
            value: mockMember.thisYearContributions.toString(),
            sub: "of 12 months",
            icon: Wallet,
            color: "bg-emerald-50 text-emerald-700",
            onClick: () => onNavigate("contributions"),
          },
          {
            label: "Active claims",
            value: claimsHistory.filter((c) => c.status === "Processing").length.toString(),
            sub: "in progress",
            icon: FileSearch,
            color: "bg-amber-50 text-amber-700",
            onClick: () => onNavigate("claims"),
          },
          {
            label: "Total dependents",
            value: mockMember.dependents.length.toString(),
            sub: "all active",
            icon: Users,
            color: "bg-blue-50 text-blue-700",
            onClick: () => onNavigate("membership"),
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={stat.onClick}
              className="text-left rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-ph-green/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mt-3">{stat.value}</div>
              <div className="text-xs font-medium text-foreground">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground">{stat.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Active claims preview */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Recent Claims</h2>
            <p className="text-sm text-muted-foreground">Track your filed claims in real time</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate("claims")}>
            View all
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
        <div className="space-y-2">
          {claimsHistory.slice(0, 3).map((claim) => (
            <button
              key={claim.id}
              onClick={() => onClaimClick(claim)}
              className="w-full text-left rounded-lg border border-border p-3 hover:border-ph-green/30 hover:bg-muted/40 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-foreground">{claim.type}</span>
                    <StatusBadge
                      status={
                        claim.status === "Paid" ? "success" : claim.status === "Processing" ? "pending" : "neutral"
                      }
                    >
                      {claim.status}
                    </StatusBadge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {claim.id} · {claim.facility} · Filed {claim.filedDate}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-foreground">{claim.amount}</div>
                  <div className="text-[10px] text-muted-foreground">{claim.progress}% complete</div>
                </div>
              </div>
              <Progress value={claim.progress} className="h-1 mt-2" />
            </button>
          ))}
        </div>
      </Card>

      {/* Quick actions */}
      <Card className="p-5">
        <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Pay Premium", icon: CreditCard, action: () => onNavigate("contributions") },
            { label: "File New Claim", icon: FileText, action: () => onNavigate("claims") },
            { label: "Download CF1", icon: Download, action: () => onNavigate("records") },
            { label: "View Benefits", icon: ShieldCheck, action: () => onNavigate("benefits") },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.action}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-ph-green/30 hover:bg-muted/40 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function MembershipPanel() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Membership Details</h2>
            <p className="text-sm text-muted-foreground">Your PhilHealth membership information</p>
          </div>
          <StatusBadge status="active">Active</StatusBadge>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <DetailItem label="Full Name" value={mockMember.name} icon={User} />
          <DetailItem label="PhilHealth ID" value={mockMember.philhealthId} icon={BadgeCheck} />
          <DetailItem label="Membership Type" value={mockMember.membershipType} icon={ShieldCheck} />
          <DetailItem label="Member Since" value={mockMember.statusSince} icon={Calendar} />
          <DetailItem label="Employer" value={mockMember.employer} icon={HeartPulse} />
          <DetailItem label="Premium Rate" value={mockMember.premiumRate} icon={Wallet} />
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-bold mb-1">Dependents</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Dependents are automatically covered under your membership.
        </p>
        <div className="space-y-2">
          {mockMember.dependents.map((dep) => (
            <div
              key={dep.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-ph-green-light text-ph-green-darker text-xs">
                    {dep.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{dep.name}</div>
                  <div className="text-xs text-muted-foreground">{dep.relation}</div>
                </div>
              </div>
              <StatusBadge status="active">{dep.status}</StatusBadge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ContributionsPanel() {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Total contributions</div>
          <div className="text-2xl font-bold mt-1">{mockMember.totalContributions}</div>
          <div className="text-xs text-muted-foreground">months since registration</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">This year (2025)</div>
          <div className="text-2xl font-bold mt-1 text-ph-green-darker">
            {mockMember.thisYearContributions}
          </div>
          <div className="text-xs text-muted-foreground">of 12 months</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Latest payment</div>
          <div className="text-2xl font-bold mt-1">₱425.00</div>
          <div className="text-xs text-muted-foreground">May 2025 · paid by employer</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Contribution History</h2>
            <p className="text-sm text-muted-foreground">All premiums remitted on your behalf</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-3 px-5 font-medium text-muted-foreground">Period</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Employer</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date Paid</th>
                <th className="text-left p-3 px-5 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {contributionHistory.map((c) => (
                <tr key={c.period} className="border-b border-border/60 hover:bg-muted/20">
                  <td className="p-3 px-5 font-medium">{c.period}</td>
                  <td className="p-3 text-muted-foreground">{c.employer}</td>
                  <td className="p-3 text-right font-semibold text-ph-green-darker">
                    ₱{c.amount.toFixed(2)}
                  </td>
                  <td className="p-3 text-muted-foreground">{c.date}</td>
                  <td className="p-3 px-5">
                    <StatusBadge status="success">{c.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ClaimsPanel({ onClaimClick }: { onClaimClick: (c: typeof claimsHistory[number]) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Total claims filed</div>
          <div className="text-2xl font-bold mt-1">{claimsHistory.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">In processing</div>
          <div className="text-2xl font-bold mt-1 text-amber-600">
            {claimsHistory.filter((c) => c.status === "Processing").length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Total paid (lifetime)</div>
          <div className="text-2xl font-bold mt-1 text-ph-green-darker">₱47,200</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">All Claims</h2>
            <p className="text-sm text-muted-foreground">Click any claim to view detailed timeline</p>
          </div>
          <Button className="bg-ph-green hover:bg-ph-green-dark text-white">
            <FileText className="h-4 w-4 mr-2" />
            File New Claim
          </Button>
        </div>
        <div className="space-y-2">
          {claimsHistory.map((claim) => (
            <button
              key={claim.id}
              onClick={() => onClaimClick(claim)}
              className="w-full text-left rounded-lg border border-border p-4 hover:border-ph-green/30 hover:bg-muted/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">{claim.type}</span>
                    <StatusBadge
                      status={
                        claim.status === "Paid" ? "success" : claim.status === "Processing" ? "pending" : "neutral"
                      }
                    >
                      {claim.status}
                    </StatusBadge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {claim.id} · {claim.facility} · Filed {claim.filedDate}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-foreground">{claim.amount}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {claim.progress}% complete
                  </div>
                </div>
              </div>
              <Progress value={claim.progress} className="h-1.5" />
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>
                  Stage {claim.stages.filter((s) => s.done).length} of {claim.stages.length}:{" "}
                  {claim.stages.find((s) => !s.done)?.label ?? "Completed"}
                </span>
                <span className="text-ph-green font-medium">View details →</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function BenefitsPanel({ onViewAll }: { onViewAll: () => void }) {
  const eligibleBenefits = [
    { name: "Inpatient Hospitalization", coverage: "Up to ₱47,000 per case", eligible: true },
    { name: "Outpatient Consultations (Konsulta)", coverage: "Up to ₱9,000 per year", eligible: true },
    { name: "Maternity Care Package", coverage: "Up to ₱19,000 per delivery", eligible: true },
    { name: "Hemodialysis (156 sessions/yr)", coverage: "Up to ₱624,000 per year", eligible: false, reason: "Not medically indicated" },
    { name: "Catastrophic Illness Coverage", coverage: "Up to ₱600,000 per year", eligible: true },
    { name: "Senior Citizen Lifetime Coverage", coverage: "Free, no premium", eligible: false, reason: "Age requirement not met" },
  ];

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Benefits Eligibility</h2>
            <p className="text-sm text-muted-foreground">
              Based on your membership status and contributions
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View all benefits
            <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
        <div className="space-y-2">
          {eligibleBenefits.map((b) => (
            <div
              key={b.name}
              className={cn(
                "rounded-lg border p-4",
                b.eligible ? "border-ph-green/30 bg-ph-green-light/30" : "border-border bg-muted/20"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0",
                      b.eligible ? "bg-ph-green text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {b.eligible ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{b.name}</div>
                    <div className="text-xs text-muted-foreground">{b.coverage}</div>
                    {b.reason && (
                      <div className="text-xs text-amber-600 mt-1">Not eligible: {b.reason}</div>
                    )}
                  </div>
                </div>
                {b.eligible && <StatusBadge status="active">Eligible</StatusBadge>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RecordsPanel() {
  const records = [
    { name: "Certificate of Contributions (2025)", type: "PDF", size: "185 KB" },
    { name: "Membership Status Certificate", type: "PDF", size: "124 KB" },
    { name: "Claims Summary (Lifetime)", type: "PDF", size: "242 KB" },
    { name: "Premium Payment History", type: "Excel", size: "98 KB" },
    { name: "Dependents List", type: "PDF", size: "76 KB" },
    { name: "Benefits Eligibility Letter", type: "PDF", size: "112 KB" },
  ];

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h2 className="text-lg font-bold mb-1">Downloadable Records</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Generate and download official documents for loans, visas, employment, and more.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {records.map((r) => (
            <div
              key={r.name}
              className="rounded-lg border border-border p-4 hover:border-ph-green/30 hover:bg-muted/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {r.type} · {r.size}
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-ph-green hover:bg-ph-green-dark text-white">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Generate & Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ProfilePanel() {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold mb-4">Personal Information</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <DetailItem label="Full Name" value={mockMember.name} icon={User} />
        <DetailItem label="Birthdate" value={mockMember.birthdate} icon={Calendar} />
        <DetailItem label="Sex" value={mockMember.sex} icon={User} />
        <DetailItem label="Civil Status" value={mockMember.civilStatus} icon={User} />
        <DetailItem label="Mobile Number" value={mockMember.mobile} icon={Phone} />
        <DetailItem label="Email Address" value={mockMember.email} icon={Mail} />
        <DetailItem label="Home Address" value={mockMember.address} icon={MapPin} />
        <DetailItem label="PhilHealth ID" value={mockMember.philhealthId} icon={BadgeCheck} />
      </div>
      <div className="mt-6 pt-4 border-t flex gap-2">
        <Button className="bg-ph-green hover:bg-ph-green-dark text-white">
          Update Information
        </Button>
        <Button variant="outline">Change Password</Button>
      </div>
    </Card>
  );
}

function SettingsPanel() {
  const [preferences, setPreferences] = React.useState({
    emailNotif: true,
    smsNotif: true,
    claimUpdates: true,
    contributionReminders: true,
    marketingEmails: false,
  });

  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
      <div className="space-y-3">
        {[
          { key: "emailNotif", label: "Email notifications", desc: "Receive important updates via email" },
          { key: "smsNotif", label: "SMS notifications", desc: "Receive critical alerts via SMS" },
          { key: "claimUpdates", label: "Claim status updates", desc: "Real-time notifications when your claim moves stages" },
          { key: "contributionReminders", label: "Contribution reminders", desc: "Get reminded when premium is due" },
          { key: "marketingEmails", label: "News & advisories", desc: "Latest PhilHealth news and program updates" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
          >
            <div>
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <button
              onClick={() => setPreferences({ ...preferences, [item.key]: !preferences[item.key as keyof typeof preferences] })}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                preferences[item.key as keyof typeof preferences]
                  ? "bg-ph-green"
                  : "bg-muted-foreground/30"
              )}
              role="switch"
              aria-checked={preferences[item.key as keyof typeof preferences]}
              aria-label={item.label}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                  preferences[item.key as keyof typeof preferences] && "translate-x-5"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </div>
      <div className="text-sm font-medium text-foreground mt-1.5">{value}</div>
    </div>
  );
}
