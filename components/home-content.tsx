"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroSection, {
  IntroTabContent,
  CareerTabContent,
  ContactTabContent,
} from "@/components/hero-section";
import ProjectGallerySection from "@/components/project-gallery-section";
import RecentPostsCard from "@/components/recent-posts-card";
import { Project } from "@/lib/projects";
import { BlogPostMetadata } from "@/lib/posts";

interface HomeContentProps {
  recentPosts: BlogPostMetadata[];
  projects: Project[];
}

function RecentLogsSection({ posts }: { posts: BlogPostMetadata[] }) {
  return (
    <section className="space-y-5 relative z-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Recent Logs
        </h2>
        <Link href="/blog">
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 h-9">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <RecentPostsCard posts={posts} />
      </div>
    </section>
  );
}

export default function HomeContent({ recentPosts, projects }: HomeContentProps) {
  return (
    <HeroSection
      tabContent={{
        intro: (
          <>
            <IntroTabContent />
            <RecentLogsSection posts={recentPosts} />
          </>
        ),
        career: (
          <CareerTabContent />
        ),
        projects: (
          <ProjectGallerySection projects={projects} />
        ),
        contact: (
          <>
            <ContactTabContent />
          </>
        ),
      }}
    />
  );
}
