"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Github, 
  Globe, 
  Mail,
  Code2,
  Figma,
  GitBranch,
  ExternalLink,
  Folder,
  Circle
} from "lucide-react";
import { getAllProjects } from "@/lib/projects";

type TabId = "intro" | "projects" | "career" | "contact";

interface TabItem {
  id: TabId;
  label: string;
  href: string;
}

const tabs: TabItem[] = [
  { id: "intro", label: "Intro", href: "/" },
  { id: "career", label: "Career", href: "#" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact", label: "Contact", href: "#" },
];

interface TabContent {
  description: string[];
}

const tabContents: Record<TabId, TabContent> = {
  intro: {
    description: [
      "구조와 사용성을 기반으로 문제를 해결하는 UI를 만듭니다.",
      "읽기 쉬운 코드와 예측 가능한 동작을 통해, 안정적으로 확장되는 인터페이스를 지향합니다.",
    ],
  },
  career: {
    description: [
      "Career Summary",
    ],
  },
  projects: {
    description: [
      "사이드 프로젝트 목록",
    ],
  },
  contact: {
    description: [
      "Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new opportunities and collaborations.",
    ],
  },
};

interface CareerEntry {
  period: string;
  title: string;
  company: string;
  description: string;
  current: boolean;
}

const careerHistory: CareerEntry[] = [
  {
    period: "2024.03 — Present",
    title: "Frontend Developer",
    company: "Company A",
    description: "React, Next.js 기반 웹 서비스 개발 및 유지보수",
    current: true,
  },
  {
    period: "2023.06 — 2024.02",
    title: "Frontend Developer",
    company: "Company B",
    description: "사내 어드민 대시보드 및 고객 대상 웹 애플리케이션 개발",
    current: false,
  },
  {
    period: "2022.09 — 2023.05",
    title: "Intern · Frontend",
    company: "Company C",
    description: "UI 컴포넌트 개발 및 디자인 시스템 구축 참여",
    current: false,
  },
];

const skills = [
  { name: "React", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Next.js", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "TypeScript", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Tailwind", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Figma", icon: <Figma className="w-3.5 h-3.5" /> },
  { name: "Git", icon: <GitBranch className="w-3.5 h-3.5" /> },
];

const contacts = [
  { label: "senny@email.com", icon: <Mail className="w-3.5 h-3.5" />, href: "mailto:senny@email.com" },
  { label: "github.com/senny", icon: <Github className="w-3.5 h-3.5" />, href: "https://github.com/senny" },
  { label: "senny.dev", icon: <Globe className="w-3.5 h-3.5" />, href: "https://senny.dev" },
];

/* ── Preview: Intro (Skills) ── */
function IntroPreview() {
  return (
    <div className="mt-6 mb-2">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Skills</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background border border-border rounded-md text-xs text-muted-foreground"
          >
            {skill.icon}
            {skill.name}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">2+ years · Frontend Developer</p>
    </div>
  );
}

/* ── Preview: Career (Timeline) ── */
function CareerPreview() {
  return (
    <div className="mt-6 mb-2">
      <div className="relative">
        {careerHistory.map((entry, index) => (
          <div key={entry.period} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${entry.current ? "bg-foreground" : "bg-muted-foreground/30"}`} />
              {index < careerHistory.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 -mt-0.5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono text-muted-foreground">{entry.period}</span>
                {entry.current && (
                  <span className="text-[9px] font-medium text-foreground bg-foreground/10 px-1.5 py-0.5 rounded">NOW</span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground leading-tight">
                {entry.title}
                <span className="text-muted-foreground font-normal"> · {entry.company}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Preview: Projects ── */
function ProjectsPreview() {
  const projects = getAllProjects();
  const displayProjects = projects.slice(0, 3);

  if (displayProjects.length === 0) return null;
  return (
    <div className="mt-6 mb-2">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Featured</p>
      <div className="flex gap-2">
        {displayProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="flex-1 p-3 bg-background border border-border rounded-md group/item hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Folder className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono">{project.year}</span>
            </div>
            <p className="text-xs font-medium text-foreground leading-tight line-clamp-1 group-hover/item:text-muted-foreground transition-colors">
              {project.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Preview: Contact ── */
function ContactPreview() {
  return (
    <div className="mt-6 mb-2">
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Reach out</p>
      <div className="space-y-0">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2 border-b border-border last:border-b-0 group/item"
          >
            <span className="text-muted-foreground">{contact.icon}</span>
            <span className="text-sm text-foreground group-hover/item:text-muted-foreground transition-colors">
              {contact.label}
            </span>
            <ExternalLink className="w-3 h-3 text-muted-foreground/40 ml-auto shrink-0 group-hover/item:text-muted-foreground transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<TabId>("intro");
  const currentContent = tabContents[activeTab];
  const currentTabInfo = tabs.find((t) => t.id === activeTab);

  const renderPreview = () => {
    switch (activeTab) {
      case "intro":
        return <IntroPreview />;
      case "career":
        return <CareerPreview />;
      case "projects":
        return <ProjectsPreview />;
      case "contact":
        return <ContactPreview />;
    }
  };

  return (
    <>
      {/* Header with Tab Navigation */}
      <header className="relative z-10 pt-6 space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Blog
        </h1>

        {/* Tab Navigation */}
        <nav>
          <div className="flex items-center gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap relative
                  ${activeTab === tab.id
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Featured Card - Large */}
        <div className="flex-1 bg-secondary border border-border rounded-lg relative overflow-hidden transition-colors duration-300">
          <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-md mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {currentTabInfo?.label}
                </span>
              </div>

              {activeTab !== "career" && (
                <ul className="list-disc list-inside space-y-1.5 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {currentContent.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Tab-specific Preview */}
              {renderPreview()}

              {/* CTA Button - only for projects */}
              {activeTab === "projects" && (
                <Link
                  href={currentTabInfo?.href || "/"}
                  className="inline-flex items-center gap-3 px-5 py-3 bg-foreground text-background rounded-md transition-opacity duration-200 hover:opacity-80 group/link mt-4"
                >
                  <span className="font-semibold text-sm">
                    View Projects
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card - Compact */}
        <div className="w-full lg:w-[260px] shrink-0">
          <div className="h-full bg-card border border-border rounded-lg overflow-hidden">
            {/* Profile Image Area */}
            <div className="relative h-44 bg-secondary overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
                    <Image
                      src="/profile.png"
                      alt="Profile"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-background border border-border rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-foreground">Online</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-5 text-center space-y-3">
              <div>
                <h3 className="text-lg font-bold text-foreground tracking-tight">SENNY</h3>
                <p className="text-xs text-muted-foreground font-medium">Frontend Developer</p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {["React", "Next.js", "TS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary border border-border text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-2 pt-1">
                <button
                  type="button"
                  className="h-8 w-8 rounded-md border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                >
                  <Github className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-md border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
