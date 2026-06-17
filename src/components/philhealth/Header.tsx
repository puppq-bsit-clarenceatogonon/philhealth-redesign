"use client";

import * as React from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Globe,
  Accessibility,
  MessageCircle,
  User,
  LogIn,
  Building2,
  Stethoscope,
  ChevronRight,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigation, type PageKey } from "@/store/navigation-store";
import { cn } from "@/lib/utils";
import { quickServices, latestAdvisories } from "@/lib/philhealth-data";

const megaMenu: {
  label: string;
  page: PageKey;
  sections: { title: string; items: { label: string; page: PageKey; description?: string }[] }[];
}[] = [
  {
    label: "About",
    page: "about",
    sections: [
      {
        title: "About PhilHealth",
        items: [
          { label: "Our Mission & Mandate", page: "about", description: "Universal Health Care for every Filipino" },
          { label: "Leadership & Organization", page: "about" },
          { label: "Transparency Portal", page: "transparency" },
          { label: "News & Advisories", page: "news" },
        ],
      },
    ],
  },
  {
    label: "Services",
    page: "services",
    sections: [
      {
        title: "For Members",
        items: [
          { label: "Membership Verification", page: "member-portal" },
          { label: "Register as a Member", page: "services" },
          { label: "Pay Premiums", page: "services" },
          { label: "File a Claim", page: "services" },
          { label: "Track a Claim", page: "member-portal" },
        ],
      },
      {
        title: "For Employers & Providers",
        items: [
          { label: "Employer Portal", page: "employer-portal" },
          { label: "Provider Portal", page: "provider-portal" },
          { label: "Accreditation", page: "services" },
        ],
      },
    ],
  },
  {
    label: "Benefits",
    page: "benefits",
    sections: [
      {
        title: "Benefit Categories",
        items: [
          { label: "Inpatient Care", page: "benefits" },
          { label: "Outpatient Care", page: "benefits" },
          { label: "Maternal & Newborn", page: "benefits" },
          { label: "Catastrophic & Specialized", page: "benefits" },
          { label: "Senior Citizens & PWDs", page: "benefits" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    page: "downloads",
    sections: [
      {
        title: "Downloads & References",
        items: [
          { label: "Forms & Documents", page: "downloads" },
          { label: "Circulars & Issuances", page: "downloads" },
          { label: "Annual Reports", page: "downloads" },
          { label: "Benefit Schedules", page: "downloads" },
        ],
      },
    ],
  },
  {
    label: "Help",
    page: "help-center",
    sections: [
      {
        title: "Get Help",
        items: [
          { label: "Help Center", page: "help-center" },
          { label: "FAQ", page: "faq" },
          { label: "Contact Us", page: "contact" },
          { label: "Branch Locator", page: "branch-locator" },
          { label: "Chat Support", page: "chat-support" },
        ],
      },
    ],
  },
];

export function Header() {
  const { navigate, currentPage, mobileNavOpen, setMobileNavOpen, commandOpen, setCommandOpen } =
    useNavigation();
  const [openMega, setOpenMega] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut for command palette (Ctrl+K / Cmd+K)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  return (
    <>
      {/* Top utility bar — government context */}
      <div className="hidden lg:block bg-ph-green-darker text-white">
        <div className="container-ph-wide flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              An official website of the Philippine government
            </span>
            <span className="text-white/40">|</span>
            <a href="tel:84417442" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              Hotline: (02) 8441-7442
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Accessibility className="h-3.5 w-3.5" />
              Accessibility
            </button>
            <span className="text-white/40">|</span>
            <button className="hover:text-white/80 transition-colors">English</button>
            <span className="text-white/40">|</span>
            <button className="hover:text-white/80 transition-colors">Filipino</button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b transition-shadow",
          scrolled ? "shadow-sm border-border" : "border-transparent"
        )}
        role="banner"
      >
        <div className="container-ph-wide flex h-16 lg:h-18 items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3 group"
            aria-label="PhilHealth home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ph-brand text-white shadow-sm group-hover:shadow-md transition-shadow">
              <HeartPulse className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold text-base text-foreground tracking-tight">
                PhilHealth
              </div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">
                Universal Health Care
              </div>
            </div>
          </button>

          {/* Desktop nav with mega menu */}
          <nav
            className="hidden lg:flex items-center gap-0 ml-4"
            aria-label="Primary navigation"
            onMouseLeave={() => setOpenMega(null)}
          >
            {megaMenu.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMega(item.label)}
              >
                <button
                  onClick={() => navigate(item.page)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    currentPage === item.page
                      ? "text-ph-green bg-ph-green-light/60"
                      : "text-foreground/80 hover:text-ph-green hover:bg-muted/60"
                  )}
                  aria-expanded={openMega === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openMega === item.label && "rotate-180"
                    )}
                  />
                </button>
                {openMega === item.label && (
                  <div className="absolute left-0 top-full pt-2 w-[560px] z-50">
                    <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                      <div className="grid grid-cols-2 gap-0">
                        {item.sections.map((section) => (
                          <div key={section.title} className="p-4">
                            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2 px-2">
                              {section.title}
                            </div>
                            <div className="space-y-0.5">
                              {section.items.map((sub) => (
                                <button
                                  key={sub.label}
                                  onClick={() => {
                                    navigate(sub.page);
                                    setOpenMega(null);
                                  }}
                                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-muted transition-colors group/item"
                                >
                                  <div className="text-sm font-medium text-foreground group-hover/item:text-ph-green">
                                    {sub.label}
                                  </div>
                                  {sub.description && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {sub.description}
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-muted/40 px-4 py-2.5 flex items-center justify-between">
                        <button
                          onClick={() => {
                            navigate(item.page);
                            setOpenMega(null);
                          }}
                          className="text-xs font-medium text-ph-green hover:underline flex items-center gap-1"
                        >
                          View all {item.label.toLowerCase()} <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground w-56 lg:w-64 justify-start bg-muted/40 hover:bg-muted"
            aria-label="Search PhilHealth"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Search services, benefits...</span>
            <kbd className="ml-auto rounded bg-background border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </Button>

          {/* Portals dropdown */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("employer-portal")}
              className="text-foreground/80 hover:text-ph-green"
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden xl:inline">Employer</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("provider-portal")}
              className="text-foreground/80 hover:text-ph-green"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden xl:inline">Provider</span>
            </Button>
          </div>

          {/* Member Login button */}
          <Button
            onClick={() => navigate("login")}
            size="sm"
            className="bg-ph-green hover:bg-ph-green-dark text-white shadow-sm gap-1.5"
          >
            <LogIn className="h-4 w-4" />
            <span>Member Login</span>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88%] sm:w-[420px] p-0">
              <SheetHeader className="border-b px-5 py-4 text-left">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-ph-brand text-white">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base">PhilHealth</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      Universal Health Care
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100vh-88px)] scrollbar-thin">
                <div className="p-4">
                  <button
                    onClick={() => {
                      setCommandOpen(true);
                      setMobileNavOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-muted/40 text-sm text-muted-foreground hover:bg-muted"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search PhilHealth...</span>
                  </button>
                </div>
                <nav className="px-3 pb-4 space-y-1">
                  {[
                    { label: "Home", page: "home" as PageKey },
                    { label: "About PhilHealth", page: "about" as PageKey },
                    { label: "Services", page: "services" as PageKey },
                    { label: "Benefits", page: "benefits" as PageKey },
                    { label: "Downloads", page: "downloads" as PageKey },
                    { label: "Help Center", page: "help-center" as PageKey },
                    { label: "FAQ", page: "faq" as PageKey },
                    { label: "Branch Locator", page: "branch-locator" as PageKey },
                    { label: "News & Advisories", page: "news" as PageKey },
                    { label: "Transparency Portal", page: "transparency" as PageKey },
                    { label: "Contact Us", page: "contact" as PageKey },
                  ].map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigate(item.page)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                        currentPage === item.page
                          ? "bg-ph-green-light text-ph-green-darker"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </button>
                  ))}
                </nav>
                <div className="border-t bg-muted/30 px-4 py-4 space-y-2">
                  <div className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Portals
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("member-portal")}
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" /> Member Portal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("employer-portal")}
                    className="w-full justify-start"
                  >
                    <Building2 className="h-4 w-4 mr-2" /> Employer Portal
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("provider-portal")}
                    className="w-full justify-start"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" /> Provider Portal
                  </Button>
                </div>
                <div className="p-4 border-t bg-white">
                  <Button
                    onClick={() => navigate("contact")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Hotline: (02) 8441-7442
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <CommandPalette />
    </>
  );
}

function CommandPalette() {
  const { commandOpen, setCommandOpen, navigate } = useNavigation();
  const [query, setQuery] = React.useState("");

  const quickNav: { label: string; page: PageKey; icon: React.ElementType; group: string }[] = [
    { label: "Home", page: "home", icon: HeartPulse, group: "Pages" },
    { label: "About PhilHealth", page: "about", icon: Globe, group: "Pages" },
    { label: "Services", page: "services", icon: Building2, group: "Pages" },
    { label: "Benefits", page: "benefits", icon: HeartPulse, group: "Pages" },
    { label: "Downloads", page: "downloads", icon: Search, group: "Pages" },
    { label: "Member Portal", page: "member-portal", icon: User, group: "Portals" },
    { label: "Employer Portal", page: "employer-portal", icon: Building2, group: "Portals" },
    { label: "Provider Portal", page: "provider-portal", icon: Stethoscope, group: "Portals" },
    { label: "Transparency Portal", page: "transparency", icon: Globe, group: "Portals" },
    { label: "Help Center", page: "help-center", icon: MessageCircle, group: "Help" },
    { label: "FAQ", page: "faq", icon: MessageCircle, group: "Help" },
    { label: "Contact Us", page: "contact", icon: Phone, group: "Help" },
    { label: "Branch Locator", page: "branch-locator", icon: Search, group: "Help" },
  ];

  return (
    <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
      <DialogContent className="p-0 gap-0 max-w-2xl overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search PhilHealth</DialogTitle>
          <DialogDescription>
            Find services, benefits, forms, and pages across the PhilHealth platform.
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-2xl" shouldFilter={true}>
          <CommandInput
            placeholder="Search services, benefits, forms, or pages..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[460px]">
            <CommandEmpty>No results found. Try a different search term.</CommandEmpty>
            <CommandGroup heading="Quick Services">
              {quickServices
                .filter((s) =>
                  query ? s.title.toLowerCase().includes(query.toLowerCase()) : true
                )
                .slice(0, 5)
                .map((service) => (
                  <CommandItem
                    key={service.id}
                    value={`${service.title} ${service.description}`}
                    onSelect={() => {
                      navigate(service.href as PageKey);
                      setCommandOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ph-green-light text-ph-green-darker">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{service.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {service.description}
                        </div>
                      </div>
                      {service.popular && (
                        <Badge className="bg-ph-green-light text-ph-green-darker hover:bg-ph-green-light">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pages & Portals">
              {quickNav
                .filter((n) =>
                  query ? n.label.toLowerCase().includes(query.toLowerCase()) : true
                )
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.label}
                      value={`${item.label} ${item.group}`}
                      onSelect={() => {
                        navigate(item.page);
                        setCommandOpen(false);
                      }}
                    >
                      <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{item.label}</span>
                      <ChevronRight className="h-3 w-3 ml-auto opacity-50" />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Latest Advisories">
              {latestAdvisories
                .filter((a) =>
                  query ? a.title.toLowerCase().includes(query.toLowerCase()) : true
                )
                .slice(0, 3)
                .map((a) => (
                  <CommandItem
                    key={a.id}
                    value={`${a.title} advisory`}
                    onSelect={() => {
                      navigate("news");
                      setCommandOpen(false);
                    }}
                  >
                    <div className="flex flex-col w-full">
                      <div className="text-sm font-medium">{a.title}</div>
                      <div className="text-xs text-muted-foreground">{a.date} — {a.category}</div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
