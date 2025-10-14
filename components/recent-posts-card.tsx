"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/posts";

type RecentPostsCardProps = {
  posts: BlogPost[];
};

export function RecentPostsCard({ posts }: RecentPostsCardProps) {
  return (
    <Card
      id="blog"
      className="md:col-span-2 lg:col-span-3 p-6 pb-8 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-card-foreground font-sans">
          Recent Posts
        </h3>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <div className="space-y-2 pb-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block cursor-pointer group"
          >
            <div className="flex items-start gap-4 p-2">
              {/* Thumbnail */}
              <div className="w-24 h-24 relative bg-muted flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold font-sans mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h4>
                {post.introduction && (
                  <p className="text-sm text-muted-foreground mb-2 font-sans line-clamp-2">
                    {post.introduction}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-sans">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs font-sans rounded-full ml-2"
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
