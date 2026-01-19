import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentPostsCard from "@/components/recent-posts-card";
import HeroSection from "@/components/hero-section";
import { ArrowRight, Sparkles } from "lucide-react";
import { getRecentPostsMetadata } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPostsMetadata(3);

  return (
    <div className="min-h-full px-4 md:px-8 pb-8 md:pb-12 flex flex-col gap-8 max-w-6xl mx-auto relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] opacity-40 pointer-events-none animate-float mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px] opacity-40 pointer-events-none animate-float mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: "2s" }}></div>

      {/* Hero Section with Tab Navigation */}
      <HeroSection />

      {/* Recent Logs Section */}
      <section className="space-y-5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Recent Logs
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/30 rounded-full px-4 h-9">
              View All <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="w-full">
          <RecentPostsCard posts={recentPosts} />
        </div>
      </section>

    </div>
  );
}
