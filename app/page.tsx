import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentPostsCard from "@/components/recent-posts-card";
import HeroSection from "@/components/hero-section";
import { ArrowRight } from "lucide-react";
import { getRecentPostsMetadata } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPostsMetadata(3);

  return (
    <div className="min-h-full px-4 md:px-8 pb-8 md:pb-12 flex flex-col gap-8 max-w-5xl mx-auto relative">

      {/* Hero Section with Tab Navigation */}
      <HeroSection />

      {/* Recent Logs Section */}
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
          <RecentPostsCard posts={recentPosts} />
        </div>
      </section>

    </div>
  );
}
