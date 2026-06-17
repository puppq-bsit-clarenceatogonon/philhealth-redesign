"use client";

import * as React from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useNavigation } from "@/store/navigation-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "bot" | "user";
  text: string;
  chips?: { label: string; page?: string; action?: string }[];
};

const suggestedQuestions = [
  "How do I check my membership status?",
  "Where can I pay my premiums?",
  "How do I file a claim?",
  "What benefits am I eligible for?",
  "How do I update my member record?",
];

const botResponses: { trigger: string; reply: ChatMessage }[] = [
  {
    trigger: "membership",
    reply: {
      role: "bot",
      text: "You can verify your PhilHealth membership status instantly through the Member Portal. Sign in with your PhilHealth ID or register for a new account, then go to the 'Membership Status' section on your dashboard.",
      chips: [
        { label: "Go to Member Portal", page: "member-portal" },
        { label: "Register as a member", page: "services" },
      ],
    },
  },
  {
    trigger: "pay",
    reply: {
      role: "bot",
      text: "You can pay your PhilHealth premiums at any accredited bank (BPI, BDO, Metrobank, Landbank), through GCash and Maya, Bayad Center, SM Business Centers, and select 7-Eleven branches. You can also pay online via the Member Portal.",
      chips: [{ label: "Pay online via Member Portal", page: "member-portal" }],
    },
  },
  {
    trigger: "claim",
    reply: {
      role: "bot",
      text: "Most claims are filed directly by the accredited hospital or clinic. For reimbursement when paying out-of-pocket, submit Claim Form 1 (CF1), the official receipt, statement of account, and medical abstract within 60 days of discharge. Processing takes 10–15 working days.",
      chips: [
        { label: "Download Claim Form 1", page: "downloads" },
        { label: "Track a claim", page: "member-portal" },
      ],
    },
  },
  {
    trigger: "benefit",
    reply: {
      role: "bot",
      text: "PhilHealth covers inpatient care, outpatient consultations (including primary care through Konsulta), maternal and newborn care, catastrophic illnesses like dialysis and cancer, plus specialized packages for senior citizens and PWDs. Visit the Benefits page for full details and eligibility.",
      chips: [{ label: "Explore Benefits", page: "benefits" }],
    },
  },
  {
    trigger: "update",
    reply: {
      role: "bot",
      text: "To update your member record (name, civil status, contact, beneficiaries), sign in to the Member Portal and use the 'Update Record' service. You can also visit any PhilHealth branch with the PMRF form and supporting documents.",
      chips: [
        { label: "Open Member Portal", page: "member-portal" },
        { label: "Download PMRF form", page: "downloads" },
      ],
    },
  },
];

export function Chatbot() {
  const { chatOpen, setChatOpen, navigate } = useNavigation();
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I'm Phil, your PhilHealth virtual assistant. I can help you with membership, contributions, benefits, claims, and more. How can I help you today?",
      chips: suggestedQuestions.slice(0, 3).map((q) => ({ label: q })),
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      const match = botResponses.find((r) => lower.includes(r.trigger));
      const reply: ChatMessage =
        match?.reply ?? {
          role: "bot",
          text: "I'd be happy to help with that. Let me connect you to the right page, or you can browse our Help Center for detailed guides.",
          chips: [
            { label: "Open Help Center", page: "help-center" },
            { label: "Talk to a human agent", page: "contact" },
          ],
        };
      setMessages((m) => [...m, reply]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-ph-green hover:bg-ph-green-dark text-white shadow-lg px-4 py-3.5 transition-all hover:shadow-xl group"
        aria-label={chatOpen ? "Close chat support" : "Open chat support"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium hidden sm:inline">Chat with Phil</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] max-h-[70vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-ph-brand text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">Phil — Virtual Assistant</div>
                <div className="text-xs text-white/80 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-300"></span>
                  Online · Replies in seconds
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 scrollbar-thin"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2.5",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs",
                    msg.role === "user"
                      ? "bg-ph-green text-white"
                      : "bg-ph-green-light text-ph-green-darker"
                  )}
                >
                  {msg.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                <div className={cn("max-w-[78%]", msg.role === "user" && "text-right")}>
                  <div
                    className={cn(
                      "inline-block rounded-2xl px-3.5 py-2.5 text-sm",
                      msg.role === "user"
                        ? "bg-ph-green text-white rounded-tr-sm"
                        : "bg-white border border-border rounded-tl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.chips.map((chip, ci) => (
                        <button
                          key={ci}
                          onClick={() => {
                            if (chip.page) {
                              navigate(chip.page as never);
                              setChatOpen(false);
                            }
                          }}
                          className="text-xs px-2.5 py-1 rounded-full bg-ph-green-light text-ph-green-darker hover:bg-ph-green/20 border border-ph-green/20 transition-colors inline-flex items-center gap-1"
                        >
                          {chip.label}
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ph-green-light text-ph-green-darker">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-border bg-white">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                <Sparkles className="h-3 w-3" />
                Suggested questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full bg-muted hover:bg-ph-green-light hover:text-ph-green-darker transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="px-3 py-2 border-t border-border bg-white flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate("contact");
                setChatOpen(false);
              }}
              className="text-xs h-8"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate("branch-locator");
                setChatOpen(false);
              }}
              className="text-xs h-8"
            >
              <MapPin className="h-3.5 w-3.5" />
              Visit a branch
            </Button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-border bg-white flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Phil anything..."
              className="flex-1 px-3 py-2 rounded-lg bg-muted/60 text-sm outline-none focus:ring-2 focus:ring-ph-green/40"
              aria-label="Type your message"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-ph-green hover:bg-ph-green-dark text-white rounded-lg h-9 w-9"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
