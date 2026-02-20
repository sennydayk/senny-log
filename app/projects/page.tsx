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
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
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

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <Card className="overflow-hidden border border-border bg-card hover:bg-secondary/50 transition-all duration-200 rounded-lg group-hover:-translate-y-0.5">
                <div className="flex flex-col md:flex-row">
                  {/* Emoji Thumbnail */}
                  <div className="w-full md:w-40 h-32 md:h-40 relative bg-secondary flex items-center justify-center border-b md:border-b-0 md:border-r border-border shrink-0">
                    <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-300">
                      {project.emoji}
                    </span>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                        {project.year}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-muted-foreground transition-colors leading-tight">
                        {project.title}
                      </h2>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.url, "_blank", "noopener,noreferrer");
                        }}
                        className="shrink-0 w-8 h-8 rounded-md border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
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

                    <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
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
