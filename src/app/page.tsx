"use client";

import * as React from "react";
import { useNavigation } from "@/store/navigation-store";
import { Header } from "@/components/philhealth/Header";
import { Footer } from "@/components/philhealth/Footer";
import { Chatbot } from "@/components/philhealth/Chatbot";
import { HomePage } from "@/components/philhealth/pages/HomePage";
import { ServicesPage } from "@/components/philhealth/pages/ServicesPage";
import { BenefitsPage } from "@/components/philhealth/pages/BenefitsPage";
import { DownloadsPage } from "@/components/philhealth/pages/DownloadsPage";
import { LoginPage } from "@/components/philhealth/pages/LoginPage";
import { MemberPortalPage } from "@/components/philhealth/pages/MemberPortalPage";
import { HelpCenterPage } from "@/components/philhealth/pages/HelpCenterPage";
import { ContactPage } from "@/components/philhealth/pages/ContactPage";
import { TransparencyPage } from "@/components/philhealth/pages/TransparencyPage";
import { AboutPage } from "@/components/philhealth/pages/AboutPage";
import { FaqPage } from "@/components/philhealth/pages/FaqPage";
import { BranchLocatorPage } from "@/components/philhealth/pages/BranchLocatorPage";
import { NewsPage } from "@/components/philhealth/pages/NewsPage";
import { EmployerPortalPage } from "@/components/philhealth/pages/EmployerPortalPage";
import { ProviderPortalPage } from "@/components/philhealth/pages/ProviderPortalPage";
import { DashboardPage } from "@/components/philhealth/pages/DashboardPage";

export default function Home() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "benefits":
        return <BenefitsPage />;
      case "downloads":
        return <DownloadsPage />;
      case "login":
        return <LoginPage />;
      case "member-portal":
        return <MemberPortalPage />;
      case "employer-portal":
        return <EmployerPortalPage />;
      case "provider-portal":
        return <ProviderPortalPage />;
      case "transparency":
        return <TransparencyPage />;
      case "help-center":
        return <HelpCenterPage />;
      case "contact":
        return <ContactPage />;
      case "faq":
        return <FaqPage />;
      case "branch-locator":
        return <BranchLocatorPage />;
      case "news":
        return <NewsPage />;
      case "dashboard":
        return <DashboardPage />;
      case "chat-support":
        return <HelpCenterPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {renderPage()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
