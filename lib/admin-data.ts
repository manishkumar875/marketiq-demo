// Mock data for the Admin Dashboard demo. No backend — static fixtures only.

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  source: "Website Form" | "Referral" | "Outbound" | "Event" | "Inbound Call";
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  estValue: number;
  owner: string;
  createdDate: string;
  notes: { id: string; author: string; date: string; text: string }[];
}

export const LEADS: Lead[] = [
  {
    id: "LEAD-2201",
    name: "Sarah Kim",
    company: "Northbridge Retail Group",
    email: "sarah.kim@northbridgeretail.com",
    phone: "+1 (212) 555-0142",
    industry: "Retail",
    source: "Website Form",
    status: "Qualified",
    estValue: 48000,
    owner: "Priya Anand",
    createdDate: "2026-06-14",
    notes: [
      { id: "n1", author: "Priya Anand", date: "2026-06-15", text: "Discovery call scheduled for next Tuesday. Interested in CX research for new loyalty program." },
      { id: "n2", author: "Priya Anand", date: "2026-06-17", text: "Call went well — sending proposal for a 3-wave CX tracking study." },
    ],
  },
  {
    id: "LEAD-2198",
    name: "Tom Bradley",
    company: "Vertex Health Systems",
    email: "t.bradley@vertexhealth.com",
    phone: "+1 (617) 555-0198",
    industry: "Healthcare",
    source: "Referral",
    status: "Proposal Sent",
    estValue: 92000,
    owner: "Marcus Webb",
    createdDate: "2026-06-08",
    notes: [
      { id: "n3", author: "Marcus Webb", date: "2026-06-10", text: "Referred by existing client (Meridian Care). Needs patient experience tracking across 12 facilities." },
      { id: "n4", author: "Marcus Webb", date: "2026-06-18", text: "Proposal sent — awaiting procurement review, expected decision by end of month." },
    ],
  },
  {
    id: "LEAD-2192",
    name: "Aiko Tanaka",
    company: "Solace Financial",
    email: "aiko.tanaka@solacefinancial.jp",
    phone: "+81 3-5555-0173",
    industry: "Financial Services",
    source: "Event",
    status: "Contacted",
    estValue: 35000,
    owner: "Daniel Cho",
    createdDate: "2026-06-16",
    notes: [
      { id: "n5", author: "Daniel Cho", date: "2026-06-16", text: "Met at FinTech Summit Tokyo. Interested in digital banking UX benchmarking." },
    ],
  },
  {
    id: "LEAD-2185",
    name: "Carlos Mendes",
    company: "Aurora Motors",
    email: "carlos.mendes@auroramotors.com",
    phone: "+55 11 5555-0167",
    industry: "Automotive",
    source: "Outbound",
    status: "New",
    estValue: 60000,
    owner: "Priya Anand",
    createdDate: "2026-06-19",
    notes: [],
  },
  {
    id: "LEAD-2179",
    name: "Emma Whitfield",
    company: "Lumen Education Group",
    email: "emma.whitfield@lumenedu.org",
    phone: "+44 20 5555-0184",
    industry: "Education",
    source: "Inbound Call",
    status: "Won",
    estValue: 27500,
    owner: "Marcus Webb",
    createdDate: "2026-05-28",
    notes: [
      { id: "n6", author: "Marcus Webb", date: "2026-06-02", text: "Closed — student experience study, 4 campuses, kicking off July 1st." },
    ],
  },
  {
    id: "LEAD-2170",
    name: "Daniel Reyes",
    company: "Pinecrest FMCG",
    email: "d.reyes@pinecrestfmcg.com",
    phone: "+1 (312) 555-0129",
    industry: "FMCG",
    source: "Website Form",
    status: "Lost",
    estValue: 18000,
    owner: "Daniel Cho",
    createdDate: "2026-05-20",
    notes: [
      { id: "n7", author: "Daniel Cho", date: "2026-05-30", text: "Went with a competitor on pricing. Worth re-engaging next fiscal year." },
    ],
  },
  {
    id: "LEAD-2165",
    name: "Hannah Becker",
    company: "Crestline Technology",
    email: "hannah.becker@crestlinetech.io",
    phone: "+1 (650) 555-0156",
    industry: "Technology",
    source: "Referral",
    status: "Qualified",
    estValue: 54000,
    owner: "Priya Anand",
    createdDate: "2026-06-11",
    notes: [
      { id: "n8", author: "Priya Anand", date: "2026-06-13", text: "Strong fit for product validation work ahead of their Q4 launch." },
    ],
  },
];

export interface AdminProject {
  id: string;
  name: string;
  client: string;
  status: "Planning" | "In Field" | "Analysis" | "Reporting" | "Completed";
  owner: string;
  value: number;
  startDate: string;
  dueDate: string;
  health: "On Track" | "At Risk" | "Delayed";
}

export const ADMIN_PROJECTS: AdminProject[] = [
  { id: "PRJ-1042", name: "Q3 Brand Health Tracker — Wave 3", client: "Northbridge Retail Group", status: "In Field", owner: "Priya Anand", value: 48000, startDate: "2026-05-12", dueDate: "2026-07-02", health: "On Track" },
  { id: "PRJ-1038", name: "Mobile App Onboarding — Concept Test", client: "Crestline Technology", status: "Analysis", owner: "Marcus Webb", value: 22500, startDate: "2026-04-20", dueDate: "2026-06-25", health: "On Track" },
  { id: "PRJ-1031", name: "CX Journey Mapping — Retail Banking", client: "Solace Financial", status: "Reporting", owner: "Priya Anand", value: 61000, startDate: "2026-03-10", dueDate: "2026-06-20", health: "At Risk" },
  { id: "PRJ-1019", name: "Annual Segmentation Refresh", client: "Pinecrest FMCG", status: "Completed", owner: "Daniel Cho", value: 89500, startDate: "2026-01-15", dueDate: "2026-04-30", health: "On Track" },
  { id: "PRJ-1051", name: "Competitive Landscape — Fintech Category", client: "Solace Financial", status: "Planning", owner: "Marcus Webb", value: 15000, startDate: "2026-06-28", dueDate: "2026-08-15", health: "On Track" },
  { id: "PRJ-1054", name: "Patient Experience Tracking", client: "Vertex Health Systems", status: "Planning", owner: "Marcus Webb", value: 92000, startDate: "2026-07-01", dueDate: "2026-10-15", health: "Delayed" },
  { id: "PRJ-1027", name: "Student Experience Study — 4 Campuses", client: "Lumen Education Group", status: "In Field", owner: "Marcus Webb", value: 27500, startDate: "2026-06-01", dueDate: "2026-08-20", health: "On Track" },
];

export interface ResearchRequest {
  id: string;
  contactName: string;
  company: string;
  email: string;
  industry: string;
  researchType: string;
  countries: string;
  sampleSize: string;
  budget: string;
  timeline: string;
  objectives: string;
  status: "Unreviewed" | "In Review" | "Proposal Sent" | "Converted" | "Declined";
  submittedDate: string;
  notes: { id: string; author: string; date: string; text: string }[];
}

export const RESEARCH_REQUESTS: ResearchRequest[] = [
  {
    id: "REQ-5512",
    contactName: "Sarah Kim",
    company: "Northbridge Retail Group",
    email: "sarah.kim@northbridgeretail.com",
    industry: "Retail",
    researchType: "Customer Experience Research",
    countries: "United States",
    sampleSize: "1,000 – 5,000",
    budget: "$25,000 – $75,000",
    timeline: "1 – 2 months",
    objectives: "Understand drop-off points in our new loyalty program rollout and benchmark against category norms.",
    status: "Converted",
    submittedDate: "2026-06-14",
    notes: [{ id: "rn1", author: "Priya Anand", date: "2026-06-15", text: "Converted to PRJ-1042." }],
  },
  {
    id: "REQ-5509",
    contactName: "Tom Bradley",
    company: "Vertex Health Systems",
    email: "t.bradley@vertexhealth.com",
    industry: "Healthcare",
    researchType: "Customer Experience Research",
    countries: "Multi-country / Global",
    sampleSize: "5,000 – 10,000",
    budget: "$75,000 – $150,000",
    timeline: "2 – 3 months",
    objectives: "Patient experience benchmarking across 12 facilities ahead of accreditation renewal.",
    status: "Proposal Sent",
    submittedDate: "2026-06-08",
    notes: [{ id: "rn2", author: "Marcus Webb", date: "2026-06-18", text: "Proposal sent, awaiting procurement decision." }],
  },
  {
    id: "REQ-5520",
    contactName: "Aiko Tanaka",
    company: "Solace Financial",
    email: "aiko.tanaka@solacefinancial.jp",
    industry: "Financial Services",
    researchType: "Brand Health Tracking",
    countries: "Japan",
    sampleSize: "500 – 1,000",
    budget: "$10,000 – $25,000",
    timeline: "2 – 4 weeks",
    objectives: "Benchmark digital banking trust and UX perception versus 3 named competitors.",
    status: "In Review",
    submittedDate: "2026-06-16",
    notes: [],
  },
  {
    id: "REQ-5524",
    contactName: "Carlos Mendes",
    company: "Aurora Motors",
    email: "carlos.mendes@auroramotors.com",
    industry: "Automotive",
    researchType: "Product Testing",
    countries: "Brazil",
    sampleSize: "1,000 – 5,000",
    budget: "$25,000 – $75,000",
    timeline: "1 – 2 months",
    objectives: "Concept test for new EV trim line before regional launch decision.",
    status: "Unreviewed",
    submittedDate: "2026-06-19",
    notes: [],
  },
  {
    id: "REQ-5501",
    contactName: "Emma Whitfield",
    company: "Lumen Education Group",
    email: "emma.whitfield@lumenedu.org",
    industry: "Education",
    researchType: "Consumer Insights",
    countries: "United Kingdom",
    sampleSize: "500 – 1,000",
    budget: "Under $10,000",
    timeline: "Flexible / Ongoing",
    objectives: "Student experience study across 4 campuses to inform retention strategy.",
    status: "Converted",
    submittedDate: "2026-05-28",
    notes: [{ id: "rn3", author: "Marcus Webb", date: "2026-06-02", text: "Converted to PRJ-1027." }],
  },
  {
    id: "REQ-5496",
    contactName: "Daniel Reyes",
    company: "Pinecrest FMCG",
    email: "d.reyes@pinecrestfmcg.com",
    industry: "FMCG",
    researchType: "Market Segmentation",
    countries: "United States",
    sampleSize: "5,000 – 10,000",
    budget: "$75,000 – $150,000",
    timeline: "2 – 3 months",
    objectives: "Annual refresh of household consumer segmentation model.",
    status: "Declined",
    submittedDate: "2026-05-20",
    notes: [{ id: "rn4", author: "Daniel Cho", date: "2026-05-30", text: "Declined — went with a lower-cost competitor." }],
  },
];

export const ADMIN_USER = {
  name: "Alex Rivera",
  role: "Operations Manager",
  initials: "AR",
};
