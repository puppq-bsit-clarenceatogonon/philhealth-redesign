"use client";

import {
  HeartPulse,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Award,
  Globe,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Building2,
  History,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { philHealthStats } from "@/lib/philhealth-data";

export function AboutPage() {
  const { navigate } = useNavigation();

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "About PhilHealth" }]}
        eyebrow="About Us"
        title="Universal Health Care for every Filipino"
        description="The Philippine Health Insurance Corporation — implementing the National Health Insurance Program since 1995, now serving 111 million Filipinos."
        actions={
          <Button
            onClick={() => navigate("transparency")}
            className="bg-ph-green hover:bg-ph-green-dark text-white"
          >
            View Transparency Portal
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        }
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading
              eyebrow="Our Mandate"
              title="Health insurance for all Filipinos"
              description="PhilHealth is a government-owned and controlled corporation (GOCC) attached to the Department of Health, mandated to administer the National Health Insurance Program."
            />
            <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Created under Republic Act 7875 (National Health Insurance Act of 1995) and strengthened by
                Republic Act 11223 (Universal Health Care Act of 2019), PhilHealth ensures that all Filipino
                citizens — regardless of income, age, or employment status — have access to essential health
                services without financial hardship.
              </p>
              <p>
                Today, every Filipino is automatically enrolled in the National Health Insurance Program.
                Our mandate is to provide financial risk protection against the cost of illness, ensure
                equitable access to quality health care, and improve the overall health outcomes of the
                nation.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Target, title: "Mission", body: "To ensure sustainable, affordable, and progressive social health insurance for all Filipinos." },
              { icon: Eye, title: "Vision", body: "A globally competitive social health insurance program providing accessible, available, affordable, and acceptable health care for every Filipino." },
              { icon: ShieldCheck, title: "Values", body: "Integrity, Excellence, Patriotism, Service Mindedness, and Social Responsibility." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-muted/30 border-y border-border !py-12">
        <SectionHeading
          align="center"
          eyebrow="By the Numbers"
          title="Our impact, in 2024"
          description="Three decades of service to the Filipino people — measured in lives covered, claims processed, and benefits paid."
        />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: philHealthStats.members, label: "Filipinos covered", icon: Users, color: "bg-ph-green-light text-ph-green-darker" },
            { value: philHealthStats.accreditedFacilities, label: "Accredited facilities", icon: Building2, color: "bg-emerald-50 text-emerald-700" },
            { value: philHealthStats.claimsProcessed, label: "Claims processed", icon: TrendingUp, color: "bg-amber-50 text-amber-700" },
            { value: philHealthStats.benefitsPaid, label: "Benefits paid", icon: Award, color: "bg-blue-50 text-blue-700" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5 text-center">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mt-3 text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* History timeline */}
      <Section>
        <SectionHeading
          eyebrow="Our Journey"
          title="Milestones in Filipino health care"
          description="From the birth of social health insurance to universal coverage."
        />
        <div className="mt-8 space-y-4">
          {[
            { year: "1995", title: "PhilHealth Created", desc: "RA 7875 establishes the National Health Insurance Program and creates PhilHealth." },
            { year: "2013", title: "Sin Tax Reform", desc: "Sin tax revenues earmarked for universal health care expansion, funding indigent coverage." },
            { year: "2019", title: "Universal Health Care Act", desc: "RA 11223 declares all Filipinos as automatic members and shifts to primary care networks." },
            { year: "2024", title: "Expanded Dialysis Coverage", desc: "Hemodialysis sessions increased from 144 to 156 per year, serving 100,000+ ESRD patients." },
            { year: "2025", title: "Digital Transformation", desc: "New online portal launches, cutting claims processing time by 47%." },
          ].map((m, i) => (
            <div key={m.year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ph-green text-white text-xs font-bold flex-shrink-0">
                  {m.year}
                </div>
                {i < 4 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>
              <Card className="p-4 mb-4 flex-1">
                <h3 className="font-semibold text-foreground">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="!pt-0">
        <Card className="p-8 gradient-ph-brand text-white text-center max-w-3xl mx-auto">
          <History className="h-10 w-10 mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold">Three decades of service — and counting</h2>
          <p className="mt-2 text-white/85">
            From 1995 to today, we've served over 111 million Filipinos. The next chapter is digital,
            accessible, and centered on you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => navigate("member-portal")}
              variant="secondary"
              className="bg-white text-ph-green-darker hover:bg-white/90"
            >
              Open Member Portal
            </Button>
            <Button
              onClick={() => navigate("transparency")}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              Explore our performance
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
