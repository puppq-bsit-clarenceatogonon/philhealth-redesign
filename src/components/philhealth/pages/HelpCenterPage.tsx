"use client";

import * as React from "react";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Video,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Clock,
  Sparkles,
  PlayCircle,
  FileText,
  CheckCircle2,
  AlertCircle,
  Send,
  Bot,
  User,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    desc: "New to PhilHealth? Start here.",
    articles: 24,
    color: "bg-ph-green-light text-ph-green-darker",
  },
  {
    icon: FileText,
    title: "Membership & Registration",
    desc: "Register, update records, manage dependents.",
    articles: 32,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Sparkles,
    title: "Contributions & Payments",
    desc: "Pay premiums, view history, request certificates.",
    articles: 18,
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: AlertCircle,
    title: "Claims & Benefits",
    desc: "File, track, and understand your claims.",
    articles: 42,
    color: "bg-blue-50 text-blue-700",
  },
];

const videoTutorials = [
  { title: "How to register for a PhilHealth account", duration: "3:42", views: "1.2M" },
  { title: "Filing your first claim — step by step", duration: "5:18", views: "890K" },
  { title: "Understanding your benefits eligibility", duration: "4:05", views: "654K" },
  { title: "Setting up employer remittance (RF-1)", duration: "6:22", views: "423K" },
  { title: "Using the Konsulta primary care program", duration: "4:48", views: "312K" },
  { title: "Tracking your claim in real time", duration: "2:55", views: "278K" },
];

const stepByStepGuides = [
  {
    title: "Register as a new PhilHealth member",
    description: "Complete walkthrough of the registration process",
    steps: 8,
    duration: "10 min",
  },
  {
    title: "Pay your premiums online",
    description: "Pay via GCash, Maya, bank transfer, or credit card",
    steps: 5,
    duration: "5 min",
  },
  {
    title: "File a reimbursement claim",
    description: "Submit a claim for out-of-pocket medical expenses",
    steps: 7,
    duration: "8 min",
  },
  {
    title: "Update your member record",
    description: "Change name, contact info, or add a dependent",
    steps: 6,
    duration: "6 min",
  },
];

export function HelpCenterPage() {
  const { navigate, setChatOpen } = useNavigation();
  const [search, setSearch] = React.useState("");

  const filteredFaqs = faqs.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Help Center" }]}
        eyebrow="Help Center"
        title="How can we help you today?"
        description="Find answers, watch tutorials, chat with Phil our virtual assistant, or talk to a real person — whatever you need, we're here."
      />

      {/* Big search */}
      <Section className="!py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles, FAQs, guides..."
              className="pl-12 h-14 text-base shadow-sm"
              aria-label="Search help articles"
            />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-ph-green" />
            Popular:{" "}
            {["How to file a claim", "Premium rates", "Update record"].map((term) => (
              <button
                key={term}
                onClick={() => setSearch(term)}
                className="text-ph-green hover:underline"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick channels */}
      <Section className="!pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: MessageCircle,
              title: "Chat with Phil",
              desc: "AI-powered assistant, available 24/7",
              action: () => setChatOpen(true),
              color: "bg-ph-green-light text-ph-green-darker",
              cta: "Start chatting",
            },
            {
              icon: Phone,
              title: "Call the Hotline",
              desc: "(02) 8441-7442 · 24/7 nationwide",
              action: () => navigate("contact"),
              color: "bg-emerald-50 text-emerald-700",
              cta: "View contact options",
            },
            {
              icon: Mail,
              title: "Email Support",
              desc: "Response within 24 hours",
              action: () => navigate("contact"),
              color: "bg-amber-50 text-amber-700",
              cta: "Send an email",
            },
            {
              icon: HelpCircle,
              title: "Browse FAQ",
              desc: "Quick answers to common questions",
              action: () => navigate("faq"),
              color: "bg-blue-50 text-blue-700",
              cta: "View all FAQs",
            },
          ].map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.title}
                onClick={channel.action}
                className="group text-left rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-ph-green/30 hover:-translate-y-0.5 transition-all"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    channel.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{channel.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{channel.desc}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ph-green">
                  {channel.cta}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Browse by category */}
      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Browse Help"
          title="Help articles by category"
          description="Comprehensive guides organized by topic — find what you need fast."
        />
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.title} className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer">
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", cat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    {cat.articles} articles
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Video tutorials & step-by-step guides */}
      <Section className="!pt-0 bg-muted/30 border-y border-border">
        <Tabs defaultValue="videos">
          <div className="flex items-center justify-between mb-6">
            <SectionHeading
              eyebrow="Visual Learning"
              title="Watch & learn"
              description="Follow along with our video tutorials and step-by-step guides."
            />
            <TabsList className="bg-white">
              <TabsTrigger value="videos" className="data-[state=active]:bg-muted data-[state=active]:shadow-sm">
                <Video className="h-3.5 w-3.5 mr-1.5" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-muted data-[state=active]:shadow-sm">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Step-by-Step Guides
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="videos">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoTutorials.map((video) => (
                <Card key={video.title} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gradient-to-br from-ph-green to-ph-emerald flex items-center justify-center group">
                    <PlayCircle className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform" />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" />
                        {video.views} views
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid sm:grid-cols-2 gap-4">
              {stepByStepGuides.map((guide) => (
                <Card key={guide.title} className="p-5 hover:shadow-md hover:border-ph-green/30 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ph-green-light text-ph-green-darker flex-shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px]">
                          {guide.steps} steps
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {guide.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* FAQ preview */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="Quick answers to the questions we hear most often."
            />
            <Button
              onClick={() => navigate("faq")}
              className="mt-5 bg-ph-green hover:bg-ph-green-dark text-white"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="lg:col-span-8">
            <Card className="p-2">
              <Accordion type="single" collapsible>
                {faqs.slice(0, 6).map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </Section>

      {/* Still need help CTA */}
      <Section className="!pt-0">
        <Card className="p-8 gradient-ph-brand text-white text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">Still need help?</h2>
          <p className="mt-2 text-white/85">
            Our team is available 24/7 to assist you with any PhilHealth concern.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => setChatOpen(true)}
              variant="secondary"
              className="bg-white text-ph-green-darker hover:bg-white/90"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Phil
            </Button>
            <Button
              onClick={() => navigate("contact")}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
