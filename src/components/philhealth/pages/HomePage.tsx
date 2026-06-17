"use client";

import * as React from "react";
import {
  Search,
  BadgeCheck,
  Wallet,
  Compass,
  FileSearch,
  UserPlus,
  Building2,
  Stethoscope,
  MapPin,
  Download,
  CreditCard,
  ShieldCheck,
  Headphones,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
  Hospital,
  Banknote,
  FileText,
  Clock,
  Star,
  Bell,
  Accessibility,
  Plane,
  HeartPulse,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  quickServices,
  latestAdvisories,
  heroStats,
  philHealthStats,
  branches,
} from "@/lib/philhealth-data";
import { SectionHeading } from "../blocks/PageHeader";
import * as Icons from "lucide-react";

const iconMap: Record<string, Icons.LucideIcon> = {
  BadgeCheck,
  Wallet,
  Compass,
  FileSearch,
  UserPlus,
  Building2,
  Stethoscope,
  MapPin,
  Download,
  CreditCard,
  ShieldCheck,
  Headphones,
  Plane,
  Users,
};

export function HomePage() {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");

  const popularServices = quickServices.filter((s) => s.popular).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Route to services page with the query as context
      navigate("services");
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden gradient-ph-hero"
        aria-label="Welcome"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ph-emerald/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ph-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container-ph-wide relative py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ph-green/20 px-3 py-1 text-xs font-medium text-ph-green-darker shadow-sm mb-5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-ph-green animate-pulse" />
                Universal Health Care Act — 100% of Filipinos covered
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.05]">
                Health care for every Filipino,{" "}
                <span className="bg-gradient-to-r from-ph-green to-ph-emerald bg-clip-text text-transparent">
                  simplified.
                </span>
              </h1>

              <p className="mt-5 text-lg text-muted-foreground text-pretty max-w-2xl">
                Verify your membership, check contributions, explore benefits, and track claims —
                all in one modern, accessible platform built to serve 111 million Filipinos.
              </p>

              {/* Search bar */}
              <form
                onSubmit={handleSearch}
                className="mt-7 relative max-w-2xl"
                role="search"
                aria-label="Search PhilHealth services"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, benefits, forms, or branches..."
                  className="w-full pl-12 pr-32 py-4 rounded-xl border border-border bg-white shadow-sm text-base outline-none focus:ring-2 focus:ring-ph-green/40 focus:border-ph-green/40 transition-all"
                  aria-label="Search PhilHealth"
                />
                <Button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-ph-green hover:bg-ph-green-dark text-white h-11 px-5"
                >
                  Search
                </Button>
              </form>

              {/* Quick action chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: "Verify Membership", page: "member-portal" as PageKey, icon: BadgeCheck },
                  { label: "Check Contributions", page: "member-portal" as PageKey, icon: Wallet },
                  { label: "Track Claims", page: "member-portal" as PageKey, icon: FileSearch },
                  { label: "Find a Branch", page: "branch-locator" as PageKey, icon: MapPin },
                ].map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.label}
                      onClick={() => navigate(chip.page)}
                      className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-3.5 py-2 text-sm font-medium text-foreground hover:border-ph-green/40 hover:bg-ph-green-light/50 transition-all shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-ph-green" />
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-ph-green" />
                  WCAG 2.1 AA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ph-green" />
                  ISO 27001 Certified
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ph-green" />
                  24/7 Online Services
                </div>
              </div>
            </div>

            {/* Right side — visual stats card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 gradient-ph-brand opacity-20 blur-2xl rounded-3xl" />
                <Card className="relative p-6 md:p-7 shadow-xl border-ph-green/20">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-ph-green-darker">
                        PhilHealth at a glance
                      </div>
                      <div className="text-sm text-muted-foreground">2024 Performance Snapshot</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ph-brand text-white">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl bg-muted/40 p-3.5 border border-border/60"
                      >
                        <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-xs font-medium text-foreground mt-1">{stat.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sublabel}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("transparency")}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-ph-green hover:bg-ph-green-dark text-white py-2.5 text-sm font-medium transition-colors"
                  >
                    View Transparency Portal
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section aria-label="Quick services" className="py-12 md:py-16">
        <div className="container-ph-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <SectionHeading
              eyebrow="Quick Services"
              title="What would you like to do today?"
              description="Most-used services, available 24/7. No queues, no paperwork — just a few clicks."
            />
            <Button
              variant="outline"
              onClick={() => navigate("services")}
              className="self-start md:self-auto"
            >
              View all services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularServices.map((service) => {
              const Icon = iconMap[service.icon] ?? Sparkles;
              return (
                <button
                  key={service.id}
                  onClick={() => navigate(service.href as PageKey)}
                  className="group text-left rounded-xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:border-ph-green/40 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ph-green/40"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker group-hover:bg-ph-green group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    {service.avgProcessingTime && (
                      <Badge variant="outline" className="text-[10px] font-normal border-border text-muted-foreground">
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        {service.avgProcessingTime}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-ph-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ph-green">
                    Open service
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Remaining quick services grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quickServices
              .filter((s) => !s.popular)
              .slice(0, 8)
              .map((service) => {
                const Icon = iconMap[service.icon] ?? Sparkles;
                return (
                  <button
                    key={service.id}
                    onClick={() => navigate(service.href as PageKey)}
                    className="flex items-center gap-3 rounded-lg border border-border bg-white p-3 hover:bg-muted/40 hover:border-ph-green/30 transition-all text-left"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-ph-green flex-shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{service.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{service.description}</div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* PORTAL ACCESS — role-based entry points */}
      <section
        aria-label="Choose your portal"
        className="py-12 md:py-16 bg-gradient-ph-soft border-y border-border"
      >
        <div className="container-ph-wide">
          <SectionHeading
            align="center"
            eyebrow="Portals"
            title="Choose your portal"
            description="Purpose-built experiences for every type of PhilHealth user."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Member Portal",
                desc: "For individual members and dependents. Check your status, contributions, claims, and benefits eligibility.",
                icon: Users,
                page: "member-portal" as PageKey,
                color: "from-ph-green to-ph-emerald",
                features: ["Membership status", "Contribution history", "Claims tracking", "Benefits eligibility"],
              },
              {
                title: "Employer Portal",
                desc: "For businesses remitting premiums. Submit RF-1, manage employee lists, and download remittance reports.",
                icon: Building2,
                page: "employer-portal" as PageKey,
                color: "from-ph-green to-ph-green-darker",
                features: ["Monthly remittance (RF-1)", "Employee records", "Compliance reports", "Bulk payments"],
              },
              {
                title: "Provider Portal",
                desc: "For accredited hospitals, clinics, and professionals. Submit and track claims, request accreditation.",
                icon: Stethoscope,
                page: "provider-portal" as PageKey,
                color: "from-ph-emerald to-ph-green",
                features: ["Claim submission", "Accreditation", "Case rates lookup", "All-case rates payment"],
              },
            ].map((portal) => {
              const Icon = portal.icon;
              return (
                <Card key={portal.title} className="p-6 hover:shadow-lg hover:border-ph-green/30 transition-all">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${portal.color} text-white shadow-sm`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{portal.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{portal.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {portal.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-ph-green flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate(portal.page)}
                    className="mt-5 w-full bg-ph-green hover:bg-ph-green-dark text-white"
                  >
                    Open {portal.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS EXPLORER PREVIEW */}
      <section aria-label="Benefits explorer" className="py-12 md:py-16">
        <div className="container-ph-wide">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Benefits Explorer"
                title="Comprehensive coverage, made simple"
                description="From routine consultations to catastrophic care — every Filipino is covered under the Universal Health Care Act."
              />
              <div className="mt-6 space-y-3">
                {[
                  { icon: Stethoscope, label: "Outpatient consultations & primary care" },
                  { icon: HeartPulse, label: "Inpatient hospitalization & surgery" },
                  { icon: ShieldCheck, label: "Catastrophic illness (dialysis, cancer)" },
                  { icon: Accessibility, label: "Free lifetime coverage for seniors & PWDs" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm text-foreground/90 pt-1.5">{item.label}</div>
                    </div>
                  );
                })}
              </div>
              <Button
                onClick={() => navigate("benefits")}
                className="mt-6 bg-ph-green hover:bg-ph-green-dark text-white"
              >
                Explore all benefits
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "₱47,000", label: "Max inpatient coverage per case", sub: "All-in case rate" },
                  { value: "156", label: "Hemodialysis sessions/year", sub: "Free at accredited clinics" },
                  { value: "₱600K", label: "Annual catastrophic coverage", sub: "Cancer, rare diseases" },
                  { value: "100%", label: "OFW & senior coverage", sub: "Zero premium, lifetime" },
                ].map((item) => (
                  <Card key={item.label} className="p-5 hover:shadow-md transition-shadow">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ph-green to-ph-emerald bg-clip-text text-transparent">
                      {item.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISORIES & NEWS */}
      <section
        aria-label="Latest advisories and news"
        className="py-12 md:py-16 bg-muted/30 border-t border-border"
      >
        <div className="container-ph-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <SectionHeading
              eyebrow="News & Advisories"
              title="Stay informed"
              description="Latest circulars, advisories, and announcements from PhilHealth."
            />
            <Button
              variant="outline"
              onClick={() => navigate("news")}
              className="self-start md:self-auto"
            >
              All news & advisories
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Featured advisory */}
            <Card
              className="lg:col-span-2 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate("news")}
            >
              <div className="grid sm:grid-cols-5">
                <div className="sm:col-span-2 gradient-ph-brand p-6 sm:p-8 text-white flex flex-col justify-between min-h-[200px]">
                  <Badge className="bg-white/20 text-white hover:bg-white/20 w-fit">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                  <div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">
                      {latestAdvisories[0].category} · {latestAdvisories[0].date}
                    </div>
                    <div className="mt-2 text-2xl font-bold leading-tight">
                      {latestAdvisories[0].title}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {latestAdvisories[0].excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-ph-green">
                    Read full advisory
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Secondary advisories */}
            <div className="space-y-3">
              {latestAdvisories.slice(1, 4).map((adv) => {
                const Icon =
                  adv.priority === "high"
                    ? AlertCircle
                    : adv.priority === "medium"
                    ? Info
                    : Bell;
                return (
                  <Card
                    key={adv.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate("news")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                          {adv.category} · {adv.date}
                        </div>
                        <div className="text-sm font-medium text-foreground line-clamp-2">
                          {adv.title}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCH LOCATOR PREVIEW */}
      <section aria-label="Find a branch" className="py-12 md:py-16">
        <div className="container-ph-wide">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <SectionHeading
                eyebrow="Branch Locator"
                title="Visit us in person"
                description="With over 80 branches and Local Health Insurance Offices nationwide, help is never far away."
              />
              <div className="mt-6 space-y-3">
                {branches.slice(0, 3).map((branch) => (
                  <Card
                    key={branch.id}
                    className="p-4 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer"
                    onClick={() => navigate("branch-locator")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker flex-shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-foreground">{branch.name}</div>
                          <Badge variant="outline" className="text-[10px]">
                            {branch.region}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-0.5">{branch.address}</div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {branch.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {branch.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button
                onClick={() => navigate("branch-locator")}
                className="mt-6 bg-ph-green hover:bg-ph-green-dark text-white"
              >
                Find the nearest branch
                <MapPin className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Map placeholder */}
            <div className="relative">
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-ph-green-light via-emerald-50 to-sky-50 flex items-center justify-center">
                  {/* Mock map */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                      <path
                        d="M 50 100 Q 100 80 150 120 T 280 100 L 380 140"
                        fill="none"
                        stroke="#009966"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 80 200 Q 200 180 320 220"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  {/* Branch pins */}
                  {[
                    { x: "20%", y: "30%", label: "NCR Central" },
                    { x: "60%", y: "45%", label: "CALABARZON" },
                    { x: "75%", y: "70%", label: "Region 7" },
                    { x: "85%", y: "85%", label: "Region 11" },
                  ].map((pin) => (
                    <div
                      key={pin.label}
                      className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-full"
                      style={{ left: pin.x, top: pin.y }}
                    >
                      <div className="bg-ph-green text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm whitespace-nowrap mb-1">
                        {pin.label}
                      </div>
                      <MapPin className="h-7 w-7 text-ph-green fill-ph-green-light" />
                    </div>
                  ))}
                </div>
                <div className="p-4 flex items-center justify-between bg-muted/30">
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">80+ branches</span>
                    <span className="text-muted-foreground"> across 17 regions</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("branch-locator")}
                  >
                    Open full map
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SUPPORT */}
      <section
        aria-label="Contact support"
        className="py-12 md:py-16 bg-gradient-ph-soft border-t border-border"
      >
        <div className="container-ph-wide">
          <SectionHeading
            align="center"
            eyebrow="We're here to help"
            title="Need assistance? We're one tap away."
            description="Multiple support channels available 24/7. Choose what works best for you."
          />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Phone,
                title: "Call the Hotline",
                value: "(02) 8441-7442",
                desc: "24/7 toll-free nationwide",
                page: "contact" as PageKey,
              },
              {
                icon: MessageCircle,
                title: "Chat with Phil",
                value: "Virtual Assistant",
                desc: "Instant answers, always online",
                page: "chat-support" as PageKey,
              },
              {
                icon: Mail,
                title: "Email Us",
                value: "actioncenter@philhealth.gov.ph",
                desc: "Response within 24 hours",
                page: "contact" as PageKey,
              },
              {
                icon: Headphones,
                title: "Help Center",
                value: "Guides & Tutorials",
                desc: "Step-by-step walkthroughs",
                page: "help-center" as PageKey,
              },
            ].map((channel) => {
              const Icon = channel.icon;
              return (
                <button
                  key={channel.title}
                  onClick={() => navigate(channel.page)}
                  className="group text-left rounded-xl border border-border bg-white p-5 hover:shadow-md hover:border-ph-green/40 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker group-hover:bg-ph-green group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{channel.title}</h3>
                  <div className="text-sm font-medium text-ph-green mt-0.5">{channel.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{channel.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
