"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/80 to-purple-500 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                PROJECTS
              </h1>
              <p className="text-xs text-muted-foreground/60 font-medium">
                사이드 프로젝트 & 토이 프로젝트 모음
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-6">
          <Badge
            variant="secondary"
            className="bg-white/30 dark:bg-white/5 text-primary/80 border border-white/10 px-3 py-1 rounded-full backdrop-blur-xl"
          >
            <Sparkles className="w-3 h-3 mr-1.5" />
            {projects.length} projects
          </Badge>
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <Card className="overflow-hidden border border-white/30 dark:border-white/5 bg-white/30 dark:bg-[#1C1C1E]/60 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 hover:border-primary/30 hover:shadow-xl transition-all duration-300 rounded-2xl group-hover:-translate-y-1 backdrop-blur-2xl">
                <div className="flex flex-col md:flex-row">
                  {/* Emoji Thumbnail */}
                  <div className="w-full md:w-40 h-32 md:h-40 relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 dark:from-primary/20 dark:via-purple-500/20 dark:to-pink-500/20 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                    <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">
                      {project.emoji}
                    </span>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xl">
                        {project.year}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                      </h2>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.url, "_blank", "noopener,noreferrer");
                        }}
                        className="shrink-0 w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center text-primary transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] font-medium bg-white/20 dark:bg-white/5 border-white/20 rounded-full px-2.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-xs font-bold text-primary/70 group-hover:text-primary transition-colors">
                      자세히 보기
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="border border-dashed border-white/20 p-16 text-center bg-white/10 dark:bg-[#1C1C1E]/40 rounded-2xl backdrop-blur-2xl">
            <Zap className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />
            <p className="font-bold text-muted-foreground/60">
              아직 프로젝트가 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
