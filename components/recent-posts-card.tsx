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
           <div className="col-span-3 p-8 text-center font-mono text-muted-foreground bg-white/50 rounded-xl border-2 border-dashed border-border/30">
              No posts yet... ✨
           </div>
        ) : (
           posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="h-full overflow-hidden border-2 border-border/50 hover:border-primary bg-white hover:shadow-[4px_4px_0px_#D4B2FF] transition-all duration-300 rounded-xl group-hover:-translate-y-1">
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                    <Badge className="bg-white/90 text-foreground text-[10px] font-bold px-2 py-0.5 border border-border/20 shadow-sm backdrop-blur-sm">
                        {post.category}
                    </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                    })}
                </span>
                
                <h4 className="font-bold text-base leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                
                {post.introduction && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
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
