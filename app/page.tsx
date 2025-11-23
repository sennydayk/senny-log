import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { getRecentPostsMetadata, getBlogStats } from "@/lib/posts";
import { RecentPostsCard } from "@/components/recent-posts-card";
import { BlogActivityDashboard } from "@/components/blog-activity-dashboard";
import Link from "next/link";

export default async function Portfolio() {
  const recentPosts = await getRecentPostsMetadata(3);
  const blogStats = await getBlogStats();

  const techStack = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "TailwindCSS", "Docker", "AWS",
  ];

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in zoom-in duration-500">
      
      {/* Hero / Intro Section */}
      <div className="text-center py-10 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground drop-shadow-sm">
          Senny's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Log</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          3D 인터랙션과 디자인 시스템을 탐구하는 프론트엔드 개발자의 기록소
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* About Me - Tall Card (Left) */}
        <Card className="md:col-span-2 lg:col-span-2 row-span-2 p-8 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-3xl border-white/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-200/50 to-emerald-200/50 dark:from-lime-900/30 dark:to-emerald-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col h-full gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-clay-md border-4 border-white/50 dark:border-white/10 flex-shrink-0">
                <Image
                  src="/myprofile.JPG"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black text-foreground">Kim Seyeon</h2>
                <div className="flex items-center gap-2 text-muted-foreground font-bold mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>Seoul, KR</span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
               <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md shadow-inner">
                 <BlogActivityDashboard stats={blogStats} />
               </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              <Link href="https://your-resume-url.com" target="_blank" className="mr-2">
                 <Button variant="clay" size="sm" className="rounded-full">
                    <FileText className="w-4 h-4 mr-2" /> Resume
                 </Button>
              </Link>
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border-0 px-3 py-1 text-xs font-bold shadow-sm hover:scale-110 transition-transform cursor-default"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Status Card */}
        <Card className="md:col-span-1 p-6 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/20 rounded-full blur-2xl -mr-10 -mt-10" />
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
               <h3 className="font-extrabold text-foreground">Available</h3>
             </div>
             <div>
                <p className="text-sm font-bold text-muted-foreground mb-1">Current Role</p>
                <p className="font-black text-lg">Frontend Dev 👩🏻‍💻</p>
             </div>
           </div>
        </Card>

        {/* Social Links */}
        <Card className="md:col-span-1 p-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 relative overflow-hidden group">
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl -ml-10 -mb-10" />
           <div className="relative z-10 h-full flex flex-col">
             <h3 className="font-extrabold text-foreground mb-4">Connect</h3>
             <div className="space-y-3 mt-auto">
               <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/30 rounded-lg">
                 <Github className="w-5 h-5" />
                 <span className="font-bold text-sm">GitHub</span>
               </a>
               <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/30 rounded-lg">
                 <Linkedin className="w-5 h-5" />
                 <span className="font-bold text-sm">LinkedIn</span>
               </a>
               <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/30 rounded-lg">
                 <Mail className="w-5 h-5" />
                 <span className="font-bold text-sm">Email</span>
               </a>
             </div>
           </div>
        </Card>

        {/* Recent Posts - Wide Card */}
        <div className="md:col-span-2 lg:col-span-2 row-span-2 h-full">
           <RecentPostsCard posts={recentPosts} />
        </div>

        {/* Experience Card */}
        <Card className="md:col-span-2 lg:col-span-2 p-8 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40 relative overflow-hidden">
           <div className="absolute right-0 bottom-0 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl" />
           <div className="relative z-10">
             <h3 className="font-extrabold text-2xl text-foreground mb-6">Experience</h3>
             <div className="space-y-6">
               <div className="flex gap-4 group">
                 <div className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                   <span className="font-black text-rose-500">RE</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-foreground">Frontend Developer</h4>
                   <p className="text-sm font-medium text-muted-foreground">RushEight Inc. • 2025 - Present</p>
                 </div>
               </div>
               <div className="flex gap-4 group">
                 <div className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                   <span className="font-black text-rose-500">ST</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-foreground">Full Stack Developer</h4>
                   <p className="text-sm font-medium text-muted-foreground">StartupXYZ • 2020 - 2022</p>
                 </div>
               </div>
             </div>
           </div>
        </Card>

      </div>
    </div>
  );
}
