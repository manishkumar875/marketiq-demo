// Mock data for the Client Portal demo. No backend — static fixtures only.

export interface Project {
  id: string;
  name: string;
  type: string;
  status: "In Field" | "Analysis" | "Reporting" | "Completed" | "Planning";
  progress: number;
  startDate: string;
  dueDate: string;
  sampleTarget: number;
  sampleCollected: number;
  countries: string[];
  consultant: string;
}

export const PROJECTS: Project[] = [
  {
    id: "PRJ-1042",
    name: "Q3 Brand Health Tracker — Wave 3",
    type: "Brand Health Tracking",
    status: "In Field",
    progress: 64,
    startDate: "2026-05-12",
    dueDate: "2026-07-02",
    sampleTarget: 4000,
    sampleCollected: 2560,
    countries: ["United States", "United Kingdom", "Germany"],
    consultant: "Priya Anand",
  },
  {
    id: "PRJ-1038",
    name: "Mobile App Onboarding — Concept Test",
    type: "Product Testing",
    status: "Analysis",
    progress: 85,
    startDate: "2026-04-20",
    dueDate: "2026-06-25",
    sampleTarget: 1200,
    sampleCollected: 1200,
    countries: ["United States"],
    consultant: "Marcus Webb",
  },
  {
    id: "PRJ-1031",
    name: "CX Journey Mapping — Retail Banking",
    type: "Customer Experience Research",
    status: "Reporting",
    progress: 92,
    startDate: "2026-03-10",
    dueDate: "2026-06-20",
    sampleTarget: 2500,
    sampleCollected: 2480,
    countries: ["India", "Australia"],
    consultant: "Priya Anand",
  },
  {
    id: "PRJ-1019",
    name: "Annual Segmentation Refresh",
    type: "Market Segmentation",
    status: "Completed",
    progress: 100,
    startDate: "2026-01-15",
    dueDate: "2026-04-30",
    sampleTarget: 6000,
    sampleCollected: 6042,
    countries: ["United States", "Canada", "Brazil"],
    consultant: "Daniel Cho",
  },
  {
    id: "PRJ-1051",
    name: "Competitive Landscape — Fintech Category",
    type: "Competitive Intelligence",
    status: "Planning",
    progress: 8,
    startDate: "2026-06-28",
    dueDate: "2026-08-15",
    sampleTarget: 3000,
    sampleCollected: 0,
    countries: ["United States", "United Kingdom", "Singapore"],
    consultant: "Marcus Webb",
  },
];

export interface ReportItem {
  id: string;
  title: string;
  project: string;
  type: "Executive Summary" | "Full Data Tables" | "Topline Report" | "Presentation Deck";
  date: string;
  fileSize: string;
}

export const REPORTS: ReportItem[] = [
  { id: "RPT-501", title: "Q3 Brand Health — Wave 2 Topline", project: "Q3 Brand Health Tracker — Wave 3", type: "Topline Report", date: "2026-05-30", fileSize: "1.8 MB" },
  { id: "RPT-498", title: "Mobile Onboarding Concept Test — Executive Summary", project: "Mobile App Onboarding — Concept Test", type: "Executive Summary", date: "2026-06-12", fileSize: "2.4 MB" },
  { id: "RPT-487", title: "Retail Banking CX — Full Data Tables", project: "CX Journey Mapping — Retail Banking", type: "Full Data Tables", date: "2026-06-08", fileSize: "5.1 MB" },
  { id: "RPT-470", title: "Annual Segmentation — Final Presentation", project: "Annual Segmentation Refresh", type: "Presentation Deck", date: "2026-04-28", fileSize: "8.7 MB" },
  { id: "RPT-465", title: "Annual Segmentation — Persona Profiles", project: "Annual Segmentation Refresh", type: "Full Data Tables", date: "2026-04-26", fileSize: "3.2 MB" },
];

export interface SurveyResponseSummary {
  id: string;
  project: string;
  completes: number;
  target: number;
  avgDuration: string;
  completionRate: number;
  lastUpdated: string;
}

export const SURVEY_RESPONSES: SurveyResponseSummary[] = [
  { id: "SRV-9001", project: "Q3 Brand Health Tracker — Wave 3", completes: 2560, target: 4000, avgDuration: "8m 12s", completionRate: 78, lastUpdated: "2026-06-19" },
  { id: "SRV-8990", project: "Mobile App Onboarding — Concept Test", completes: 1200, target: 1200, avgDuration: "5m 45s", completionRate: 91, lastUpdated: "2026-06-12" },
  { id: "SRV-8971", project: "CX Journey Mapping — Retail Banking", completes: 2480, target: 2500, avgDuration: "11m 03s", completionRate: 84, lastUpdated: "2026-06-08" },
  { id: "SRV-8930", project: "Annual Segmentation Refresh", completes: 6042, target: 6000, avgDuration: "14m 30s", completionRate: 88, lastUpdated: "2026-04-28" },
];

export interface FileItem {
  id: string;
  name: string;
  project: string;
  category: "Raw Data" | "Questionnaire" | "Report" | "Presentation" | "Contract";
  date: string;
  fileSize: string;
}

export const FILES: FileItem[] = [
  { id: "FILE-201", name: "wave3_questionnaire_v2.pdf", project: "Q3 Brand Health Tracker — Wave 3", category: "Questionnaire", date: "2026-05-10", fileSize: "412 KB" },
  { id: "FILE-198", name: "onboarding_concept_raw_data.csv", project: "Mobile App Onboarding — Concept Test", category: "Raw Data", date: "2026-06-12", fileSize: "9.6 MB" },
  { id: "FILE-190", name: "cx_journey_topline.pptx", project: "CX Journey Mapping — Retail Banking", category: "Presentation", date: "2026-06-08", fileSize: "6.3 MB" },
  { id: "FILE-176", name: "segmentation_msa_signed.pdf", project: "Annual Segmentation Refresh", category: "Contract", date: "2026-01-15", fileSize: "1.1 MB" },
  { id: "FILE-172", name: "segmentation_final_report.pdf", project: "Annual Segmentation Refresh", category: "Report", date: "2026-04-28", fileSize: "8.7 MB" },
  { id: "FILE-165", name: "fintech_landscape_kickoff_brief.docx", project: "Competitive Landscape — Fintech Category", category: "Questionnaire", date: "2026-06-18", fileSize: "284 KB" },
];

export interface Message {
  id: string;
  from: string;
  role: string;
  avatarInitials: string;
  project: string;
  preview: string;
  date: string;
  unread: boolean;
}

export const MESSAGES: Message[] = [
  { id: "MSG-1", from: "Priya Anand", role: "Senior Research Consultant", avatarInitials: "PA", project: "Q3 Brand Health Tracker — Wave 3", preview: "Fieldwork is tracking ahead of schedule — we should hit full sample by June 28th.", date: "2026-06-19", unread: true },
  { id: "MSG-2", from: "Marcus Webb", role: "Research Director", avatarInitials: "MW", project: "Mobile App Onboarding — Concept Test", preview: "Sharing the executive summary draft for your review before we finalize.", date: "2026-06-17", unread: true },
  { id: "MSG-3", from: "Daniel Cho", role: "Data Analyst", avatarInitials: "DC", project: "Annual Segmentation Refresh", preview: "Updated persona profiles are attached — let me know if the naming conventions work.", date: "2026-06-10", unread: false },
  { id: "MSG-4", from: "Priya Anand", role: "Senior Research Consultant", avatarInitials: "PA", project: "CX Journey Mapping — Retail Banking", preview: "Quick note: we've flagged a notable drop-off at the account opening step.", date: "2026-06-08", unread: false },
  { id: "MSG-5", from: "Support Team", role: "Client Success", avatarInitials: "ST", project: "General", preview: "Your Q2 invoice has been generated and is ready for review.", date: "2026-06-01", unread: false },
];

export interface Invoice {
  id: string;
  project: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
  issueDate: string;
  dueDate: string;
}

export const INVOICES: Invoice[] = [
  { id: "INV-3301", project: "Q3 Brand Health Tracker — Wave 3", amount: 48000, status: "Due", issueDate: "2026-06-01", dueDate: "2026-06-30" },
  { id: "INV-3287", project: "Mobile App Onboarding — Concept Test", amount: 22500, status: "Paid", issueDate: "2026-05-01", dueDate: "2026-05-30" },
  { id: "INV-3260", project: "CX Journey Mapping — Retail Banking", amount: 61000, status: "Paid", issueDate: "2026-03-15", dueDate: "2026-04-14" },
  { id: "INV-3214", project: "Annual Segmentation Refresh", amount: 89500, status: "Paid", issueDate: "2026-01-20", dueDate: "2026-02-19" },
  { id: "INV-3198", project: "Competitive Landscape — Fintech Category", amount: 15000, status: "Overdue", issueDate: "2026-05-10", dueDate: "2026-06-09" },
];

export const CLIENT_USER = {
  name: "Jordan Mitchell",
  company: "Northbridge Retail Group",
  email: "jordan.mitchell@northbridgeretail.com",
  initials: "JM",
};
