import Link from "next/link";
import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ImageGallery from "@/components/ui/image-gallery";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";

function getProjectImagePaths(slug: string): string[] {
  const baseDir = path.join(process.cwd(), "public", "project-img");
  const paths: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const filename = `${slug}-img-${i}.png`;
    const fullPath = path.join(baseDir, filename);
    if (fs.existsSync(fullPath)) {
      paths.push(`/project-img/${filename}`);
    }
  }
  return paths;
}
import {
  ArrowLeft,
  Globe,
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

  const projectImages = getProjectImagePaths(slug);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-6">
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
          {/* 텍스트 영역 + 버튼 같은 줄 오른쪽 */}
          <div className="px-4 md:px-6 pt-5 pb-4 flex flex-row items-start gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                {/* <Badge variant="outline" className="text-xs font-medium px-2 py-0.5 rounded-md">
                  {project.year}
                </Badge> */}
              </div>
              <div className="flex flex-nowrap items-baseline gap-2 text-sm">
                <h1 className="text-xl md:text-xl font-bold text-foreground tracking-tight shrink-0">
                  {project.title}
                </h1>
                <span className="text-muted-foreground truncate min-w-0 ml-2">
                  {project.description}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-md bg-foreground text-background hover:opacity-80 transition-opacity"
                title="사이트 방문하기"
              >
                <Globe className="size-5" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                  title="GitHub"
                >
                  <Github className="size-5" />
                </a>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="border-t border-border">
            <ImageGallery
              images={projectImages.length > 0 ? projectImages : undefined}
              className="py-6"
              galleryHeight="h-[280px]"
            />
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* About */}
          <Card className="overflow-hidden border border-border bg-card rounded-lg">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-bold text-lg flex items-center gap-2">
                소개
              </h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </Card>

          {/* Features */}
          <Card className="overflow-hidden border border-border bg-card rounded-lg">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                주요 기능
              </h2>
            </div>
            <div className="p-4">
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
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Layers className="w-4 h-4" />
              기술 스택
            </h2>
          </div>
          <div className="p-4">
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
      </div>
    </div>
  );
}
