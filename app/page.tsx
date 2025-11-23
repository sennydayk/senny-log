import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getRecentPostsMetadata, getBlogStats } from "@/lib/posts";
import { RecentPostsCard } from "@/components/recent-posts-card";
import { BlogActivityDashboard } from "@/components/blog-activity-dashboard";
import { ArrowRight, Github, Linkedin, Mail, Terminal, Cpu, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Portfolio() {
  const recentPosts = await getRecentPostsMetadata(3);
  const blogStats = await getBlogStats();

  const techStack = [
    "JavaScript", "TypeScript", "React", "Next.js", 
    "Node.js", "TailwindCSS", "Docker", "AWS"
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b-2 border-black dark:border-white bg-background/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
        <div className="font-display text-2xl font-bold tracking-tighter">SENNY.LOG_v2.0</div>
        <ThemeToggle />
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 border-b-2 border-black dark:border-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="relative z-10">
            <h1 className="text-[18vw] leading-[0.8] font-black tracking-tighter mix-blend-difference text-white dark:text-white select-none">
              SENNY
              <br />
              <span className="text-transparent stroke-text-black dark:stroke-text-white ml-[10vw]">LOG</span>
            </h1>
            <div className="absolute top-[20%] right-[5%] rotate-12 hidden md:block">
              <Badge className="text-xl px-6 py-2 bg-secondary text-white border-2 border-black rotate-[-12deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                MAXIMALISM DESIGN
              </Badge>
            </div>
          </div>
          
          <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              <p className="font-mono text-xl md:text-2xl max-w-xl bg-white/5 backdrop-blur-sm p-4 border-l-4 border-primary">
                // FRONTEND DEVELOPER<br/>
                // UI/UX ENTHUSIAST<br/>
                // DIGITAL CREATOR
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="font-black text-lg">
                  EXPLORE LOGS <ArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="font-black text-lg">
                  GITHUB
                </Button>
              </div>
            </div>
            
            <div className="bg-primary p-1 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#ffffff] rotate-3 md:rotate-0 transition-transform hover:rotate-2">
              <div className="bg-black p-6 text-white font-mono text-sm">
                <p>{`> initiating_system...`}</p>
                <p>{`> loading_profile: Kim Seyeon`}</p>
                <p>{`> location: Seoul, KR`}</p>
                <p className="text-primary animate-pulse">{`> status: ONLINE`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div className="border-b-2 border-black dark:border-white overflow-hidden bg-primary text-black py-3">
        <div className="animate-marquee whitespace-nowrap font-display text-4xl font-bold tracking-tight">
          DIGITAL BRUTALISM • REACT • NEXT.JS • TYPESCRIPT • CREATIVE CODING • UI/UX DESIGN • SENNY LOG • 
          DIGITAL BRUTALISM • REACT • NEXT.JS • TYPESCRIPT • CREATIVE CODING • UI/UX DESIGN • SENNY LOG •
        </div>
      </div>

      {/* CONTENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* LEFT COLUMN: PROFILE & STATS */}
        <div className="lg:col-span-4 border-r-2 border-black dark:border-white p-6 flex flex-col gap-8">
          <div className="sticky top-24 space-y-8">
             <Card className="bg-background p-0 overflow-hidden">
                <div className="relative aspect-square w-full bg-muted grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                   <Image 
                     src="/myprofile.JPG" 
                     alt="Kim Seyeon" 
                     fill 
                     className="object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                     <h2 className="text-3xl font-display text-white font-bold">KIM SEYEON</h2>
                     <p className="font-mono text-primary">@senny_dev</p>
                   </div>
                </div>
             </Card>

             <div className="space-y-4">
                <h3 className="font-display text-2xl flex items-center gap-2">
                  <Terminal className="w-6 h-6" /> SKILL_SET
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-background hover:bg-primary hover:text-black hover:border-black transition-colors cursor-crosshair">
                      {tech}
                    </Badge>
                  ))}
                </div>
             </div>

             <div className="pt-6 border-t-2 border-dashed border-border">
                <BlogActivityDashboard stats={blogStats} />
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: POSTS & CONTENT */}
        <div className="lg:col-span-8 bg-muted/10">
          <div className="p-6 md:p-12 space-y-12">
            
            <div className="flex items-end justify-between border-b-4 border-black dark:border-white pb-4">
              <h2 className="text-6xl md:text-8xl font-display font-black text-transparent stroke-text-black dark:stroke-text-white">
                LATEST
              </h2>
              <span className="font-mono text-xl font-bold mb-2">/// TRANSMISSIONS</span>
            </div>

            <div className="grid gap-8">
               {/* We are reusing RecentPostsCard but wrapping it to control layout if needed */}
               {/* Note: RecentPostsCard might need style adjustments to fit perfectly, 
                   but we'll let global CSS rules handle most of it. */}
               <div className="transform hover:scale-[1.01] transition-transform duration-300">
                 <RecentPostsCard posts={recentPosts} />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card className="bg-[#00ffff] text-black border-black shadow-[8px_8px_0px_0px_#000000]">
                 <div className="h-full flex flex-col justify-between">
                    <div>
                      <Cpu className="w-10 h-10 mb-4" />
                      <h3 className="font-display text-3xl font-bold mb-2">EXPERIENCE</h3>
                      <ul className="font-mono text-sm space-y-2 border-l-2 border-black pl-4">
                        <li>
                          <strong>RushEight Inc.</strong><br/>
                          Frontend Developer (2025-Now)
                        </li>
                        <li>
                          <strong>StartupXYZ</strong><br/>
                          Full Stack (2020-2022)
                        </li>
                      </ul>
                    </div>
                 </div>
              </Card>

              <Card className="bg-[#ff0099] text-white border-black shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#ffffff]">
                 <div className="h-full flex flex-col justify-between">
                    <div>
                      <Zap className="w-10 h-10 mb-4 text-black" />
                      <h3 className="font-display text-3xl font-bold mb-2 text-black">CONNECT</h3>
                      <div className="flex flex-col gap-2 font-mono font-bold text-black">
                        <Link href="#" className="hover:underline flex items-center gap-2">
                          <Github className="w-4 h-4" /> GITHUB
                        </Link>
                        <Link href="#" className="hover:underline flex items-center gap-2">
                          <Linkedin className="w-4 h-4" /> LINKEDIN
                        </Link>
                        <Link href="#" className="hover:underline flex items-center gap-2">
                          <Mail className="w-4 h-4" /> EMAIL
                        </Link>
                      </div>
                    </div>
                 </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <footer className="border-t-2 border-black dark:border-white bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-4xl font-bold">SENNY.LOG</div>
          <div className="font-mono text-xs text-center md:text-right text-gray-400">
            <p>DESIGNED BY ARTIFICIAL INTELLIGENCE</p>
            <p>© 2025 MAXIMALISM EDITION</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
