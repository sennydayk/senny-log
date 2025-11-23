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
    <Card
      id="blog"
      className="w-full p-0 bg-white border-2 border-black shadow-plastic rounded-xl overflow-hidden group hover:shadow-plastic-hover transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black bg-secondary">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
             <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-transparent border border-black"></div>
          </div>
          <h3 className="font-black text-lg tracking-tight font-mono uppercase">
            Recent_Posts_Log.txt
          </h3>
        </div>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="font-mono font-bold text-xs hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black h-8"
          >
            VIEW_ALL <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>

      {/* List */}
      <div className="divide-y-2 divide-black">
        {posts.length === 0 ? (
           <div className="p-8 text-center font-mono text-muted-foreground">
              NO_DATA_FOUND...
           </div>
        ) : (
           posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block hover:bg-accent/10 transition-colors group/item"
          >
            <div className="flex gap-4 p-4 items-start md:items-center">
              {/* Thumbnail */}
              <div className="w-20 h-20 md:w-32 md:h-24 relative border-2 border-black flex-shrink-0 bg-muted overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/item:translate-x-[1px] group-hover/item:translate-y-[1px] group-hover/item:shadow-none transition-all">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                    <Badge
                        variant="outline"
                        className="text-[10px] font-mono px-1.5 py-0 h-5 border-black bg-white rounded-none"
                    >
                        {post.category.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "2-digit"
                        })}
                    </span>
                </div>
                <h4 className="font-bold text-lg md:text-xl leading-tight font-sans truncate group-hover/item:text-primary transition-colors">
                  {post.title}
                </h4>
                {post.introduction && (
                  <p className="text-xs md:text-sm text-muted-foreground font-mono line-clamp-1 opacity-70">
                    {post.introduction}
                  </p>
                )}
              </div>
              
              <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 self-center hidden md:block text-primary" />
            </div>
          </Link>
        )))}
      </div>
    </Card>
  );
}
