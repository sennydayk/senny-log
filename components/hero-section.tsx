"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Github, 
  Globe, 
  Code2,
  Figma,
  GitBranch,
  BookOpen,
} from "lucide-react";
import ContactBalls from "./contact-balls";
import { FlipText } from "./ui/flip-links";

type TabId = "intro" | "projects" | "career" | "contact";

interface TabItem {
  id: TabId;
  label: string;
}

const tabs: TabItem[] = [
  { id: "intro", label: "Intro" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface HeroSectionProps {
  tabContent: Record<TabId, ReactNode>;
}

/* ── Tab Navigation ── */
function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <header className="relative z-10 pt-6 space-y-6 min-w-0">
      <nav className="min-w-0">
        <div className="flex items-center gap-0 sm:gap-1 border-b border-border min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-2 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm font-medium transition-colors whitespace-nowrap relative shrink-0
                ${activeTab === tab.id
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="ml-auto shrink-0 flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-md border border-transparent hover:bg-secondary sm:border-0 sm:bg-transparent"
            aria-label="View Blog"
          >
            <BookOpen className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline text-sm font-medium">View Blog</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

/* ── Profile Card ── */
function ProfileCard() {
  return (
    <div className="w-full sm:w-[260px] shrink-0">
      <div className="h-full bg-card border border-border rounded-lg overflow-hidden">
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
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-background border border-border rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-foreground">Online</span>
          </div>
        </div>
        <div className="p-5 text-center space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Seyeon Kim</h3>
            <p className="text-xs text-muted-foreground font-medium">Frontend Developer</p>
          </div>
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
  );
}

/* ── Content Card (왼쪽 큰 카드) ── */
function ContentCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0 bg-secondary border border-border rounded-lg relative overflow-hidden transition-colors duration-300">
      <div className="relative z-10 p-8 md:p-8 flex flex-col justify-center h-full">
        <div className="max-w-lg">
          <div className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-md mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Intro Tab Content ── */
const skills = [
  { name: "React", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Next.js", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "TypeScript", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Tailwind", icon: <Code2 className="w-3.5 h-3.5" /> },
  { name: "Figma", icon: <Figma className="w-3.5 h-3.5" /> },
  { name: "Git", icon: <GitBranch className="w-3.5 h-3.5" /> },
];

export function IntroTabContent() {
  return (
    <section className="flex flex-col sm:flex-row gap-6 relative z-10">
      <ProfileCard />
      <ContentCard label="Intro">
        <ul className="list-disc list-inside space-y-1.5 text-xs md:text-sm text-muted-foreground leading-relaxed">
        <li>작은 디테일이 만드는 완성도를 추구합니다.</li>
          <li>구조와 사용성을 기반으로 문제를 해결하는 UI를 만듭니다.</li>
          <li>읽기 쉬운 코드와 예측 가능한 동작을 통해, 안정적으로 확장되는 인터페이스를 지향합니다.</li>
        </ul>
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
          <p className="text-xs text-muted-foreground mt-3">1+ years · Frontend Developer</p>
        </div>
      </ContentCard>
    </section>
  );
}

/* ── Career Tab Content ── */
interface CareerEntry {
  period: string;
  title: string;
  company: string;
  description: string;
  current: boolean;
}

const careerHistory: CareerEntry[] = [
  {
    period: "2026.02 — Present",
    title: "Frontend Developer",
    company: "Gluwa",
    description: "React, Next.js 기반 웹 서비스 개발 및 유지보수",
    current: true,
  },
  {
    period: "2025.07 — 2026.01",
    title: "Frontend Developer",
    company: "Rusheight",
    description: "사내 어드민 대시보드 및 게임 웹사이트 개발",
    current: false,
  },
  {
    period: "2025.03 — 2025.05",
    title: "Intern · Marketing Data Analyst",
    company: "GoldenPlanet",
    description: "마케팅 데이터 기획 및 분석 참여",
    current: false,
  },
];

function CareerEntryRow({ entry }: { entry: CareerEntry }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative grid grid-cols-[auto_1fr] gap-4 pb-8 last:pb-0 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex flex-col items-center pt-1">
        <div
          className={`
            w-[11px] h-[11px] rounded-full shrink-0 z-10 ring-3 ring-secondary transition-all
            ${entry.current
              ? "bg-foreground shadow-[0_0_10px_rgba(var(--foreground-rgb,0,0,0),0.3)]"
              : "bg-muted-foreground/20 group-hover:bg-muted-foreground/40"
            }
          `}
        />
      </div>

      <div className="flex-1 min-w-0 pb-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono text-muted-foreground tracking-wide">
            {entry.period}
          </span>
          {entry.current && (
            <span className="text-[9px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              Current
            </span>
          )}
        </div>
        <h3 className="text-sm md:text-base font-bold text-foreground leading-tight mb-0.5">
          <FlipText className="text-foreground" hovered={hovered}>
            {entry.title}
          </FlipText>
        </h3>
        <p className="text-xs font-medium text-muted-foreground mb-1.5">
          <FlipText
            className="text-muted-foreground text-xs font-medium"
            hovered={hovered}
          >
            {entry.company}
          </FlipText>
        </p>
        <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-xl">
          <FlipText
            className="text-muted-foreground/80 text-xs leading-relaxed"
            hovered={hovered}
            wrap
          >
            {entry.description}
          </FlipText>
        </p>
      </div>
    </div>
  );
}

export function CareerTabContent() {
  return (
    <section className="relative z-10">
      <div className="bg-secondary border border-border rounded-lg overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-md mb-8">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Career Timeline
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-foreground via-border to-transparent" />

            {careerHistory.map((entry) => (
              <CareerEntryRow key={entry.period} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact Tab Content ── */
export function ContactTabContent() {
  return (
    <section className="relative z-10 cursor-pointer">
      <div className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-md mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Reach Out
        </span>
      </div>
      <ContactBalls />
    </section>
  );
}

/* ── Main HeroSection ── */
export default function HeroSection({ tabContent }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>("intro");

  return (
    <>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {tabContent[activeTab]}
    </>
  );
}

export type { TabId };
