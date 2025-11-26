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
    { label: 'CONTACT', href: 'mailto:contact@example.com', icon: <div className="font-black text-sm">@</div> },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-10 max-w-5xl mx-auto relative">
      
      {/* Decorative Background Elements - Softer */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-50 pointer-events-none animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl opacity-50 pointer-events-none animate-float" style={{ animationDelay: "2s" }}></div>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* Profile Module - Compact & Cute */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4 sticky top-20">
          <div className="relative group hover:-translate-y-1 transition-transform duration-300">
            {/* Background Shadow */}
            <div className="absolute inset-0 bg-[#D4B2FF] rounded-2xl translate-x-2 translate-y-2"></div>
            
            <Card className="relative border-2 border-border rounded-2xl overflow-hidden bg-white shadow-sm">
              <CardHeader className="bg-[#FF66B3] border-b-2 border-border p-3 flex flex-row justify-between items-center text-white">
                  <span className="font-display font-bold text-sm tracking-wide flex items-center gap-1"><Sparkles className="w-3 h-3" /> ID_CARD</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    <div className="w-2 h-2 rounded-full bg-white/50"></div>
                  </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <div className="relative w-40 h-40 border-2 border-border rounded-full overflow-hidden bg-white shadow-[0_0_0_4px_rgba(212,178,255,0.3)]">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#FF66B3]/20 mix-blend-hard-light pointer-events-none"></div>
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-sm">
                    SENNY
                  </h1>
                  <Badge variant="secondary" className="font-mono text-xs px-2 py-0.5 bg-[#D4B2FF]/30 text-[#8E44AD] border-none">
                    Frontend Developer
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stacked Badges - Compact */}
          <div className="flex gap-2 justify-center flex-wrap px-2">
            {['HTML5', 'CSS3', 'REACT', 'NEXT.JS', 'TS'].map((tech, i) => (
                <Badge key={tech} variant="outline" className={`
                    bg-white text-foreground border border-border 
                    text-xs font-bold px-2 py-0.5
                    shadow-[2px_2px_0px_rgba(74,21,75,0.1)]
                    hover:-translate-y-0.5 transition-transform cursor-default
                `}>
                  {tech}
                </Badge>
            ))}
          </div>
        </div>

        {/* Intro / Dashboard Module */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
          
          {/* Welcome Bubble */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-border shadow-[4px_4px_0px_#D4B2FF] relative">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-3 text-foreground">
                        Hello! I'm <span className="text-primary">Senny</span>.
                    </h2>
                    
                    <p className="text-base md:text-lg font-medium leading-relaxed text-muted-foreground mb-6">
                        Welcome to my lovely digital garden. 🌱 <br/>
                        I write code, design things, and collect memories.
                    </p>

                    <div className="flex gap-3">
                        <Link href="/blog">
                            <Button className="bg-primary hover:bg-primary/90 text-white border-2 border-border h-10 px-6 text-sm font-bold rounded-full shadow-[2px_2px_0px_#4A154B] hover:translate-y-[1px] hover:shadow-none transition-all">
                                Explore Logs <ArrowRight className="ml-1 w-4 h-4" />
                            </Button>
                        </Link>
                        <Button variant="ghost" className="text-foreground hover:bg-secondary/20 h-10 px-6 text-sm font-bold rounded-full border-2 border-transparent hover:border-secondary transition-all">
                            View Resume
                        </Button>
                    </div>
                </div>
          </div>

          {/* Navigation Deck - Compact Grid */}
          <div className="grid grid-cols-2 gap-3">
             {navItems.map((item, i) => (
                <Link href={item.href} key={item.label} className="block group">
                  <div className={`
                    h-20 flex flex-col justify-center items-center gap-1
                    border-2 border-border rounded-xl
                    transition-all duration-200
                    hover:-translate-y-1 hover:shadow-[3px_3px_0px_rgba(74,21,75,0.1)]
                    ${i === 0 ? 'bg-[#FFF0F5]' : i === 1 ? 'bg-[#F3E5F5]' : i === 2 ? 'bg-[#E0F7FA]' : 'bg-[#F1F8E9]'}
                  `}>
                    <div className="text-foreground/80 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary">
                        {item.icon}
                    </div>
                    <span className="text-xs font-bold tracking-wide text-foreground/70 group-hover:text-foreground">
                      {item.label}
                    </span>
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Recent Logs Section */}
      <section className="space-y-4 py-4">
        <div className="flex items-center gap-2 border-b-2 border-border/30 pb-2">
           <Layers className="w-5 h-5 text-primary" />
           <h2 className="text-xl font-black text-foreground">
             RECENT LOGS
           </h2>
        </div>
        
        <div className="w-full">
           <RecentPostsCard posts={recentPosts} />
        </div>
      </section>

    </div>
  );
}
