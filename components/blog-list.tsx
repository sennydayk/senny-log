"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FolderOpen, ArrowLeft, ChevronRight, Calendar, ArrowRight, Battery, Wifi, Search, Star, Heart, FolderHeart } from "lucide-react";
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
    <div className="min-h-screen bg-[#FDF0F6] text-foreground flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Sidebar - Compact & Cute */}
      <aside className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-border/50 bg-white/60 backdrop-blur-sm flex flex-col h-auto md:h-screen sticky top-0 z-40 shrink-0">
        {/* Header */}
        <div className="p-5 border-b-2 border-border/30">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary mb-4 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            
            <div className="flex items-center gap-3">
                 <div className="w-10 h-10 border border-border rounded-full overflow-hidden bg-white relative shadow-sm">
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                 </div>
                 <div>
                     <h1 className="font-black text-lg tracking-tight text-foreground">Senny.log</h1>
                     <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        Lovely Mode 💜
                     </span>
                 </div>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10">
            
            {/* Search - Rounded */}
            <div className="bg-white p-2 flex items-center gap-2 rounded-full border border-border/50 shadow-sm">
                <Search className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-transparent border-none outline-none text-xs font-medium placeholder:text-muted-foreground/70"
                />
            </div>

            <div>
                <h2 className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <FolderHeart className="w-3.5 h-3.5" /> Categories
                </h2>
                <div className="space-y-1">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer flex items-center gap-2 relative ${
                            selectedCategory === null
                            ? "bg-[#D4B2FF] text-white shadow-sm"
                            : "text-foreground/70 hover:bg-[#F3E5F5] hover:text-primary"
                        }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === null ? 'bg-white' : 'bg-border'}`}></div>
                        All Posts
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer flex items-center gap-2 relative ${
                                selectedCategory === category
                                ? "bg-[#D4B2FF] text-white shadow-sm"
                                : "text-foreground/70 hover:bg-[#F3E5F5] hover:text-primary"
                            }`}
                        >
                             <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === category ? 'rotate-90 text-white' : 'opacity-30'}`} />
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Footer Status */}
        <div className="p-3 border-t border-border/30 bg-white/50 text-[10px] font-medium text-muted-foreground flex justify-between items-center">
            <span>Senny OS v2.5</span>
            <div className="flex gap-1.5">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3 text-primary" />
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:h-screen overflow-y-auto relative z-0 bg-[#FDF0F6] pb-20 md:pb-0 scrollbar-hide">
        <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-full flex flex-col">
            
            {/* Header */}
            <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-border/20 pb-4 sticky top-0 bg-[#FDF0F6]/90 backdrop-blur-sm z-10 pt-4">
                <div>
                    <div className="text-[10px] font-bold text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wider">
                        <Star className="w-3 h-3 text-primary" />
                        Current Directory
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight" data-text={selectedCategory || "All Logs"}>
                        {selectedCategory || "All Logs"}
                    </h1>
                </div>
                <Badge variant="secondary" className="font-mono bg-white text-primary border border-primary/20 text-xs px-2 shadow-sm">
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
                      <Card className="overflow-hidden border border-border/40 bg-white hover:border-primary/50 hover:shadow-[0_4px_12px_rgba(212,178,255,0.2)] transition-all duration-300 rounded-xl group-hover:-translate-y-0.5">
                        <div className="flex h-28 md:h-32">
                          {/* Thumbnail - Compact */}
                          <div className="w-28 md:w-40 relative bg-muted border-r border-border/10 overflow-hidden shrink-0">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-3 md:p-4 flex flex-col justify-center relative">
                            
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-md text-[9px] font-bold px-1.5 py-0 bg-[#F3E5F5] text-primary border-none"
                                    >
                                        {post.category}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                            </div>
                            
                            <h2 className="text-base md:text-lg font-bold text-foreground leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                                {post.title}
                            </h2>
                            
                            {post.introduction && (
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                                    {post.introduction}
                                </p>
                            )}

                            <div className="flex gap-1 mt-auto">
                                {post.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] text-muted-foreground/60 bg-gray-50 px-1.5 rounded border border-gray-100">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                          </div>
                          
                          {/* Arrow Action */}
                          <div className="w-10 flex items-center justify-center border-l border-border/10 text-muted-foreground/30 group-hover:text-primary group-hover:bg-[#F3E5F5]/30 transition-colors">
                             <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
              ) : (
                  <div className="border-2 border-dashed border-border/30 p-10 text-center bg-white/30 rounded-xl">
                      <FolderHeart className="w-10 h-10 mx-auto mb-2 text-muted-foreground/30" />
                      <p className="font-bold text-sm text-muted-foreground">Nothing found here...</p>
                  </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}
