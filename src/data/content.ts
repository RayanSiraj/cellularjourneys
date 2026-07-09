export const mission =
  "To advance cancer education, research awareness, scientific literacy, and community impact through education, compassion, collaboration, and innovation.";

export const missionActions = [
  "Developing accessible educational resources about cancer, health, and science",
  "Supporting students interested in STEM, healthcare, and research careers",
  "Creating opportunities for experiential learning through internships and mentorship",
  "Engaging communities through outreach events, awareness campaigns, and educational programming",
  "Promoting evidence-based health information",
  "Building partnerships that strengthen public understanding of science and medicine",
] as const;

export const boardMembers = [
  {
    name: "Dr. Fatima Rehman, PhD",
    title: "Director and President",
    bio: "Molecular and cellular biologist, educator, cancer researcher, and science communicator; faculty member in the Department of Biology at the University of North Florida. Oversees organizational strategy, educational initiatives, community outreach, and the growth of CancerQuest.",
  },
  {
    name: "Dr. Gregg Orloff, PhD",
    title: "Director",
    bio: "Founder of CancerQuest; longtime educator and advocate for cancer education whose vision helped establish one of the world's most widely used cancer education platforms.",
  },
  {
    name: "Sumra Rathore, MD",
    title: "Director",
    bio: "Focus on community engagement, education, and organizational development.",
  },
  {
    name: "Farah Malik, MD",
    title: "Director",
    bio: "Experience in community outreach, strategic planning, and organizational growth.",
  },
  {
    name: "Madiha Iqbal, MD",
    title: "Director",
    bio: "Physician specializing in hematology and oncology; brings clinical expertise and a patient-centered perspective.",
  },
] as const;

// TODO(client): provide the approved one-line description for each value.
export const values = [
  "Education",
  "Integrity",
  "Compassion",
  "Collaboration",
  "Innovation",
  "Service",
] as const;

export const platforms = [
  {
    name: "CancerQuest.org",
    type: "Cancer education",
    url: "https://cancerquest.org/",
    description:
      "Cancer education covering cancer biology, prevention, screening, diagnosis, treatment, survivorship, caregiver resources, mental health, and news. Resources are also available in Mandarin and Spanish.",
  },
  {
    name: "YouTube: CancerQuest-CJ",
    type: "Video education",
    url: "https://www.youtube.com/channel/UC4rKKhGL-XkxeDl5LDM06rw",
    description:
      "Cancer awareness content, survivor stories, expert interviews, and research education in video format.",
  },
  {
    name: "YouTube: Biology Basics-CJ",
    type: "Science education",
    url: "https://www.youtube.com/channel/UCVXN1JVK9n_KwmSnnKS3o5Q",
    description:
      "General biology, anatomy and physiology, molecular and cellular biology, genetics, biochemistry, research skills, scientific careers, lab techniques, and medicinal plants.",
  },
  {
    name: "Facebook: CancerQuest",
    type: "English",
    url: "https://www.facebook.com/CancerQuest/",
    description:
      "Cancer education, research updates, awareness resources, and community information in English.",
  },
  {
    name: "Facebook: CancerQuest Español",
    type: "Spanish",
    url: "https://www.facebook.com/CancerQuestEspanol/",
    description:
      "Cancer education and awareness resources for Spanish-speaking communities.",
  },
  {
    name: "Facebook: CancerQuest 中文",
    type: "Mandarin Chinese",
    url: "https://www.facebook.com/CancerQuestZhongWen/",
    description:
      "Cancer education and awareness resources for Mandarin-speaking communities.",
  },
  {
    name: "Instagram: Cellular Journeys",
    type: "Organization updates",
    url: "https://www.instagram.com/cellularjourneys/",
    description:
      "Updates from Cellular Journeys, including education, internships, community outreach, and programs.",
  },
  {
    name: "LinkedIn",
    type: "When created",
    url: "https://www.linkedin.com/groups/24590009/",
    description:
      "A professional network for Cellular Journeys programs, partnerships, and opportunities.",
  },
] as const;

export const summerEvents = [
  {
    month: "June",
    items: [
      "Cellular Journeys Internship Orientation",
      "Cancer Survivor Interview Series",
    ],
  },
  {
    month: "July",
    items: ["Cancer Awareness Fair, July 18-19"],
  },
  {
    month: "August",
    items: ["Student Project Showcase"],
  },
] as const;

export const recurringEvents = [
  ["August", "Student Internship Showcase & Awards Ceremony"],
  ["September", "Childhood Cancer Awareness Event"],
  ["October", "Breast Cancer Awareness Community Walk"],
  ["November", "Science & Healthcare Career Day"],
  ["February", "World Cancer Day Community Event"],
  ["March", "Colorectal Cancer Awareness Campaign"],
  ["April", "STEM Discovery Day for High School Students"],
  ["June", "Annual Cellular Journeys Summer Internship Kickoff"],
] as const;

export const communityPresentations = [
  "Cancer Awareness 101",
  "Understanding Cancer Screening",
  "Careers in Healthcare and Research",
  "How to Become a Scientist",
  "Research Skills for Students",
  "Science Communication Workshop",
] as const;

export type DocumentItem = {
  name: string;
  href?: string;
};

// TODO(client): add approved public files and their final asset filenames.
export const documentLibrary: Record<string, DocumentItem[]> = {
  Governance: [
    { name: "Board of Directors List" },
    { name: "Bylaws" },
    { name: "Conflict of Interest Policy" },
    { name: "Strategic Plan" },
    { name: "Florida Annual Report" },
  ],
  Financials: [
    { name: "IRS Determination Letter" },
    { name: "IRS Tax-Exempt Status Confirmation" },
    { name: "Annual Financial Report" },
    { name: "Annual Balance Sheet" },
    { name: "Form 990" },
  ],
  Impact: [
    { name: "Annual Impact Report" },
    { name: "Internship Program Outcomes" },
    { name: "Community Outreach Metrics" },
    { name: "CancerQuest Reach and Analytics" },
    { name: "BiologyBasics Reach and Analytics" },
  ],
  Policies: [
    { name: "Privacy Policy" },
    { name: "Website Terms of Use" },
    { name: "Volunteer Policies" },
    { name: "Certificate of Liability Insurance" },
  ],
};
