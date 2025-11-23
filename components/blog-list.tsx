"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FolderOpen, ArrowLeft, ChevronRight, Calendar, ArrowRight, Battery, Wifi, Search } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Sidebar / Control Panel */}
      <aside className="w-full md:w-80 border-b-4 md:border-b-0 md:border-r-4 border-black bg-muted flex flex-col h-auto md:h-screen sticky top-0 z-40 shrink-0 shadow-[4px_0px_0px_0px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="p-6 border-b-4 border-black bg-primary text-primary-foreground relative z-20">
            <Link href="/" className="inline-block mb-4 -ml-2 hover:bg-black/20 rounded px-2 py-1 transition-colors">
                <div className="flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> BACK_TO_ROOT
                </div>
            </Link>
            <div className="flex items-center gap-3 mb-2">
                 <div className="w-12 h-12 border-2 border-black rounded-full overflow-hidden bg-white relative shadow-sm">
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        fill
                        className="object-cover grayscale"
                    />
                 </div>
                 <div>
                     <h1 className="font-black text-xl tracking-tighter uppercase transform -skew-x-6">SENNY_LOG</h1>
                     <div className="flex items-center gap-1 text-xs font-mono opacity-80">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        SYSTEM_ACTIVE
                     </div>
                 </div>
            </div>
        </div>

        {/* Navigation / Folder Tree */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono relative z-10">
            
            {/* Search Mockup */}
            <div className="border-2 border-black bg-white p-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="SEARCH_LOGS..." 
                    className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground font-bold"
                />
            </div>

            <div>
                <h2 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2 border-b-2 border-dashed border-muted-foreground/30 pb-2">
                    <FolderOpen className="w-4 h-4" /> DIRECTORY_TREE
                </h2>
                <div className="space-y-1">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 border-2 transition-all font-bold text-sm cursor-pointer flex items-center gap-2 group relative ${
                            selectedCategory === null
                            ? "bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-1"
                            : "border-transparent hover:border-black/50 text-muted-foreground hover:text-foreground hover:translate-x-1"
                        }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === null ? 'bg-black' : 'bg-muted-foreground/50 group-hover:bg-black'}`}></span>
                        [ROOT] / ALL_LOGS
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 border-2 transition-all font-bold text-sm cursor-pointer flex items-center gap-2 group relative ${
                                selectedCategory === category
                                ? "bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-1"
                                : "border-transparent hover:border-black/50 text-muted-foreground hover:text-foreground hover:translate-x-1"
                            }`}
                        >
                             <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === category ? 'rotate-90' : 'opacity-50 group-hover:opacity-100'}`} />
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Footer Status */}
        <div className="p-4 border-t-4 border-black bg-black text-white font-mono text-[10px] flex justify-between items-center relative z-20">
            <span>MEM: 64KB OK</span>
            <div className="flex gap-2">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
            </div>
        </div>
      </aside>

      {/* Main Content Area - Fixed height with internal scroll */}
      <main className="flex-1 h-screen overflow-y-auto relative z-0 bg-[#F0F0F0] pb-24 md:pb-0">
        {/* Content Container */}
        <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-full flex flex-col">
            
            {/* Sticky Header inside Main */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black pb-6 sticky top-0 bg-[#F0F0F0]/95 backdrop-blur z-10 pt-6">
                <div>
                    <div className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        CURRENT_DIRECTORY //
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-stroke-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-black" data-text={selectedCategory || "ALL_LOGS"}>
                        {selectedCategory || "ALL_LOGS"}
                    </h1>
                </div>
                <Badge variant="outline" className="font-mono bg-secondary text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm py-1 px-3">
                    {filteredPosts.length} FILES_FOUND
                </Badge>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-8 pb-12">
              {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block group relative"
                    >
                      {/* Tape Decoration for odd/even items */}
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 border border-yellow-400/50 shadow-sm transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-1'} z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                      <Card className="overflow-hidden border-2 border-black shadow-plastic hover:shadow-plastic-hover bg-card transition-all duration-300 rounded-none group-hover:-translate-y-1 group-hover:rotate-[0.5deg]">
                        <div className="flex flex-col md:flex-row h-auto md:h-64">
                          {/* Thumbnail */}
                          <div className="w-full md:w-2/5 relative bg-muted border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden group-hover:border-r-4 transition-all">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute top-0 left-0 bg-black/50 text-white text-[10px] font-mono px-2 py-1 pointer-events-none">
                                IMG_{index + 1}.JPG
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative bg-white group-hover:bg-[#FAFAFA] transition-colors">
                            
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge
                                        variant="outline"
                                        className="rounded-none border-black text-[10px] font-bold px-1.5 bg-accent text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        {post.category.toUpperCase()}
                                    </Badge>
                                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 bg-muted px-1 border border-muted-foreground/20">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                                
                                <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-[0.9]">
                                {post.title}
                                </h2>
                                {post.introduction && (
                                <p className="text-sm text-muted-foreground font-mono mb-4 line-clamp-2 border-l-4 border-muted pl-3 italic">
                                    "{post.introduction}"
                                </p>
                                )}
                            </div>

                            <div className="flex justify-between items-end mt-4 border-t-2 border-dashed border-muted-foreground/20 pt-4">
                                <div className="flex gap-1 flex-wrap">
                                    {post.tags?.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] font-mono text-muted-foreground hover:text-black cursor-help">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <Button size="sm" className="rounded-none border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white font-bold text-xs h-8 transition-all uppercase">
                                    Access File <ArrowRight className="ml-1 w-3 h-3" />
                                </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
              ) : (
                  <div className="border-4 border-dashed border-black/20 p-16 text-center bg-muted/10 rounded-xl">
                      <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="font-mono text-xl font-black text-muted-foreground/50">NO_FILES_FOUND</p>
                      <p className="text-sm text-muted-foreground/50 mt-2">The requested directory is empty.</p>
                  </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}
