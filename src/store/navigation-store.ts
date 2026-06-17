import { create } from "zustand";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "benefits"
  | "downloads"
  | "login"
  | "member-portal"
  | "employer-portal"
  | "provider-portal"
  | "transparency"
  | "help-center"
  | "contact"
  | "faq"
  | "chat-support"
  | "branch-locator"
  | "news"
  | "dashboard";

type NavigationState = {
  currentPage: PageKey;
  previousPage: PageKey | null;
  pageHistory: PageKey[];
  navigate: (page: PageKey) => void;
  goBack: () => void;
  context: Record<string, string>;
  setContext: (key: string, value: string) => void;
  clearContext: () => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  // mobile nav open
  mobileNavOpen: boolean;
  setMobileNavOpen: (value: boolean) => void;
  // command palette (search) open
  commandOpen: boolean;
  setCommandOpen: (value: boolean) => void;
  // chatbot open
  chatOpen: boolean;
  setChatOpen: (value: boolean) => void;
};

export const useNavigation = create<NavigationState>((set, get) => ({
  currentPage: "home",
  previousPage: null,
  pageHistory: ["home"],
  navigate: (page) => {
    set((state) => ({
      previousPage: state.currentPage,
      currentPage: page,
      pageHistory: [...state.pageHistory.slice(-19), page],
      mobileNavOpen: false,
    }));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  },
  goBack: () => {
    const state = get();
    if (state.pageHistory.length > 1) {
      const newHistory = state.pageHistory.slice(0, -1);
      const prev = newHistory[newHistory.length - 1];
      set({
        currentPage: prev,
        previousPage: state.currentPage,
        pageHistory: newHistory,
      });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    }
  },
  context: {},
  setContext: (key, value) =>
    set((state) => ({ context: { ...state.context, [key]: value } })),
  clearContext: () => set({ context: {} }),
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  mobileNavOpen: false,
  setMobileNavOpen: (value) => set({ mobileNavOpen: value }),
  commandOpen: false,
  setCommandOpen: (value) => set({ commandOpen: value }),
  chatOpen: false,
  setChatOpen: (value) => set({ chatOpen: value }),
}));

export const pageTitles: Record<PageKey, string> = {
  home: "Home",
  about: "About PhilHealth",
  services: "Services",
  benefits: "Benefits",
  downloads: "Downloads",
  login: "Member Login",
  "member-portal": "Member Portal",
  "employer-portal": "Employer Portal",
  "provider-portal": "Healthcare Provider Portal",
  transparency: "Transparency Portal",
  "help-center": "Help Center",
  contact: "Contact Us",
  faq: "Frequently Asked Questions",
  "chat-support": "Chat Support",
  "branch-locator": "Branch Locator",
  news: "News & Advisories",
  dashboard: "Online Services Dashboard",
};
