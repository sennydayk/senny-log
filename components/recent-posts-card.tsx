"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostMetadata } from "@/lib/posts";

type RecentPostsCardProps = {
  posts: BlogPostMetadata[];
};

export function RecentPostsCard({ posts }: RecentPostsCardProps) {
  return (
    <Card
      id="blog"
      className="h-full p-8 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 border-white/20 relative overflow-hidden group"
    >
       {/* Decorative Background Blob */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
          <h3 className="font-black text-2xl text-foreground">
            Recent Posts
          </h3>
        </div>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full hover:bg-white/40 dark:hover:bg-white/10 group"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      <div className="relative z-10 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group/item"
          >
            <div className="flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-black/20 hover:shadow-sm">
              {/* Thumbnail */}
              <div className="w-20 h-20 relative bg-muted flex-shrink-0 rounded-xl overflow-hidden shadow-inner">
                <Image
                  src={post.thumbnail || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover/item:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-1">
                <h4 className="font-bold text-lg mb-1 text-foreground group-hover/item:text-primary transition-colors line-clamp-1">
                  {post.title}
                </h4>
                {post.introduction && (
                  <p className="text-sm font-medium text-muted-foreground mb-2 line-clamp-1">
                    {post.introduction}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground/80">
                  <div className="flex items-center gap-1">
                     <Calendar className="w-3 h-3" />
                     <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })}
                     </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0.5 text-[10px] bg-white/50 dark:bg-white/10 backdrop-blur-sm"
                  >
                    {post.category}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
