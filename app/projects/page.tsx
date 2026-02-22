"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              사이드 프로젝트 & 토이 프로젝트 모음
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-6">
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {projects.length} projects
          </Badge>
        </div>

        {/* Project Cards - 2열 그리드, 반응형 1열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group h-full"
            >
              <Card className="h-full overflow-hidden border border-border bg-card hover:bg-secondary/50 transition-all duration-200 rounded-lg group-hover:-translate-y-0.5 flex flex-col">
                {/* Emoji Thumbnail - 상단 직사각형 영역 */}
                <div className="w-full aspect-16/10 min-h-[140px] relative bg-secondary flex items-center justify-center border-b border-border shrink-0">
                  <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.emoji}
                  </span>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                      {project.year}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.url, "_blank", "noopener,noreferrer");
                    }}
                    className="absolute top-3 right-3 shrink-0 w-8 h-8 rounded-md border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-5 flex flex-col min-h-0">
                  <h2 className="text-lg md:text-xl font-bold text-foreground group-hover:text-muted-foreground transition-colors leading-tight mb-2">
                    {project.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] font-medium rounded-md px-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                    자세히 보기
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="border border-dashed border-border p-16 text-center bg-secondary rounded-lg">
            <p className="font-medium text-muted-foreground">
              아직 프로젝트가 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
