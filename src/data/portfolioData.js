export const personalInfo = {
  name: "Akash V",
  role: "Software Engineer",
  tagline: "Full-Stack Engineer & Quality Specialist — building scalable software across the full development lifecycle.",
  email: "vuppallaakash@gmail.com",
  github: "https://github.com/Akash0438",
  linkedin: "https://linkedin.com/in/akash-vuppala",
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
};

export const aboutText = [
  "Software Engineer with 2+ years of hands-on experience across the full development lifecycle — combining full-stack engineering (ReactJS, Spring Boot, Java) with automation, SQL Server data validation, and CI/CD pipeline expertise.",
  "Built automation tooling and Python/PowerShell scripts that reduced manual engineering effort by ~40%, integrating with Jenkins and GitLab pipelines. ISTQB Certified Foundation Level.",
  "I thrive in Agile teams, collaborating with engineers, architects, and business analysts to design, build, test, and deploy reliable, scalable software.",
];

export const skills = [
  { category: "Frontend", items: ["ReactJS", "TypeScript", "JavaScript", "HTML/CSS", "Next.js"] },
  { category: "Backend", items: ["Java", "Spring Boot", "Python", "REST API", "SOAP API", "Apache Kafka"] },
  { category: "Databases", items: ["SQL Server", "MySQL", "MongoDB", "Redis", "Elasticsearch"] },
  { category: "CI/CD & DevOps", items: ["Jenkins", "GitLab", "Git", "Docker", "PowerShell"] },
  { category: "Testing & Automation", items: ["Selenium", "Karate", "JUnit", "RPA", "Python Scripting"] },
  { category: "Tools & Cloud", items: ["Jira", "Confluence", "Kibana", "Power BI", "Azure", "IBM Cloud"] },
];

export const experience = [
  {
    id: 1,
    role: "Quality Assurance Engineer (Lead Responsibilities)",
    company: "IBM",
    period: "Feb 2024 – Present",
    description:
      "Collaborated within feature teams across the full SDLC — requirements, design, coding, testing, deployment, and operations — for enterprise and SaaS platforms. Built automation frameworks (Selenium, Java) integrated into Jenkins & GitLab CI/CD pipelines, reducing manual engineering effort by ~40%. Designed REST/SOAP validation tooling using Karate across distributed microservices. Automated operational workflows with Python & PowerShell. Executed advanced SQL Server & MySQL queries for data validation and root-cause analysis. Mentored junior engineers on automation best practices.",
    tech: ["Java", "Selenium", "Karate", "Python", "PowerShell", "Jenkins", "GitLab", "SQL Server", "Jira"],
  },
  {
    id: 2,
    role: "Software Developer Intern",
    company: "Engati Technologies",
    period: "Jan 2023 – Sep 2023",
    description:
      "Built full-stack features using ReactJS (front end) and Spring Boot/Java (back end) for an enterprise chatbot platform. Developed and unit-tested RESTful web services with JUnit; integrated third-party APIs (Facebook, WhatsApp, Instagram, Slack). Worked within Jenkins CI/CD pipelines for build validation and code quality analysis. Used SQL and MongoDB for data modelling and backend performance tuning.",
    tech: ["ReactJS", "Spring Boot", "Java", "JUnit", "REST API", "MongoDB", "SQL", "Jenkins"],
  },
];

export const certifications = [
  {
    id: 1,
    title: "ISTQB Certified Tester – Foundation Level",
    issuer: "ISTQB International",
    shortCode: "CTFL",
    description: "Internationally recognised certification in software testing fundamentals, test design techniques, and quality assurance.",
    color: "#a78bfa",
    icon: "🏅",
  },
  {
    id: 2,
    title: "IBM Cloud Advocate",
    issuer: "IBM",
    shortCode: "V2",
    description: "Certified cloud advocate demonstrating expertise in IBM Cloud services, architecture, and deployment strategies.",
    color: "#38bdf8",
    icon: "☁️",
  },
  {
    id: 3,
    title: "Azure Data Fundamentals",
    issuer: "Microsoft",
    shortCode: "AZ-900",
    description: "Microsoft certified in core data concepts, Azure data services, and relational/non-relational workloads.",
    color: "#34d399",
    icon: "⚡",
  },
];

export const accolades = [
  {
    id: 1,
    title: "B.Tech — CS (AI & ML)",
    issuer: "SRM University, Chennai",
    period: "Jun 2019 – May 2023",
    description: "Bachelor of Technology in Computer Science with specialisation in Artificial Intelligence & Machine Learning.",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Full-Stack & Quality Engineering",
    issuer: "2+ Years Industry Experience",
    period: "2023 – Present",
    description: "Hands-on experience across the full SDLC at IBM and Engati Technologies, spanning full-stack dev, automation, CI/CD, and API validation.",
    icon: "💼",
  },
  {
    id: 3,
    title: "Automation Impact",
    issuer: "IBM",
    period: "2024",
    description: "Built Python/PowerShell automation tooling and Selenium frameworks that reduced manual engineering effort by ~40% across enterprise pipelines.",
    icon: "🚀",
  },
  {
    id: 4,
    title: "ISTQB Certified",
    issuer: "ISTQB Foundation Level",
    period: "2023",
    description: "Achieved internationally recognised software quality certification, reinforcing expertise in structured testing and QA methodology.",
    icon: "🏅",
  },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Microservices Platform",
    description: "Designed event-driven microservices integration scenarios, building and validating Kafka message flows and Apache Solr search functionality across distributed services.",
    tech: ["Java", "Spring Boot", "Apache Kafka", "Apache Solr", "ReactJS"],
    github: "https://github.com/Akash0438",
    live: "#",
    color: "#7c3aed",
  },
  {
    id: 2,
    title: "Duplicate Question Detection — NLP/ML",
    description: "Built data-driven evaluation pipelines to validate ML model output accuracy for duplicate question detection using NLP techniques.",
    tech: ["Python", "NLP", "Machine Learning", "Scikit-learn"],
    github: "https://github.com/Akash0438",
    live: "#",
    color: "#a855f7",
  },
  {
    id: 3,
    title: "CI/CD Automation Framework",
    description: "Built and maintained Selenium + Java automation frameworks integrated into Jenkins and GitLab pipelines, reducing manual QA effort by ~40% across enterprise SaaS platforms.",
    tech: ["Java", "Selenium", "Jenkins", "GitLab", "Python"],
    github: "https://github.com/Akash0438",
    live: "#",
    color: "#06b6d4",
  },
  {
    id: 4,
    title: "API Validation Tooling (Karate)",
    description: "Designed and developed REST and SOAP service validation tooling using Karate, verifying API contracts and integration stability across distributed microservices.",
    tech: ["Karate", "REST API", "SOAP", "Java", "Microservices"],
    github: "https://github.com/Akash0438",
    live: "#",
    color: "#ec4899",
  },
];
