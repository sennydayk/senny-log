"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sprout, 
  Github, 
  Globe, 
  Zap, 
  Heart, 
  Mail,
  Code2,
  Palette,
  Rocket
} from "lucide-react";

type TabId = "intro" | "projects" | "about" | "contact";

interface TabItem {
  id: TabId;
  label: string;
  href: string;
}

const tabs: TabItem[] = [
  { id: "intro", label: "Intro", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

interface TabContent {
  title: React.ReactNode;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  decorativeColor: string;
}

const tabContents: Record<TabId, TabContent> = {
  intro: {
    title: (
      <>
        Hello, I'm{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Senny
        </span>
        .
      </>
    ),
    description: "Welcome to my digital garden. I craft lovely interfaces and collect precious memories on the web.",
    icon: <Sprout className="w-5 h-5 text-green-500" />,
    gradient: "from-accent/20 to-accent/5 dark:from-accent/10 dark:to-transparent",
    decorativeColor: "accent",
  },
  projects: {
    title: (
      <>
        My{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
          Projects
        </span>
      </>
    ),
    description: "A collection of side projects and experiments. From web apps to creative coding, explore what I've been building.",
    icon: <Rocket className="w-5 h-5 text-orange-500" />,
    gradient: "from-yellow-500/20 to-orange-500/5 dark:from-yellow-500/10 dark:to-transparent",
    decorativeColor: "yellow-500",
  },
  about: {
    title: (
      <>
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">
          Me
        </span>
      </>
    ),
    description: "Frontend developer passionate about creating beautiful, user-friendly interfaces. I believe in clean code and thoughtful design.",
    icon: <Heart className="w-5 h-5 text-violet-500" />,
    gradient: "from-violet-500/20 to-purple-500/5 dark:from-violet-500/10 dark:to-transparent",
    decorativeColor: "violet-500",
  },
  contact: {
    title: (
      <>
        Get in{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
          Touch
        </span>
      </>
    ),
    description: "Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new opportunities and collaborations.",
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    gradient: "from-blue-500/20 to-cyan-500/5 dark:from-blue-500/10 dark:to-transparent",
    decorativeColor: "blue-500",
  },
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<TabId>("intro");
  const currentContent = tabContents[activeTab];
  const currentTabInfo = tabs.find((t) => t.id === activeTab);

  return (
    <>
      {/* Header with Tab Navigation */}
      <header className="relative z-10 pt-6 space-y-6">
        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Blog
        </h1>

        {/* Tab Navigation - Responsive */}
        <nav className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-1 p-1.5 bg-white/30 dark:bg-[#1C1C1E]/40 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/10 shadow-glass overflow-x-auto scrollbar-hide md:w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0
                  ${activeTab === tab.id
                    ? "bg-white dark:bg-white/20 text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10"
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
        <div
          className={`flex-1 min-h-[420px] lg:min-h-[380px] bg-gradient-to-br ${currentContent.gradient} backdrop-blur-xl rounded-[2rem] border border-white/40 dark:border-white/10 shadow-glass relative overflow-hidden transition-all duration-500`}
        >
          {/* Decorative Elements - Intro 전용 */}
          {activeTab === "intro" && (
            <>
              <div className="absolute top-8 right-8 flex gap-3">
                <div className="w-16 h-6 bg-accent/40 rounded-full"></div>
                <div className="w-6 h-6 bg-primary/60 rounded-full"></div>
              </div>
              <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-accent/30 rounded-2xl rotate-12"></div>
              <div className="absolute bottom-8 right-20 w-24 h-24 border-2 border-primary/40 rounded-xl -rotate-6"></div>
              
              {/* 추가 장식 요소 - Intro에서만 */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-end">
                <div className="flex items-center gap-3">
                  <Code2 className="w-8 h-8 text-primary/40" />
                  <div className="w-24 h-3 bg-primary/20 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3">
                  <Palette className="w-6 h-6 text-secondary/40" />
                  <div className="w-16 h-3 bg-secondary/20 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-7 h-7 text-accent/40" />
                  <div className="w-20 h-3 bg-accent/20 rounded-full"></div>
                </div>
              </div>
            </>
          )}

          {/* Decorative Elements - 다른 탭용 */}
          {activeTab !== "intro" && (
            <>
              <div className="absolute top-8 right-8 flex gap-3 opacity-60">
                <div className={`w-16 h-6 bg-${currentContent.decorativeColor}/40 rounded-full`}></div>
                <div className={`w-6 h-6 bg-${currentContent.decorativeColor}/60 rounded-full`}></div>
              </div>
              <div className={`absolute bottom-12 right-12 w-28 h-28 border-2 border-${currentContent.decorativeColor}/20 rounded-2xl rotate-12`}></div>
            </>
          )}

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center h-full">
            <div className="max-w-lg">
              {/* Icon Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/30">
                {currentContent.icon}
                <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                  {currentTabInfo?.label}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-4">
                {currentContent.title}
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                {currentContent.description}
              </p>

              {/* CTA Button */}
              <Link
                href={currentTabInfo?.href || "/"}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 backdrop-blur-md rounded-full border border-white/40 dark:border-white/20 transition-all duration-300 group/link shadow-sm"
              >
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover/link:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
                <span className="font-semibold text-foreground">
                  {activeTab === "intro" ? "Explore Blog" : `View ${currentTabInfo?.label}`}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Card - Compact */}
        <div className="w-full lg:w-[280px] flex-shrink-0">
          <div className="h-full bg-white/30 dark:bg-[#1C1C1E]/60 backdrop-blur-xl rounded-[2rem] border border-white/40 dark:border-white/10 shadow-glass overflow-hidden">
            {/* Profile Image Area */}
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-xl opacity-50"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
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
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                <span className="text-xs font-semibold text-foreground/80">Online</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-5 text-center space-y-4">
              <div>
                <h3 className="text-xl font-black text-foreground tracking-tight">SENNY</h3>
                <p className="text-xs text-muted-foreground font-medium">Frontend Developer</p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {["React", "Next.js", "TS"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10 text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 text-foreground/60 hover:text-primary transition-all"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 text-foreground/60 hover:text-primary transition-all"
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
