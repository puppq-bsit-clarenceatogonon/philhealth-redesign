"use client";

import * as React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ChevronRight,
  Building2,
  Search,
  Globe,
  Accessibility,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, SectionHeading, Card } from "../blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { branches } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

export function ContactPage() {
  const { navigate, setChatOpen } = useNavigation();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.subject) e.subject = "Subject is required";
    if (!form.message) e.message = "Message is required";
    else if (form.message.length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", category: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "Contact Us" }]}
        eyebrow="Contact Us"
        title="We're here to help — 24/7"
        description="Multiple channels, one commitment: fast, friendly, and effective support for every Filipino."
      />

      {/* Quick contact channels */}
      <Section className="!py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Phone,
              title: "Call Center Hotline",
              value: "(02) 8441-7442",
              desc: "24/7 · Toll-free nationwide",
              action: () => navigate("contact"),
              color: "bg-ph-green-light text-ph-green-darker",
            },
            {
              icon: MessageCircle,
              title: "Live Chat",
              value: "Chat with Phil",
              desc: "Instant AI assistant",
              action: () => setChatOpen(true),
              color: "bg-emerald-50 text-emerald-700",
            },
            {
              icon: Mail,
              title: "Email Support",
              value: "actioncenter@philhealth.gov.ph",
              desc: "Response within 24 hours",
              action: () => {
                if (typeof window !== "undefined") {
                  window.location.assign("mailto:actioncenter@philhealth.gov.ph");
                }
              },
              color: "bg-amber-50 text-amber-700",
            },
            {
              icon: Building2,
              title: "Visit a Branch",
              value: "80+ branches nationwide",
              desc: "Find the nearest one",
              action: () => navigate("branch-locator"),
              color: "bg-blue-50 text-blue-700",
            },
          ].map((channel) => {
            const Icon = channel.icon;
            return (
              <button
                key={channel.title}
                onClick={channel.action}
                className="group text-left rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-ph-green/30 hover:-translate-y-0.5 transition-all"
              >
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", channel.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{channel.title}</h3>
                <div className="text-sm font-medium text-ph-green mt-0.5">{channel.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{channel.desc}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact form */}
          <div className="lg:col-span-7">
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-ph-brand text-white">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Send us a message</h2>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-ph-green/30 bg-ph-green-light/30 p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ph-green text-white mx-auto mb-3">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-ph-green-darker">Message sent successfully</h3>
                  <p className="text-sm text-ph-green-darker/80 mt-1">
                    We've received your message and will respond within 24 hours. A confirmation email is on its way.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={cn("h-11", errors.name && "border-red-300")}
                        placeholder="Juan Dela Cruz"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={cn("h-11", errors.email && "border-red-300")}
                        placeholder="juan@example.com"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="h-11"
                        placeholder="+63 917 555 1234"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => setForm({ ...form, category: v })}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">Membership</SelectItem>
                          <SelectItem value="contributions">Contributions & Payments</SelectItem>
                          <SelectItem value="claims">Claims & Benefits</SelectItem>
                          <SelectItem value="employers">Employer Concern</SelectItem>
                          <SelectItem value="providers">Provider Concern</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={cn("h-11", errors.subject && "border-red-300")}
                      placeholder="Brief subject of your message"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={cn("min-h-[120px]", errors.message && "border-red-300")}
                      placeholder="Tell us how we can help..."
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">
                    <CheckCircle2 className="h-4 w-4 text-ph-green flex-shrink-0" />
                    <span>
                      Your information is protected under the Data Privacy Act of 2012. We never share your data with third parties.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-ph-green hover:bg-ph-green-dark text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right side — office info + map */}
          <div className="lg:col-span-5 space-y-5">
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Corporate Office</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">PhilHealth Head Office</div>
                    <div className="text-muted-foreground mt-0.5">
                      Citystate Centre, 709 Shaw Boulevard,
                      <br />
                      Pasig City 1603, Metro Manila, Philippines
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Hotline</div>
                    <div className="text-muted-foreground mt-0.5">(02) 8441-7442 · 24/7</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-muted-foreground mt-0.5">actioncenter@philhealth.gov.ph</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-ph-green mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Office Hours</div>
                    <div className="text-muted-foreground mt-0.5">
                      Monday – Friday: 8:00 AM – 5:00 PM
                      <br />
                      (Call center operates 24/7)
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interactive map placeholder */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-ph-green-light via-emerald-50 to-sky-50 flex items-center justify-center">
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path
                      d="M 50 100 Q 100 80 150 120 T 280 100 L 380 140"
                      fill="none"
                      stroke="#009966"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-ph-green text-white text-xs font-medium px-2 py-0.5 rounded shadow-sm mb-1 whitespace-nowrap">
                    PhilHealth Head Office
                  </div>
                  <MapPin className="h-9 w-9 text-ph-green fill-ph-green-light" />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-3 right-3 bg-white shadow-sm"
                  onClick={() => navigate("branch-locator")}
                >
                  <Search className="h-3.5 w-3.5 mr-1.5" />
                  Full map
                </Button>
              </div>
              <div className="p-4">
                <div className="text-sm font-medium text-foreground">Other branches nearby</div>
                <div className="mt-2 space-y-1">
                  {branches.slice(0, 3).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => navigate("branch-locator")}
                      className="w-full flex items-center justify-between gap-2 text-left p-2 rounded hover:bg-muted/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-foreground truncate">{b.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{b.address}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-ph-green-light/40 border-ph-green/20">
              <div className="flex items-start gap-3">
                <Accessibility className="h-5 w-5 text-ph-green-darker flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-ph-green-darker">Accessibility Support</div>
                  <div className="text-ph-green-darker/80 mt-0.5">
                    Sign language interpretation and assistive technologies available upon request. Call our accessibility line at (02) 8441-7442 local 1144.
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
