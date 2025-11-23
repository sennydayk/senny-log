import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import RecentPostsCard from "@/components/recent-posts-card";
import { ArrowRight, Disc, Battery, Wifi, Layers } from "lucide-react";
import { getRecentPostsMetadata } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPostsMetadata(3);

  const navItems = [
    { label: 'PROJECTS', href: '/projects' },
    { label: 'ABOUT', href: '/about' },
    { label: 'GUESTBOOK', href: '/guestbook' },
    { label: 'CONTACT', href: 'mailto:contact@example.com' },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col gap-12 max-w-6xl mx-auto">
      
      {/* Hero Section: The ID Card / Cassette Label */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Profile Module */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <Card className="border-2 border-black shadow-plastic bg-card overflow-hidden rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
            <CardHeader className="bg-primary border-b-2 border-black p-4">
              <div className="flex justify-between items-center text-primary-foreground">
                <span className="font-bold text-lg tracking-widest font-mono">USER_ID</span>
                <Disc className="animate-spin-slow w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center gap-6">
              <div className="relative w-56 h-56 border-2 border-black rounded-full overflow-hidden bg-muted group shadow-inner">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                {/* Updated overlay to HOT PINK (accent) */}
                <div className="absolute inset-0 bg-[#FF0099]/50 mix-blend-color pointer-events-none"></div>
              </div>
              <div className="text-center space-y-3">
                <h1 className="text-4xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 transform -skew-x-6 inline-block shadow-md">
                  SENNY
                </h1>
                <p className="font-mono text-sm bg-secondary px-2 py-0.5 border border-black inline-block font-bold tracking-tight">
                  Frontend Developer // UI Enthusiast
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted border-t-2 border-black p-3 justify-between font-mono text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1"><Battery className="w-4 h-4" /> 100%</span>
              <span className="flex items-center gap-1">ONLINE <Wifi className="w-4 h-4" /></span>
            </CardFooter>
          </Card>

          {/* Sticker / Decoration area */}
          <div className="flex gap-3 justify-center flex-wrap px-4">
            <Badge variant="outline" className="bg-yellow-300 text-black border border-black rotate-3 hover:scale-110 transition-transform cursor-default shadow-sm">
              ★ HTML5
            </Badge>
            <Badge variant="outline" className="bg-pink-400 text-white border border-black -rotate-2 hover:scale-110 transition-transform cursor-default shadow-sm">
              ♥ CSS3
            </Badge>
            <Badge variant="outline" className="bg-blue-400 text-white border border-black rotate-1 hover:scale-110 transition-transform cursor-default shadow-sm">
              ⚛ REACT
            </Badge>
            <Badge variant="outline" className="bg-green-400 text-black border border-black -rotate-3 hover:scale-110 transition-transform cursor-default shadow-sm">
              NEXT.JS
            </Badge>
          </div>
        </div>

        {/* Intro / Terminal Module */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-8">
          <div className="bg-black/95 p-8 rounded-xl border-2 border-black shadow-plastic text-green-400 font-mono min-h-[240px] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-50"></div>
            
            <div className="z-20 space-y-6">
              <div className="flex items-center gap-2 text-sm opacity-50 border-b border-green-400/30 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2">terminal --zsh --80x24</span>
              </div>
              <div className="space-y-2">
                <p className="typing-effect text-lg">
                  <span className="text-secondary mr-2">➜</span>
                  <span className="text-white font-bold">Run description.exe</span>
                </p>
                <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light">
                  안녕하세요! <span className="bg-primary/20 text-primary px-1 font-bold border-b-2 border-primary">Senny Log</span>에 오신 것을 환영합니다.
                  <br />
                  이곳은 저의 개발 여정과 생각들을 기록하는 <span className="italic">디지털 아카이브</span>입니다.
                </p>
              </div>
            </div>
            
            <div className="z-20 pt-6 flex gap-4">
              <Link href="/blog">
                <Button className="bg-secondary text-black hover:bg-secondary/90 border-none font-bold text-lg px-8 py-6 shadow-none hover:translate-x-1 transition-transform rounded-sm">
                  ENTER ARCHIVE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Menu / Cassette Deck Buttons */}
          <div className="grid grid-cols-2 gap-4">
             {navItems.map((item, i) => (
                <Link href={item.href} key={item.label} className="block group">
                  <div className={`
                    h-20 flex items-center justify-between px-6 
                    border-2 border-black rounded-lg
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                    group-active:translate-y-[2px] group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                    transition-all duration-200
                    ${i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-muted/30 hover:bg-muted/50'}
                  `}>
                    <span className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Recent Logs Section: The Playlist */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b-2 border-black pb-4">
           <Layers className="w-8 h-8 text-primary" />
           <h2 className="text-4xl font-black uppercase italic tracking-tighter glitch-text" data-text="RECENT_DATA_LOGS">
             RECENT_DATA_LOGS
           </h2>
        </div>
        
        <div className="w-full">
           <RecentPostsCard posts={recentPosts} />
        </div>
      </section>

      {/* Footer Banner */}
      <div className="w-full py-4 bg-yellow-400 border-y-2 border-black overflow-hidden">
         <div className="animate-marquee whitespace-nowrap text-4xl font-black italic tracking-tighter text-black">
            KEEP RECORDING YOUR LIFE /// SENNY LOG 2025 /// INSERT DISK 2 TO CONTINUE /// 
            KEEP RECORDING YOUR LIFE /// SENNY LOG 2025 /// INSERT DISK 2 TO CONTINUE /// 
         </div>
      </div>

    </div>
  );
}
