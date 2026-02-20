import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
} from "lucide-react";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Projects
        </Link>

        {/* Header Card */}
        <Card className="overflow-hidden border border-border bg-card rounded-lg mb-8">
          {/* Hero Section */}
          <div className="relative bg-secondary p-8 md:p-12 flex flex-col items-center justify-center text-center border-b border-border">
            <span className="text-8xl md:text-9xl mb-6">
              {project.emoji}
            </span>
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1 mb-4">
              {project.year}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-md hover:opacity-80 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              사이트 방문하기
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-md hover:bg-secondary/80 transition-colors border border-border"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* About */}
          <Card className="overflow-hidden border border-border bg-card rounded-lg">
            <div className="p-5 border-b border-border">
              <h2 className="font-bold text-lg flex items-center gap-2">
                소개
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </Card>

          {/* Features */}
          <Card className="overflow-hidden border border-border bg-card rounded-lg">
            <div className="p-5 border-b border-border">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                주요 기능
              </h2>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-6 h-6 rounded-md bg-secondary text-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-border">
                      {index + 1}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="overflow-hidden border border-border bg-card rounded-lg mt-6">
          <div className="p-5 border-b border-border">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Layers className="w-4 h-4" />
              기술 스택
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.techStack.map((stack) => (
                <div key={stack.category}>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {stack.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-[10px] font-medium rounded-md px-2"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground mr-2">
            Tags:
          </span>
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs rounded-md"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
