"use client";

import * as React from "react";
import { Search, ChevronDown, MessageCircle, Phone, ArrowRight, HelpCircle } from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { PageHeader, Section, Card } from "../blocks/PageHeader";
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
import { faqs, faqCategories } from "@/lib/philhealth-data";
import { cn } from "@/lib/utils";

export function FaqPage() {
  const { navigate, setChatOpen } = useNavigation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredFaqs = faqs.filter((f) => {
    if (activeCategory !== "all" && f.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Home" }, { label: "FAQ" }]}
        eyebrow="Frequently Asked Questions"
        title="Quick answers, always available"
        description="Browse our most-asked questions, organized by topic. Can't find what you're looking for? Chat with Phil or call our hotline."
      />

      <Section className="!py-8">
        <div className="max-w-3xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs by keyword..."
              className="pl-12 h-12 text-base"
              aria-label="Search FAQs"
            />
          </div>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-thin mb-6 pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                activeCategory === "all" ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
              )}
            >
              All ({faqs.length})
            </button>
            {faqCategories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                    activeCategory === cat ? "bg-ph-green text-white" : "bg-muted hover:bg-ph-green-light"
                  )}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* FAQs */}
          <Card className="p-2">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">No FAQs match your search</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try a different keyword or chat with our assistant.
                </p>
                <Button
                  onClick={() => setChatOpen(true)}
                  className="mt-4 bg-ph-green hover:bg-ph-green-dark text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Phil
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible>
                {filteredFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left text-base font-medium hover:no-underline">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="text-[10px] mt-1 flex-shrink-0">
                          {faq.category}
                        </Badge>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Card>

          {/* Still need help */}
          <Card className="mt-6 p-6 gradient-ph-soft border-ph-green/20">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-ph-brand text-white flex-shrink-0">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-bold text-foreground">Didn't find your answer?</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Our support team is available 24/7 to help with any question.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setChatOpen(true)}
                  className="bg-ph-green hover:bg-ph-green-dark text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("contact")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call hotline
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
