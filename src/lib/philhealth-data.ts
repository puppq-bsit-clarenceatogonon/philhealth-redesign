// Central mock data for the PhilHealth redesign demo.
// Real data would come from PhilHealth APIs in production.

export const philHealthStats = {
  members: "111.4M",
  accreditedFacilities: "1,892",
  claimsProcessed: "18.3M",
  benefitsPaid: "₱152.8B",
  nhipCoverage: "100%",
};

export const heroStats = [
  { label: "Filipinos Covered", value: "111.4M", sublabel: "Universal Health Care" },
  { label: "Accredited Facilities", value: "1,892", sublabel: "Hospitals & clinics nationwide" },
  { label: "Claims Processed (2024)", value: "18.3M", sublabel: "Across all benefit packages" },
  { label: "Benefits Paid (2024)", value: "₱152.8B", sublabel: "Direct to members & providers" },
];

export type QuickService = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  href: string;
  category: "members" | "employers" | "providers" | "general";
  popular?: boolean;
  avgProcessingTime?: string;
};

export const quickServices: QuickService[] = [
  {
    id: "verify-membership",
    title: "Verify Membership",
    description: "Check if your PhilHealth membership is active and valid.",
    icon: "BadgeCheck",
    href: "member-portal",
    category: "members",
    popular: true,
    avgProcessingTime: "< 1 min",
  },
  {
    id: "premium-checker",
    title: "Premium Contribution Checker",
    description: "View your contribution history and outstanding balances.",
    icon: "Wallet",
    href: "member-portal",
    category: "members",
    popular: true,
    avgProcessingTime: "Instant",
  },
  {
    id: "benefits-explorer",
    title: "Benefits Explorer",
    description: "Discover the health benefits you are eligible for.",
    icon: "Compass",
    href: "benefits",
    category: "members",
    popular: true,
  },
  {
    id: "claims-tracking",
    title: "Claims Tracking",
    description: "Track the status of your filed claims in real time.",
    icon: "FileSearch",
    href: "member-portal",
    category: "members",
    popular: true,
    avgProcessingTime: "Live",
  },
  {
    id: "member-registration",
    title: "Member Registration",
    description: "Register as a new PhilHealth member in minutes.",
    icon: "UserPlus",
    href: "services",
    category: "members",
  },
  {
    id: "employer-remittance",
    title: "Employer Remittance",
    description: "Submit premium contributions for your employees.",
    icon: "Building2",
    href: "employer-portal",
    category: "employers",
    popular: true,
  },
  {
    id: "provider-claims",
    title: "Provider Claims Portal",
    description: "Accredited facilities can submit and track claims.",
    icon: "Stethoscope",
    href: "provider-portal",
    category: "providers",
  },
  {
    id: "branch-locator",
    title: "Branch Locator",
    description: "Find the nearest PhilHealth branch or LCU.",
    icon: "MapPin",
    href: "branch-locator",
    category: "general",
    popular: true,
  },
  {
    id: "forms-downloads",
    title: "Forms & Downloads",
    description: "Download official PhilHealth forms and documents.",
    icon: "Download",
    href: "downloads",
    category: "general",
  },
  {
    id: "id-replacement",
    title: "ID Replacement",
    description: "Request a replacement PhilHealth ID card.",
    icon: "CreditCard",
    href: "services",
    category: "members",
  },
  {
    id: "benefits-eligibility",
    title: "Benefits Eligibility Check",
    description: "Pre-check eligibility before a procedure.",
    icon: "ShieldCheck",
    href: "benefits",
    category: "members",
  },
  {
    id: "contact-center",
    title: "Contact Center",
    description: "Reach our 24/7 hotline and chat support.",
    icon: "Headphones",
    href: "contact",
    category: "general",
  },
];

export type Advisory = {
  id: string;
  title: string;
  date: string;
  category: "Advisory" | "Adoption" | "Circular" | "News" | "Press Release";
  excerpt: string;
  priority?: "high" | "medium" | "low";
};

export const latestAdvisories: Advisory[] = [
  {
    id: "adv-2025-014",
    title: "Enhanced Outpatient Benefit Package now covers specialized consultations",
    date: "June 10, 2025",
    category: "Advisory",
    excerpt:
      "Effective July 1, 2025, the Enhanced Outpatient Benefit Package (EOBP) expands to cover specialist consultations including cardiology, oncology, and endocrinology.",
    priority: "high",
  },
  {
    id: "adv-2025-013",
    title: "New online portal launches for faster claims processing",
    date: "June 04, 2025",
    category: "Press Release",
    excerpt:
      "PhilHealth today unveiled a redesigned digital platform that cuts average claims processing time by 47% and adds real-time tracking for all members.",
    priority: "high",
  },
  {
    id: "circ-2025-0027",
    title: "Circular No. 2025-0027 — Updated premium contribution schedule",
    date: "May 28, 2025",
    category: "Circular",
    excerpt:
      "In line with the Universal Health Care Act, the premium contribution rate for direct contributors is hereby updated effective January 2026.",
    priority: "medium",
  },
  {
    id: "adv-2025-012",
    title: "Typhoon Enteng relief: extended filing period for affected regions",
    date: "May 20, 2025",
    category: "Advisory",
    excerpt:
      "Members and employers in declared calamity areas may file documents and remittances without penalty until August 31, 2025.",
    priority: "medium",
  },
  {
    id: "news-2025-009",
    title: "PhilHealth signs MOA with 14 LGUs to expand primary care network",
    date: "May 12, 2025",
    category: "News",
    excerpt:
      "The Kosassel Primary Care Network expands to 14 additional local government units, bringing universal primary care to 8.4M more Filipinos.",
  },
  {
    id: "adv-2025-011",
    title: "Scheduled system maintenance — June 21, 2025",
    date: "May 09, 2025",
    category: "Advisory",
    excerpt:
      "The Member Portal will undergo scheduled maintenance on Saturday, June 21, from 2:00 AM to 6:00 AM PHT. Online services may be intermittently unavailable.",
    priority: "low",
  },
];

export type BenefitCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string; // tailwind class for accent
  coverageLabel: string;
  programs: BenefitProgram[];
};

export type BenefitProgram = {
  id: string;
  name: string;
  shortDescription: string;
  coverage: string;
  eligibility: string[];
  caseRates?: { procedure: string; amount: string }[];
  asOf: string;
};

export const benefitCategories: BenefitCategory[] = [
  {
    id: "inpatient",
    name: "Inpatient Care",
    description: "Hospital confinement benefits including room, board, and medical services.",
    icon: "BedDouble",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    coverageLabel: "Coverage up to ₱47,000 per case",
    programs: [
      {
        id: "inpatient-basic",
        name: "Inpatient Hospitalization (Case Rates)",
        shortDescription: "All-in case rate coverage for accredited hospital confinements.",
        coverage: "Room and board, drugs and medicines, professional fees, operating room, and ancillary services.",
        eligibility: [
          "Active PhilHealth membership at time of admission",
          "At least 3 months premium contributions within 6 months prior to confinement",
          "Treatment at any PhilHealth-accredited facility",
        ],
        caseRates: [
          { procedure: "Pneumonia (moderate)", amount: "₱23,000" },
          { procedure: "Dengue (without warning signs)", amount: "₱16,000" },
          { procedure: "Cesarean section", amount: "₱19,000" },
          { procedure: "Appendectomy", amount: "₱24,000" },
        ],
        asOf: "2025",
      },
      {
        id: "icu",
        name: "Intensive Care Unit (ICU) Package",
        shortDescription: "Enhanced coverage for ICU confinements and critical care.",
        coverage: "ICU room and board, mechanical ventilation, specialty drugs, and ICU professional fees.",
        eligibility: [
          "Active membership",
          "At least 6 months contributions in the past 12 months",
          "Admission to a Level 2 or 3 accredited hospital",
        ],
        caseRates: [
          { procedure: "ICU per day (Level 2)", amount: "₱4,500" },
          { procedure: "ICU per day (Level 3)", amount: "₱6,800" },
        ],
        asOf: "2025",
      },
    ],
  },
  {
    id: "outpatient",
    name: "Outpatient Care",
    description: "Consultations, diagnostics, and same-day procedures.",
    icon: "Stethoscope",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    coverageLabel: "Coverage up to ₱9,000 per year",
    programs: [
      {
        id: "pcp",
        name: "Primary Care Benefit (PCB)",
        shortDescription: "Free consultations, selected labs, and maintenance medicines for common diseases.",
        coverage: "Consultations for hypertension, diabetes, asthma, COPD, and hyperlipidemia — plus 14 essential lab tests and maintenance medications.",
        eligibility: [
          "Registered with a Konsulta provider",
          "Active membership",
          "No active PhilHealth claim for the same condition in the past 90 days",
        ],
        caseRates: [
          { procedure: "Annual consult package", amount: "₱4,200" },
          { procedure: "Lab test package (14 tests)", amount: "₱2,100" },
          { procedure: "Maintenance medicines (annual)", amount: "₱2,700" },
        ],
        asOf: "2025",
      },
      {
        id: "eobp",
        name: "Enhanced Outpatient Benefit Package (EOBP)",
        shortDescription: "Specialist consultations, ambulatory procedures, and emergency outpatient care.",
        coverage: "Specialist consultations, ambulatory surgeries, dialysis, chemotherapy, and outpatient emergency care.",
        eligibility: [
          "Active membership",
          "Referred by a Konsulta provider (except emergencies)",
          "Treatment at accredited facility",
        ],
        asOf: "2025",
      },
    ],
  },
  {
    id: "maternal",
    name: "Maternal & Newborn Care",
    description: "Comprehensive care for pregnancy, delivery, and newborn screening.",
    icon: "HeartPulse",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    coverageLabel: "Coverage up to ₱19,000 per delivery",
    programs: [
      {
        id: "mcpc",
        name: "Maternity Care Package (MCP)",
        shortDescription: "Essential health services for pregnant women — prenatal to postpartum.",
        coverage: "Prenatal care, delivery (normal or cesarean), postpartum care, and newborn care.",
        eligibility: [
          "Active membership",
          "At least 3 months premium in the last 6 months",
          "First four births (or as medically indicated)",
        ],
        caseRates: [
          { procedure: "Normal spontaneous delivery", amount: "₱8,000" },
          { procedure: "Cesarean section", amount: "₱19,000" },
          { procedure: "Newborn care package", amount: "₱1,800" },
        ],
        asOf: "2025",
      },
      {
        id: "nbs",
        name: "Newborn Screening & Hearing Test",
        shortDescription: "Expanded newborn screening and hearing tests within 24 hours of birth.",
        coverage: "Expanded NBS Panel (28+ conditions) plus newborn hearing screening.",
        eligibility: ["Newborn of an active member", "Screening done within 24–72 hours of birth"],
        caseRates: [
          { procedure: "Expanded NBS panel", amount: "₱2,250" },
          { procedure: "Newborn hearing screen", amount: "₱900" },
        ],
        asOf: "2025",
      },
    ],
  },
  {
    id: "catastrophic",
    name: "Catastrophic & Specialized",
    description: "Protection against high-cost illnesses like cancer and dialysis.",
    icon: "ShieldPlus",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    coverageLabel: "Coverage up to ₱600,000 per year",
    programs: [
      {
        id: "hd",
        name: "Hemodialysis Package (454 sessions)",
        shortDescription: "Up to 156 sessions per year (expanded in 2024) at accredited dialysis clinics.",
        coverage: "Dialysis treatment, erythropoietin, IV iron, and routine labs.",
        eligibility: [
          "Active membership",
          "At least 6 months contributions in the past 12 months",
          "Diagnosis of ESRD by accredited nephrologist",
        ],
        caseRates: [
          { procedure: "Per session (outpatient)", amount: "₱4,000" },
          { procedure: "Annual cap (156 sessions)", amount: "₱624,000" },
        ],
        asOf: "2025",
      },
      {
        id: "cancer",
        name: "Cancer Assistance Fund (Z Benefit)",
        shortDescription: "Coverage for breast, childhood, and other high-burden cancers.",
        coverage: "Surgery, chemotherapy, radiotherapy, and supportive care for eligible cancer types.",
        eligibility: [
          "Active membership",
          "At least 9 months contributions in the past 12 months",
          "Staging and treatment plan from accredited cancer center",
        ],
        caseRates: [
          { procedure: "Early-stage breast cancer", amount: "₱100,000" },
          { procedure: "Childhood cancer (ALL)", amount: "₱450,000" },
        ],
        asOf: "2025",
      },
    ],
  },
  {
    id: "senior",
    name: "Senior Citizens & PWDs",
    description: "Lifetime benefits and zero premium for qualified seniors and PWDs.",
    icon: "Accessibility",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    coverageLabel: "Lifetime coverage, zero premium",
    programs: [
      {
        id: "sc-coverage",
        name: "Senior Citizen Coverage",
        shortDescription: "Free PhilHealth coverage for all Filipinos aged 60 and above.",
        coverage: "All PhilHealth inpatient and outpatient benefits — no premium required.",
        eligibility: [
          "Filipino citizen aged 60 years and above",
          "Registered with the OSCA / PhilHealth senior registry",
        ],
        asOf: "2025",
      },
      {
        id: "pwd-coverage",
        name: "Persons with Disability (PWD) Coverage",
        shortDescription: "Sponsored coverage for registered PWDs.",
        coverage: "Full inpatient and outpatient benefit coverage.",
        eligibility: [
          "Registered PWD with valid PWD ID from LGU",
          "Listed in the DOH PWD Registry",
        ],
        asOf: "2025",
      },
    ],
  },
  {
    id: "z-benefit",
    name: "Z Benefits & Rare Diseases",
    description: "Specialized packages for rare diseases and complex treatments.",
    icon: "Microscope",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    coverageLabel: "Coverage up to ₱1.1M per case",
    programs: [
      {
        id: "z-rare",
        name: "Z Benefit for Rare Diseases",
        shortDescription: "Coverage for highly specialized treatments like SMA and Fabry disease.",
        coverage: "Diagnostic workup, enzyme replacement therapy, and ongoing monitoring.",
        eligibility: [
          "Active membership",
          "Diagnosis confirmed by accredited specialist",
          "Treatment plan approved by PhilHealth",
        ],
        caseRates: [
          { procedure: "Standard Z Benefit package", amount: "₱592,000" },
          { procedure: "Expanded rare disease (SMA)", amount: "₱1,100,000" },
        ],
        asOf: "2025",
      },
    ],
  },
];

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  onlineAvailable: boolean;
  processingTime: string;
  requirements: string[];
};

export const serviceCategories = [
  {
    id: "membership",
    name: "Membership & Registration",
    icon: "UserPlus",
    description: "Register, update records, and manage your PhilHealth membership.",
  },
  {
    id: "contributions",
    name: "Contributions & Payments",
    icon: "Wallet",
    description: "Pay premiums, request certificates, and view contribution records.",
  },
  {
    id: "claims",
    name: "Claims & Reimbursements",
    icon: "FileSearch",
    description: "File, track, and appeal claims for hospital or outpatient benefits.",
  },
  {
    id: "providers",
    name: "Accreditation (Providers)",
    icon: "Stethoscope",
    description: "Facility and professional accreditation services for healthcare providers.",
  },
  {
    id: "employers",
    name: "Employer Services",
    icon: "Building2",
    description: "Manage employee contributions, reports, and compliance.",
  },
  {
    id: "special",
    name: "Special Programs",
    icon: "Sparkles",
    description: "Senior citizens, PWDs, OFWs, indigents, and sponsored members.",
  },
];

export const services: ServiceItem[] = [
  {
    id: "register-member",
    title: "Register as a New Member",
    description: "Apply for a PhilHealth Identification Number (PIN) and membership record.",
    category: "membership",
    icon: "UserPlus",
    onlineAvailable: true,
    processingTime: "1 business day",
    requirements: ["Valid government-issued ID", "Proof of address", "1x1 ID photo"],
  },
  {
    id: "update-record",
    title: "Update Member Record",
    description: "Change name, civil status, contact details, or beneficiary information.",
    category: "membership",
    icon: "UserCog",
    onlineAvailable: true,
    processingTime: "3 business days",
    requirements: ["Valid ID", "Supporting document (marriage cert, etc.)"],
  },
  {
    id: "id-replacement-service",
    title: "Request ID Replacement",
    description: "Replace a lost, damaged, or outdated PhilHealth ID card.",
    category: "membership",
    icon: "CreditCard",
    onlineAvailable: true,
    processingTime: "5–7 business days",
    requirements: ["Valid ID", "Affidavit of loss (if lost)", "Replacement fee"],
  },
  {
    id: "premium-payment",
    title: "Pay Premium Contributions",
    description: "Pay as an individual member, self-employed, or voluntary contributor.",
    category: "contributions",
    icon: "Wallet",
    onlineAvailable: true,
    processingTime: "Instant",
    requirements: ["PhilHealth ID number", "Payment channel (GCash, bank, LCU)"],
  },
  {
    id: "contribution-cert",
    title: "Request Contribution Certificate",
    description: "Download official certificates of premium contributions for loans or visas.",
    category: "contributions",
    icon: "ScrollText",
    onlineAvailable: true,
    processingTime: "Instant",
    requirements: ["Verified Member Portal account"],
  },
  {
    id: "file-claim",
    title: "File a Claim Online",
    description: "Submit supporting documents for reimbursement or direct facility filing.",
    category: "claims",
    icon: "FileText",
    onlineAvailable: true,
    processingTime: "10–15 working days",
    requirements: ["Official receipt", "Hospital statement of account", "PhilHealth claim form 4"],
  },
  {
    id: "track-claim",
    title: "Track Claim Status",
    description: "Real-time tracking of all submitted claims with stage-by-stage updates.",
    category: "claims",
    icon: "FileSearch",
    onlineAvailable: true,
    processingTime: "Instant",
    requirements: ["Member Portal account"],
  },
  {
    id: "appeal-claim",
    title: "Appeal a Denied Claim",
    description: "Submit additional documents or request reconsideration of denied claims.",
    category: "claims",
    icon: "Scale",
    onlineAvailable: true,
    processingTime: "30 working days",
    requirements: ["Denial letter", "New supporting documents"],
  },
  {
    id: "provider-accreditation",
    title: "Facility Accreditation Application",
    description: "Apply for new or renewal accreditation for hospitals, clinics, and freestanding facilities.",
    category: "providers",
    icon: "Building2",
    onlineAvailable: true,
    processingTime: "60 working days",
    requirements: ["DOH license", "Business permits", "Staff credentials"],
  },
  {
    id: "professional-accreditation",
    title: "Professional Accreditation",
    description: "Physicians and allied health professionals can apply for PhilHealth accreditation.",
    category: "providers",
    icon: "Stethoscope",
    onlineAvailable: true,
    processingTime: "45 working days",
    requirements: ["PRC license", "Board certification", "Hospital affiliation"],
  },
  {
    id: "employer-registration",
    title: "Employer Registration",
    description: "Register your company to remit PhilHealth contributions for employees.",
    category: "employers",
    icon: "Building2",
    onlineAvailable: true,
    processingTime: "5 business days",
    requirements: ["SEC/DTI registration", "Mayor's permit", "List of employees"],
  },
  {
    id: "employer-remittance-service",
    title: "Submit Monthly Remittance",
    description: "Upload the Electronic Remittance Report (RF-1) and pay contributions.",
    category: "employers",
    icon: "Upload",
    onlineAvailable: true,
    processingTime: "Instant",
    requirements: ["Employer code", "RF-1 file", "Payment proof"],
  },
  {
    id: "ofw-registration",
    title: "OFW Member Registration",
    description: "Special enrollment for overseas Filipino workers with flexible payment terms.",
    category: "special",
    icon: "Plane",
    onlineAvailable: true,
    processingTime: "3 business days",
    requirements: ["Valid passport", "Proof of overseas employment", "POEA/OEC record"],
  },
  {
    id: "indigent-enrollment",
    title: "Indigent Member Enrollment",
    description: "Sponsored enrollment for qualified indigent families through LGU and DSWD.",
    category: "special",
    icon: "Users",
    onlineAvailable: false,
    processingTime: "30 business days",
    requirements: ["DSWD Listahanan qualification", "Barangay certification"],
  },
  {
    id: "senior-registration",
    title: "Senior Citizen Lifetime Membership",
    description: "Automatic lifetime coverage for Filipinos aged 60 and above.",
    category: "special",
    icon: "Accessibility",
    onlineAvailable: true,
    processingTime: "Same day",
    requirements: ["Valid senior citizen ID", "Birth certificate"],
  },
];

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: "PDF" | "Excel" | "Word";
  fileSize: string;
  downloads: number;
  updatedAt: string;
  popular?: boolean;
};

export const downloadCategories = [
  { id: "forms", name: "Member Forms" },
  { id: "employer", name: "Employer Forms" },
  { id: "provider", name: "Provider Forms" },
  { id: "circulars", name: "Circulars & Issuances" },
  { id: "reports", name: "Annual Reports" },
  { id: "benefits", name: "Benefit Schedules" },
  { id: "primers", name: "Member Primers" },
];

export const downloads: DownloadItem[] = [
  {
    id: "cf1",
    title: "Claim Form 1 (CF1) — Member Submission",
    description: "Standard form for filing a PhilHealth claim as a member or dependent.",
    category: "forms",
    fileType: "PDF",
    fileSize: "285 KB",
    downloads: 184320,
    updatedAt: "Jan 2025",
    popular: true,
  },
  {
    id: "cf2",
    title: "Claim Form 2 (CF2) — Facility Portion",
    description: "To be filled out by the accredited facility for claim submission.",
    category: "forms",
    fileType: "PDF",
    fileSize: "412 KB",
    downloads: 152400,
    updatedAt: "Jan 2025",
    popular: true,
  },
  {
    id: "pmrf",
    title: "Member Registration Form (PMRF)",
    description: "Universal form for new member registration, record updates, and dependency changes.",
    category: "forms",
    fileType: "PDF",
    fileSize: "198 KB",
    downloads: 245900,
    updatedAt: "Feb 2025",
    popular: true,
  },
  {
    id: "rf1",
    title: "Employer Remittance Report (RF-1) Template",
    description: "Excel template for the monthly Electronic Remittance Report.",
    category: "employer",
    fileType: "Excel",
    fileSize: "176 KB",
    downloads: 96870,
    updatedAt: "Mar 2025",
    popular: true,
  },
  {
    id: "er1",
    title: "Employer Registration Form (ER1)",
    description: "Application form for new employer registration with PhilHealth.",
    category: "employer",
    fileType: "PDF",
    fileSize: "210 KB",
    downloads: 41200,
    updatedAt: "Jan 2025",
  },
  {
    id: "er2",
    title: "Employer Data Amendment Form (ER2)",
    description: "Update employer name, address, or authorized signatories.",
    category: "employer",
    fileType: "PDF",
    fileSize: "165 KB",
    downloads: 28400,
    updatedAt: "Jan 2025",
  },
  {
    id: "pa1",
    title: "PhilHealth Accreditation Application Form (PA1)",
    description: "Application for accreditation of healthcare facilities.",
    category: "provider",
    fileType: "PDF",
    fileSize: "320 KB",
    downloads: 18750,
    updatedAt: "Feb 2025",
  },
  {
    id: "pe1",
    title: "Professional Accreditation Application (PE1)",
    description: "Application for accreditation of individual healthcare professionals.",
    category: "provider",
    fileType: "PDF",
    fileSize: "278 KB",
    downloads: 15600,
    updatedAt: "Feb 2025",
  },
  {
    id: "circ-2025-0027",
    title: "Circular 2025-0027 — Updated Premium Schedule",
    description: "Official circular on the updated premium contribution rates effective 2026.",
    category: "circulars",
    fileType: "PDF",
    fileSize: "124 KB",
    downloads: 56200,
    updatedAt: "May 2025",
    popular: true,
  },
  {
    id: "circ-2024-0019",
    title: "Circular 2024-0019 — Expanded Dialysis Coverage",
    description: "Increases hemodialysis sessions from 144 to 156 per year.",
    category: "circulars",
    fileType: "PDF",
    fileSize: "98 KB",
    downloads: 42100,
    updatedAt: "Nov 2024",
  },
  {
    id: "annual-2024",
    title: "PhilHealth Annual Report 2024",
    description: "Comprehensive annual report on membership, claims, and financial performance.",
    category: "reports",
    fileType: "PDF",
    fileSize: "8.4 MB",
    downloads: 24300,
    updatedAt: "Apr 2025",
  },
  {
    id: "annual-2023",
    title: "PhilHealth Annual Report 2023",
    description: "Annual performance, governance, and sustainability report.",
    category: "reports",
    fileType: "PDF",
    fileSize: "7.2 MB",
    downloads: 31200,
    updatedAt: "Jun 2024",
  },
  {
    id: "benefit-sched-2025",
    title: "Complete Benefit Schedule 2025",
    description: "All case rates, packages, and coverage limits in one reference document.",
    category: "benefits",
    fileType: "Excel",
    fileSize: "1.1 MB",
    downloads: 87600,
    updatedAt: "Jan 2025",
    popular: true,
  },
  {
    id: "case-rates-list",
    title: "All Case Rates List (v2025.06)",
    description: "Searchable list of all 1,200+ covered procedures and their case rates.",
    category: "benefits",
    fileType: "PDF",
    fileSize: "2.3 MB",
    downloads: 102400,
    updatedAt: "Jun 2025",
  },
  {
    id: "primer-member",
    title: "New Member Primer",
    description: "Quick-start guide for newly registered PhilHealth members.",
    category: "primers",
    fileType: "PDF",
    fileSize: "540 KB",
    downloads: 68900,
    updatedAt: "Mar 2025",
  },
  {
    id: "primer-ofw",
    title: "OFW Member Primer",
    description: "Guide for overseas Filipino workers on PhilHealth benefits and payments.",
    category: "primers",
    fileType: "PDF",
    fileSize: "620 KB",
    downloads: 41200,
    updatedAt: "Mar 2025",
  },
];

export type Branch = {
  id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  coordinates: { lat: number; lng: number };
};

export const branches: Branch[] = [
  {
    id: "ncr-central",
    name: "PhilHealth NCR — Central Office",
    region: "NCR",
    address: "Citystate Centre, 709 Shaw Boulevard, Pasig City",
    phone: "(02) 8441-7442",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "Employer Services", "Provider Accreditation"],
    coordinates: { lat: 14.5819, lng: 121.0533 },
  },
  {
    id: "ncr-south",
    name: "PhilHealth NCR — South",
    region: "NCR",
    address: "PhilHealth Building, Chino Roces Avenue, Makati City",
    phone: "(02) 8898-4301",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "Contributions"],
    coordinates: { lat: 14.5535, lng: 121.0144 },
  },
  {
    id: "ncr-north",
    name: "PhilHealth NCR — North",
    region: "NCR",
    address: "5th Floor, SM North EDSA Annex, Quezon City",
    phone: "(02) 8924-2207",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "ID Replacement"],
    coordinates: { lat: 14.6564, lng: 121.0291 },
  },
  {
    id: "region-4a",
    name: "PhilHealth CALABARZON — Regional Office",
    region: "CALABARZON",
    address: "3rd Floor, MITC Building, International Road, Lipa City, Batangas",
    phone: "(043) 756-2424",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "Employer Services"],
    coordinates: { lat: 13.9411, lng: 121.1667 },
  },
  {
    id: "region-7",
    name: "PhilHealth Region 7 — Cebu",
    region: "Central Visayas",
    address: "Ground Floor, DOH-7 Building, Osmeña Boulevard, Cebu City",
    phone: "(032) 254-4401",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "Contributions", "Provider Accreditation"],
    coordinates: { lat: 10.2934, lng: 123.8989 },
  },
  {
    id: "region-11",
    name: "PhilHealth Region 11 — Davao",
    region: "Davao Region",
    address: "2nd Floor, Kuhlman Building, J. P. Laurel Avenue, Davao City",
    phone: "(082) 222-7811",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    services: ["Membership", "Claims", "Employer Services"],
    coordinates: { lat: 7.0866, lng: 125.6131 },
  },
];

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const faqCategories = [
  "Membership",
  "Contributions",
  "Benefits & Claims",
  "Employers",
  "Providers",
  "Account & Login",
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    category: "Membership",
    question: "How do I become a PhilHealth member?",
    answer:
      "All Filipino citizens are automatically covered under the Universal Health Care Act. To activate your membership and receive your PhilHealth Identification Number (PIN), complete the Member Registration Form (PMRF) online or at any PhilHealth branch with a valid government-issued ID. Dependents are automatically enrolled once registered.",
  },
  {
    id: "faq-2",
    category: "Membership",
    question: "Who qualifies as my dependent?",
    answer:
      "Legitimate, illegitimate, legitimate-adopted, or acknowledged children below 21 years old, unmarried and not employed; spouse; and parents aged 60 and above who are not members themselves. A child with a disability regardless of age qualifies if fully dependent on the member.",
  },
  {
    id: "faq-3",
    category: "Membership",
    question: "How do I update my member record?",
    answer:
      "Sign in to the Member Portal and use the 'Update Record' service, or visit any PhilHealth branch with the PMRF and supporting documents (e.g., marriage certificate for name changes, birth certificate for dependent additions). Updates are typically processed within 3 business days.",
  },
  {
    id: "faq-4",
    category: "Contributions",
    question: "How much is the monthly PhilHealth premium?",
    answer:
      "Effective 2025, direct contributors pay 5% of their monthly income (capped at ₱5,000 for the lowest and ₱100,000 for the highest income brackets), shared equally between employee and employer for employed members. Self-employed and voluntary members pay the full 5% based on their declared income.",
  },
  {
    id: "faq-5",
    category: "Contributions",
    question: "Where can I pay my PhilHealth contributions?",
    answer:
      "You can pay at any PhilHealth Local Health Insurance Office (LHIO), accredited banks (BPI, BDO, Metrobank, Landbank), through GCash, Maya, Bayad Center, SM Business Centers, and select 7-Eleven branches. Online payment is also available via the Member Portal.",
  },
  {
    id: "faq-6",
    category: "Contributions",
    question: "I missed several premium payments. Can I still avail of benefits?",
    answer:
      "For inpatient benefits, you need at least 3 months of premium within the 6-month period immediately prior to confinement. If you have gaps, you may pay retroactively for up to 12 months at any accredited payment center. Sponsored and senior citizen members have no premium requirement.",
  },
  {
    id: "faq-7",
    category: "Benefits & Claims",
    question: "How do I file a claim for reimbursement?",
    answer:
      "Most claims are filed directly by the accredited hospital or clinic where you were confined. For reimbursement (when you paid out-of-pocket at a non-accredited facility), submit Claim Form 1 (CF1), the official receipt, statement of account, and medical abstract within 60 days of discharge via the Member Portal or any PhilHealth branch.",
  },
  {
    id: "faq-8",
    category: "Benefits & Claims",
    question: "How long does claims processing take?",
    answer:
      "Direct facility filing is processed within 10 working days. Member-filed reimbursement claims take 15 working days. Use the Claims Tracking tool in the Member Portal to monitor your claim's progress through each stage — from submission to payment.",
  },
  {
    id: "faq-9",
    category: "Benefits & Claims",
    question: "What is the difference between Case Rate and Fee-for-Service?",
    answer:
      "PhilHealth uses a Case Rate system — a fixed all-inclusive amount per procedure or condition. This means the same procedure (e.g., appendectomy) pays the same amount regardless of hospital class. Fee-for-service is no longer used for most covered procedures.",
  },
  {
    id: "faq-10",
    category: "Employers",
    question: "How do I register my company as a PhilHealth employer?",
    answer:
      "Submit the Employer Registration Form (ER1) with your SEC/DTI registration, Mayor's permit, and list of employees through the Employer Portal or any PhilHealth branch. You will receive an Employer Code within 5 business days, which you will use for all remittances and reports.",
  },
  {
    id: "faq-11",
    category: "Employers",
    question: "When is the deadline for monthly remittance?",
    answer:
      "Premium contributions must be remitted on or before the 10th day of the month following the applicable month. Late remittances incur a surcharge of 1% per month of delay. The electronic RF-1 and payment proof must be uploaded via the Employer Portal.",
  },
  {
    id: "faq-12",
    category: "Providers",
    question: "How can our hospital apply for PhilHealth accreditation?",
    answer:
      "Submit the PhilHealth Accreditation Application Form (PA1) along with your DOH license, business permits, and staff credentials through the Provider Portal. Initial accreditation is typically processed within 60 working days. Renewals can be done 90 days before expiration.",
  },
  {
    id: "faq-13",
    category: "Account & Login",
    question: "I forgot my Member Portal password. How do I reset it?",
    answer:
      "Click 'Forgot password' on the login page and enter your registered email or mobile number. A 6-digit verification code will be sent. After verification, you can set a new password. If you no longer have access to your email, visit any branch with a valid ID to reset in person.",
  },
  {
    id: "faq-14",
    category: "Account & Login",
    question: "Is the Member Portal accessible on mobile?",
    answer:
      "Yes — the Member Portal is fully responsive and works on any smartphone, tablet, or desktop browser. All key services including claims tracking, contribution viewing, and benefits checking are mobile-optimized with WCAG 2.1 AA accessibility compliance.",
  },
];

export type TransparencyDoc = {
  id: string;
  title: string;
  type: "Budget" | "Performance" | "Audit" | "Procurement" | "Annual Report";
  year: number;
  fileType: "PDF" | "Excel";
  publishedOn: string;
};

export const transparencyDocuments: TransparencyDoc[] = [
  {
    id: "bud-2025",
    title: "Approved Corporate Operating Budget 2025",
    type: "Budget",
    year: 2025,
    fileType: "PDF",
    publishedOn: "Jan 15, 2025",
  },
  {
    id: "q1-2025-perf",
    title: "Q1 2025 Performance Scorecard",
    type: "Performance",
    year: 2025,
    fileType: "PDF",
    publishedOn: "May 30, 2025",
  },
  {
    id: "annual-2024",
    title: "Annual Report 2024",
    type: "Annual Report",
    year: 2024,
    fileType: "PDF",
    publishedOn: "Apr 12, 2025",
  },
  {
    id: "coa-2023",
    title: "Commission on Audit Report — CY 2023",
    type: "Audit",
    year: 2023,
    fileType: "PDF",
    publishedOn: "Dec 18, 2024",
  },
  {
    id: "procurement-2025",
    title: "2025 Annual Procurement Plan",
    type: "Procurement",
    year: 2025,
    fileType: "Excel",
    publishedOn: "Feb 02, 2025",
  },
  {
    id: "q4-2024-perf",
    title: "Q4 2024 Performance Scorecard",
    type: "Performance",
    year: 2024,
    fileType: "PDF",
    publishedOn: "Feb 28, 2025",
  },
];

export const performanceMetrics = [
  { label: "Claims processed within 10 days", value: 87, unit: "%", target: 90, trend: "up" as const, change: "+3.2 pts" },
  { label: "Member satisfaction (CSAT)", value: 4.4, unit: "/5", target: 4.5, trend: "up" as const, change: "+0.1" },
  { label: "Digital adoption rate", value: 64, unit: "%", target: 70, trend: "up" as const, change: "+8.4 pts" },
  { label: "Average call center wait time", value: 2.4, unit: "min", target: 2, trend: "down" as const, change: "-0.6 min" },
];

export const monthlyClaimsData = [
  { month: "Jan", claims: 1.42, paid: 1.31 },
  { month: "Feb", claims: 1.38, paid: 1.28 },
  { month: "Mar", claims: 1.55, paid: 1.46 },
  { month: "Apr", claims: 1.48, paid: 1.39 },
  { month: "May", claims: 1.61, paid: 1.52 },
  { month: "Jun", claims: 1.58, paid: 1.49 },
  { month: "Jul", claims: 1.65, paid: 1.56 },
  { month: "Aug", claims: 1.71, paid: 1.61 },
  { month: "Sep", claims: 1.59, paid: 1.50 },
  { month: "Oct", claims: 1.66, paid: 1.57 },
  { month: "Nov", claims: 1.74, paid: 1.65 },
  { month: "Dec", claims: 1.82, paid: 1.72 },
];

export const membershipDistribution = [
  { name: "Direct Contributors (Employed)", value: 28.4, color: "#009966" },
  { name: "Sponsored (Indigent, Senior, PWD)", value: 51.2, color: "#10B981" },
  { name: "Self-Earning / Voluntary", value: 11.8, color: "#3B82F6" },
  { name: "OFW Members", value: 8.6, color: "#F59E0B" },
];

// Mock member data for the portal demo
export const mockMember = {
  name: "Maria Clara Santos-Reyes",
  philhealthId: "PH-2019-4529-8841",
  membershipType: "Employed (Direct Contributor)",
  status: "Active",
  statusSince: "March 2019",
  employer: "San Miguel Corporation",
  premiumRate: "2.5% shared",
  totalContributions: 78,
  thisYearContributions: 6,
  birthdate: "August 14, 1987",
  sex: "Female",
  civilStatus: "Married",
  mobile: "+63 917 555 8421",
  email: "maria.reyes@example.com",
  address: "12 Mabini Street, Brgy. Kapitolyo, Pasig City, NCR",
  dependents: [
    { name: "Juan Diego Reyes", relation: "Spouse", status: "Active" },
    { name: "Andres Reyes", relation: "Son (14)", status: "Active" },
    { name: "Sofia Reyes", relation: "Daughter (9)", status: "Active" },
    { name: "Elena Santos", relation: "Mother (62)", status: "Active" },
  ],
};

export const contributionHistory = [
  { period: "May 2025", amount: 425.0, status: "Paid", employer: "San Miguel Corporation", date: "May 08, 2025" },
  { period: "Apr 2025", amount: 425.0, status: "Paid", employer: "San Miguel Corporation", date: "Apr 09, 2025" },
  { period: "Mar 2025", amount: 425.0, status: "Paid", employer: "San Miguel Corporation", date: "Mar 10, 2025" },
  { period: "Feb 2025", amount: 425.0, status: "Paid", employer: "San Miguel Corporation", date: "Feb 10, 2025" },
  { period: "Jan 2025", amount: 425.0, status: "Paid", employer: "San Miguel Corporation", date: "Jan 10, 2025" },
  { period: "Dec 2024", amount: 412.5, status: "Paid", employer: "San Miguel Corporation", date: "Dec 09, 2024" },
  { period: "Nov 2024", amount: 412.5, status: "Paid", employer: "San Miguel Corporation", date: "Nov 08, 2024" },
  { period: "Oct 2024", amount: 412.5, status: "Paid", employer: "San Miguel Corporation", date: "Oct 09, 2024" },
];

export const claimsHistory = [
  {
    id: "CLM-2025-0048-231",
    facility: "The Medical City, Pasig",
    type: "Inpatient — Appendectomy",
    filedDate: "Apr 12, 2025",
    amount: "₱24,000",
    status: "Processing",
    progress: 60,
    stages: [
      { label: "Submitted", done: true, date: "Apr 12" },
      { label: "Initial Review", done: true, date: "Apr 14" },
      { label: "Validation", done: true, date: "Apr 18" },
      { label: "Approval", done: false, date: "—" },
      { label: "Payment", done: false, date: "—" },
    ],
  },
  {
    id: "CLM-2025-0021-104",
    facility: "Konsulta Provider — HealthFirst Clinic",
    type: "Outpatient — Primary Care Consultation",
    filedDate: "Mar 04, 2025",
    amount: "₱4,200",
    status: "Paid",
    progress: 100,
    stages: [
      { label: "Submitted", done: true, date: "Mar 04" },
      { label: "Initial Review", done: true, date: "Mar 06" },
      { label: "Validation", done: true, date: "Mar 08" },
      { label: "Approval", done: true, date: "Mar 12" },
      { label: "Payment", done: true, date: "Mar 18" },
    ],
  },
  {
    id: "CLM-2024-0887-651",
    facility: "Asian Hospital and Medical Center",
    type: "Inpatient — Cesarean Section",
    filedDate: "Nov 22, 2024",
    amount: "₱19,000",
    status: "Paid",
    progress: 100,
    stages: [
      { label: "Submitted", done: true, date: "Nov 22" },
      { label: "Initial Review", done: true, date: "Nov 25" },
      { label: "Validation", done: true, date: "Nov 29" },
      { label: "Approval", done: true, date: "Dec 03" },
      { label: "Payment", done: true, date: "Dec 10" },
    ],
  },
];

export const memberNotifications = [
  {
    id: "n1",
    title: "Your April contribution has been posted",
    body: "San Miguel Corporation remitted your PhilHealth contribution for April 2025.",
    date: "May 12, 2025",
    type: "success" as const,
    unread: true,
  },
  {
    id: "n2",
    title: "Claim CLM-2025-0048-231 moved to Validation",
    body: "Your appendectomy claim is now in the validation stage. Expected completion: 3–5 days.",
    date: "Apr 18, 2025",
    type: "info" as const,
    unread: true,
  },
  {
    id: "n3",
    title: "New advisory: Expanded Outpatient Benefit Package",
    body: "Specialist consultations now covered under EOBP starting July 1, 2025.",
    date: "Apr 02, 2025",
    type: "info" as const,
    unread: false,
  },
  {
    id: "n4",
    title: "Premium rate update effective January 2026",
    body: "Direct contributors: 5% premium rate capped at ₱5,000 income floor.",
    date: "Mar 28, 2025",
    type: "warning" as const,
    unread: false,
  },
];
