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

export default function RecentPostsCard({ posts = [] }: RecentPostsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.length === 0 ? (
           <div className="col-span-3 p-8 text-center font-mono text-muted-foreground bg-white/20 dark:bg-[#1C1C1E]/50 rounded-[1.5rem] border border-dashed border-white/20 backdrop-blur-2xl">
              No posts yet... ✨
           </div>
        ) : (
           posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="h-full overflow-hidden border border-white/30 dark:border-white/5 hover:border-white/50 bg-white/30 dark:bg-[#1C1C1E]/60 hover:shadow-glass transition-all duration-300 rounded-[1.5rem] group-hover:-translate-y-1 backdrop-blur-2xl">
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-muted/30 overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <Badge className="bg-white/50 dark:bg-black/50 text-foreground/90 text-[10px] font-bold px-2.5 py-0.5 border border-white/20 dark:border-white/5 shadow-sm backdrop-blur-xl rounded-full">
                        {post.category}
                    </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <span className="text-[10px] font-mono text-muted-foreground/80 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                    })}
                </span>
                
                <h4 className="font-bold text-base leading-tight text-foreground/90 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                
                {post.introduction && (
                  <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                    {post.introduction}
                  </p>
                )}
              </div>
            </Card>
          </Link>
        )))}
    </div>
  );
}
