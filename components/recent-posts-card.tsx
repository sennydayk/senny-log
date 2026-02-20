"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
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
           <div className="col-span-3 p-8 text-center text-muted-foreground bg-secondary rounded-lg border border-dashed border-border">
              No posts yet...
           </div>
        ) : (
           posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="h-full overflow-hidden border border-border bg-card hover:bg-secondary/50 transition-all duration-200 rounded-lg group-hover:-translate-y-0.5">
              {/* Thumbnail */}
              <div className="relative aspect-16/10 bg-secondary overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5 bg-background border border-border rounded-md">
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
                
                <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-2 group-hover:text-muted-foreground transition-colors">
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
