"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { BlogPostMetadata } from "@/lib/posts";

type BlogListProps = {
  posts: BlogPostMetadata[];
  categories: string[];
};

export function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Fixed Left Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 p-6 border-r border-border bg-background">
          <div className="flex flex-col h-full">
            {/* Profile Section */}
            <div className="mb-8">
              <div className="mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 mx-auto">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-xl font-bold text-card-foreground font-sans text-center">
                  sennylog
                </h1>
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 font-sans">
                Categories
              </h2>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-sans text-sm cursor-pointer ${
                    selectedCategory === null
                      ? "text-primary dark:text-primary font-semibold"
                      : "text-card-foreground hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => {
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-sans text-sm cursor-pointer ${
                        selectedCategory === category
                          ? "text-primary dark:text-primary font-semibold"
                          : "text-card-foreground hover:text-primary dark:hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1">
          {/* Fixed Category Header */}
          <div className="sticky top-0 z-10 bg-background">
            <div className="max-w-4xl mx-auto px-8 py-6">
              <h1 className="text-3xl font-bold text-card-foreground font-sans flex items-end gap-2">
                <span>{selectedCategory || "All"}</span>
                <span className="w-3 h-3 rounded-full bg-[#b8a0d9] flex-shrink-0 mb-1.5" />
              </h1>
            </div>
          </div>

          {/* Posts List */}
          <div className="max-w-4xl mx-auto px-8 py-8">
            <div className="space-y-10">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <Card className="overflow-hidden bg-card border-0 rounded-md shadow-none">
                    <div className="flex h-52">
                      {/* Thumbnail - 1/3 width */}
                      <div className="w-1/3 relative bg-muted flex-shrink-0 rounded-l-md overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>

                      {/* Content - 2/3 width */}
                      <div className="flex-1 p-6 flex flex-col justify-center">
                        <div className="mb-2">
                          <Badge
                            variant="secondary"
                            className="text-xs font-sans mb-2"
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <h2 className="text-lg font-semibold text-card-foreground font-sans mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.introduction && (
                          <p className="text-sm text-muted-foreground font-sans mb-3">
                            {post.introduction}
                          </p>
                        )}
                        <div className="mt-auto">
                          <span className="text-xs text-muted-foreground font-sans">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
