import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import RecentPostsCard from "@/components/recent-posts-card";
import { ArrowRight, Disc, Battery, Wifi, Layers, Star, Heart, Zap, Sparkles } from "lucide-react";
import { getRecentPostsMetadata } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPostsMetadata(3);

  const navItems = [
    { label: 'PROJECTS', href: '/projects', icon: <Zap className="w-5 h-5" /> },
    { label: 'ABOUT', href: '/about', icon: <Heart className="w-5 h-5" /> },
    { label: 'GUESTBOOK', href: '/guestbook', icon: <Star className="w-5 h-5" /> },
    { label: 'CONTACT', href: '/contact', icon: <div className="font-black text-sm">@</div> },
  ];

  return (
    <div className="min-h-full px-4 md:px-8 pb-8 md:pb-12 flex flex-col gap-10 max-w-5xl mx-auto relative">
      
      {/* Decorative Background Elements - Softer */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-50 pointer-events-none animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl opacity-50 pointer-events-none animate-float" style={{ animationDelay: "2s" }}></div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-6 items-start relative z-10">
        
        {/* Profile Module - Compact & Cute */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4 sticky top-20">
          <div className="relative group hover:-translate-y-1 transition-transform duration-300">
            {/* Background Shadow */}
            <div className="absolute inset-0 bg-secondary/30 rounded-[2rem] translate-x-4 translate-y-4 blur-xl"></div>
            
            <Card className="relative border border-white/30 dark:border-white/5 rounded-[2rem] overflow-hidden bg-white/40 dark:bg-[#1C1C1E]/70 backdrop-blur-2xl shadow-glass hover:shadow-glass-sm transition-all duration-500">
              <CardHeader className="bg-primary/70 backdrop-blur-md border-b border-white/10 p-5 flex flex-row justify-between items-center text-white">
                  <span className="font-display font-bold text-sm tracking-wide flex items-center gap-1 opacity-90"><Sparkles className="w-3 h-3" /> ID_CARD</span>
                  <div className="flex gap-1.5 opacity-80">
                    <div className="w-2 h-2 rounded-full bg-white/40 shadow-inner"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40 shadow-inner"></div>
                  </div>
              </CardHeader>
              <CardContent className="p-8 flex flex-col items-center gap-6">
                <div className="relative w-40 h-40 border-4 border-white/20 rounded-full overflow-hidden shadow-2xl ring-1 ring-white/30">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-foreground/90 drop-shadow-sm">
                    SENNY
                  </h1>
                  <Badge variant="secondary" className="font-mono text-xs px-3 py-1 bg-secondary/20 text-muted-foreground border-none rounded-full">
                    Frontend Developer
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stacked Badges - Compact */}
          <div className="flex gap-2 justify-center flex-wrap px-2 mb-6">
            {['HTML5', 'CSS3', 'REACT', 'NEXT.JS', 'TS'].map((tech) => (
                <Badge key={tech} variant="outline" className={`
                    bg-white/30 dark:bg-white/5 text-foreground/80 border border-white/20 dark:border-white/5
                    text-xs font-bold px-3 py-1 rounded-full backdrop-blur-lg
                    hover:bg-white/50 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all cursor-default
                    shadow-sm
                `}>
                  {tech}
                </Badge>
            ))}
          </div>
        </div>

        {/* Intro / Dashboard Module */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 pt-10 md:pt-14">
          
          {/* Welcome Bubble */}
          <div className="bg-white/30 dark:bg-[#1C1C1E]/50 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/30 dark:border-white/5 shadow-glass relative overflow-hidden group hover:bg-white/40 dark:hover:bg-[#1C1C1E]/60 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-3 text-foreground/90 tracking-tight">
                        Hello! I'm <span className="text-primary drop-shadow-sm">Senny</span>.
                    </h2>
                    
                    <p className="text-base md:text-lg font-medium leading-relaxed text-muted-foreground mb-6">
                        Welcome to my lovely digital garden. 🌱 <br/>
                        I write code, design things, and collect memories.
                    </p>

                </div>
          </div>

          {/* Navigation Deck - Compact Grid */}
          <div className="grid grid-cols-2 gap-3">
             {navItems.map((item) => (
                <Link href={item.href} key={item.label} className="block group">
                  <div className={`
                    h-28 flex flex-col justify-center items-center gap-3
                    border border-white/30 dark:border-white/5 rounded-[1.5rem]
                    backdrop-blur-2xl transition-all duration-300
                    hover:-translate-y-1 hover:shadow-glass hover:border-white/40
                    bg-white/20 dark:bg-white/5
                  `}>
                    <div className="text-foreground/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary drop-shadow-sm">
                        {item.icon}
                    </div>
                    <span className="text-xs font-bold tracking-wide text-foreground/60 group-hover:text-foreground">
                      {item.label}
                    </span>
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Recent Logs Section */}
      <section className="space-y-6 py-4">
        <div className="flex items-center justify-between border-b border-white/10 dark:border-white/5 pb-4">
           <div className="flex items-center gap-2">
             <Layers className="w-5 h-5 text-primary/80 drop-shadow-sm" />
             <h2 className="text-xl font-black text-foreground/90 tracking-tight">
               RECENT LOGS
             </h2>
           </div>
           <Link href="/blog">
             <Button className="bg-primary/70 hover:bg-primary/80 text-white border border-white/10 h-9 px-6 text-sm font-bold rounded-full shadow-glass hover:shadow-glass-sm hover:-translate-y-0.5 transition-all backdrop-blur-md">
               Explore Logs <ArrowRight className="ml-1 w-4 h-4" />
             </Button>
           </Link>
        </div>
        
        <div className="w-full">
           <RecentPostsCard posts={recentPosts} />
        </div>
      </section>

    </div>
  );
}
