import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Sparkles,
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
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Projects
        </Link>

        {/* Header Card */}
        <Card className="overflow-hidden border border-white/30 dark:border-white/5 bg-white/40 dark:bg-[#1C1C1E]/70 rounded-3xl backdrop-blur-2xl mb-8 shadow-xl">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 dark:from-primary/30 dark:via-purple-500/30 dark:to-pink-500/30 p-8 md:p-12 flex flex-col items-center justify-center text-center border-b border-white/10">
            <span className="text-8xl md:text-9xl mb-6 drop-shadow-2xl animate-bounce">
              {project.emoji}
            </span>
            <Badge className="bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xl mb-4">
              {project.year}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex flex-wrap items-center justify-center gap-3 bg-white/20 dark:bg-black/20">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4" />
              사이트 방문하기
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground font-bold rounded-full transition-all"
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
          <Card className="overflow-hidden border border-white/30 dark:border-white/5 bg-white/30 dark:bg-[#1C1C1E]/60 rounded-2xl backdrop-blur-2xl">
            <div className="p-5 border-b border-white/10 bg-white/20 dark:bg-white/5">
              <h2 className="font-black text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                소개
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground/80 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </Card>

          {/* Features */}
          <Card className="overflow-hidden border border-white/30 dark:border-white/5 bg-white/30 dark:bg-[#1C1C1E]/60 rounded-2xl backdrop-blur-2xl">
            <div className="p-5 border-b border-white/10 bg-white/20 dark:bg-white/5">
              <h2 className="font-black text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                주요 기능
              </h2>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-muted-foreground/80"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
        <Card className="overflow-hidden border border-white/30 dark:border-white/5 bg-white/30 dark:bg-[#1C1C1E]/60 rounded-2xl backdrop-blur-2xl mt-6">
          <div className="p-5 border-b border-white/10 bg-white/20 dark:bg-white/5">
            <h2 className="font-black text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              기술 스택
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.techStack.map((stack) => (
                <div key={stack.category}>
                  <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider mb-2">
                    {stack.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="text-[10px] font-medium bg-white/30 dark:bg-white/10 border-white/20 rounded-full px-2"
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
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground/50 mr-2">
            Tags:
          </span>
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-white/20 dark:bg-white/5 border-white/20 rounded-full"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
