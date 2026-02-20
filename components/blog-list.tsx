"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FolderOpen, ArrowLeft, ChevronRight, ArrowRight, Search, FolderOpen as FolderIcon } from "lucide-react";
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
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Sidebar */}
      <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-border bg-background flex flex-col h-auto md:h-screen sticky top-0 z-40 shrink-0">
        {/* Header */}
        <div className="p-5 border-b border-border">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            
            <h1 className="font-bold text-lg tracking-tight text-foreground">Senny.log</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
            
            {/* Search */}
            <div className="bg-secondary p-2.5 flex items-center gap-2 rounded-md border border-border">
                <Search className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-transparent border-none outline-none text-xs font-medium placeholder:text-muted-foreground"
                />
            </div>

            <div>
                <h2 className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <FolderOpen className="w-3.5 h-3.5" /> Categories
                </h2>
                <div className="space-y-0.5">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors text-xs font-medium cursor-pointer flex items-center gap-2 ${
                            selectedCategory === null
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === null ? 'bg-background' : 'bg-muted-foreground/30'}`}></div>
                        All Posts
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors text-xs font-medium cursor-pointer flex items-center gap-2 ${
                                selectedCategory === category
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                        >
                             <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === category ? 'rotate-90' : 'opacity-30'}`} />
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Footer Status */}
        <div className="p-3 border-t border-border text-[10px] font-medium text-muted-foreground flex justify-between items-center">
            <span>&copy; Senny</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:h-screen overflow-y-auto relative z-0 bg-transparent pb-20 md:pb-0 scrollbar-hide">
        <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full flex flex-col">
            
            {/* Header */}
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4 sticky top-0 bg-background z-10 pt-4 px-4 -mx-4">
                <div>
                    <div className="text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                        Current Directory
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                        {selectedCategory || "All Logs"}
                    </h1>
                </div>
                <Badge variant="secondary" className="font-mono text-xs px-2.5 py-0.5">
                    {filteredPosts.length} posts
                </Badge>
            </div>

            {/* Posts Grid - Compact List */}
            <div className="space-y-3 pb-10">
              {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <Card className="overflow-hidden border border-border bg-card hover:bg-secondary/50 rounded-lg group-hover:-translate-y-0.5 transition-all duration-200">
                        <div className="flex h-28 md:h-32">
                          {/* Thumbnail - Compact */}
                          <div className="w-28 md:w-40 relative bg-secondary border-r border-border overflow-hidden shrink-0">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-3 md:p-4 flex flex-col justify-center relative">
                            
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-md text-[9px] font-medium px-2 py-0"
                                    >
                                        {post.category}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                            </div>
                            
                            <h2 className="text-base md:text-lg font-bold text-foreground leading-tight mb-1.5 group-hover:text-muted-foreground transition-colors line-clamp-1">
                                {post.title}
                            </h2>
                            
                            {post.introduction && (
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                                    {post.introduction}
                                </p>
                            )}

                            <div className="flex gap-1 mt-auto">
                                {post.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-md border border-border">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                          </div>
                          
                          {/* Arrow Action */}
                          <div className="w-10 flex items-center justify-center border-l border-border text-muted-foreground/30 group-hover:text-foreground transition-colors">
                             <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
              ) : (
                  <div className="border border-dashed border-border p-10 text-center bg-secondary rounded-lg">
                      <FolderIcon className="w-10 h-10 mx-auto mb-2 text-muted-foreground/30" />
                      <p className="font-medium text-sm text-muted-foreground">Nothing found here...</p>
                  </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}
