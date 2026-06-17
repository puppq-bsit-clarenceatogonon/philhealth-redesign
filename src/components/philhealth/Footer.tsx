"use client";

import {
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigation, type PageKey } from "@/store/navigation-store";

const footerNav: {
  title: string;
  links: { label: string; page: PageKey }[];
}[] = [
  {
    title: "About",
    links: [
      { label: "About PhilHealth", page: "about" },
      { label: "News & Advisories", page: "news" },
      { label: "Transparency Portal", page: "transparency" },
      { label: "Branch Locator", page: "branch-locator" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All Services", page: "services" },
      { label: "Member Registration", page: "services" },
      { label: "Premium Payments", page: "services" },
      { label: "File a Claim", page: "services" },
    ],
  },
  {
    title: "Benefits",
    links: [
      { label: "All Benefits", page: "benefits" },
      { label: "Inpatient Care", page: "benefits" },
      { label: "Outpatient Care", page: "benefits" },
      { label: "Maternal Care", page: "benefits" },
    ],
  },
  {
    title: "Portals",
    links: [
      { label: "Member Portal", page: "member-portal" },
      { label: "Employer Portal", page: "employer-portal" },
      { label: "Provider Portal", page: "provider-portal" },
      { label: "Online Services Dashboard", page: "dashboard" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Center", page: "help-center" },
      { label: "FAQ", page: "faq" },
      { label: "Contact Us", page: "contact" },
      { label: "Chat Support", page: "chat-support" },
    ],
  },
];

export function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300" role="contentinfo">
      {/* Top CTA */}
      <div className="border-b border-white/10">
        <div className="container-ph-wide py-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Need help with your PhilHealth account?
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Our 24/7 contact center and chatbot are here to help — every day of the year.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-ph-green hover:bg-ph-emerald px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call the Hotline
            </button>
            <button
              onClick={() => navigate("chat-support")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              Chat with Support
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-ph-wide py-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-3 mb-4 group"
            aria-label="PhilHealth home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-ph-brand text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="text-left leading-tight">
              <div className="font-semibold text-base text-white">PhilHealth</div>
              <div className="text-[10px] text-slate-400 -mt-0.5">Universal Health Care</div>
            </div>
          </button>
          <p className="text-sm text-slate-400 leading-relaxed">
            The Philippine Health Insurance Corporation — implementing universal health coverage
            for every Filipino since 1995.
          </p>
          <div className="flex items-center gap-2 mt-5">
            {[Facebook, Twitter, Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={`PhilHealth on social platform ${i + 1}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-ph-green text-slate-300 hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-sm text-slate-400 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5 text-slate-400">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-ph-emerald" />
              <span>
                Citystate Centre, 709 Shaw Boulevard,
                <br />
                Pasig City 1603, Metro Manila
              </span>
            </li>
            <li>
              <a
                href="tel:84417442"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-ph-emerald" />
                (02) 8441-7442
              </a>
            </li>
            <li>
              <a
                href="mailto:actioncenter@philhealth.gov.ph"
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-ph-emerald" />
                actioncenter@philhealth.gov.ph
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust & bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-ph-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2025 Philippine Health Insurance Corporation. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility Statement</a>
            <a href="#" className="hover:text-white transition-colors">Data Privacy</a>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-ph-emerald" />
            <span>WCAG 2.1 AA Compliant · ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
