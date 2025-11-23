"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Terminal } from "lucide-react";
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
      className="md:col-span-2 lg:col-span-3 p-0 bg-background border-2 border-black dark:border-white relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#ffffff] group/card hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all duration-200"
    >
      <div className="flex items-center justify-between p-6 border-b-2 border-black dark:border-white bg-primary">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-black" />
          <h3 className="font-black text-black font-display text-xl tracking-tight">
            RECENT_LOGS
          </h3>
        </div>
        <Link href="/blog">
          <Button
            variant="outline"
            size="sm"
            className="font-mono font-bold text-xs border-black hover:bg-black hover:text-white transition-colors uppercase"
          >
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
      <div className="divide-y-2 divide-black dark:divide-white bg-background">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block cursor-pointer group hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start gap-6 p-6">
              {/* Index Number */}
              <div className="hidden md:block font-display text-4xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="rounded-none border-black dark:border-white text-[10px]"
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <h4 className="font-bold font-display text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                {post.introduction && (
                  <p className="text-sm font-mono text-muted-foreground line-clamp-2">
                    {`> ${post.introduction}`}
                  </p>
                )}
              </div>

               {/* Thumbnail (Desktop Only) */}
              <div className="hidden sm:block w-32 h-24 relative border-2 border-black dark:border-white grayscale group-hover:grayscale-0 transition-all">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
