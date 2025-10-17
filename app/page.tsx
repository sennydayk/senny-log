import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ArrowRight,
  Calendar,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { getRecentPostsMetadata, getBlogStats } from "@/lib/posts";
import { RecentPostsCard } from "@/components/recent-posts-card";
import { BlogActivityDashboard } from "@/components/blog-activity-dashboard";

export default async function Portfolio() {
  const recentPosts = await getRecentPostsMetadata(3);
  const blogStats = await getBlogStats();

  const techStack = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "TailwindCSS",
    "Docker",
    "AWS",
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 h-[750px] md:h-[650px] md:grid-rows-[2fr_0.8fr]">
          {/* About Me - Tall Card (Top Left) */}
          <Card
            id="about"
            className="md:col-span-2 lg:col-span-2 md:row-span-2 p-6 bg-[#a7ec0a] border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/myprofile.JPG"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-black font-sans">
                    Kim Seyeon
                  </h2>
                  <div className="flex items-center gap-2 text-sm font-bold text-[#525252] mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="font-sans">대한민국, 서울</span>
                  </div>
                </div>
              </div>

              {/* Blog Activity Dashboard */}
              <div className="pb-4 mb-4 border-b border-t border-[#262626]">
                <BlogActivityDashboard stats={blogStats} />
              </div>

              {/* <p className="text-card-foreground leading-relaxed font-sans text-sm mb-4">
                사용자 경험을 중심으로 인터랙티브한 웹을 만드는 프론트엔드
                개발자입니다.
              </p> */}
              <div className="mt-auto mb-3">
                <a
                  href="https://your-resume-url.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mb-3 text-black hover:text-primary w-fit hover:translate-x-1 transition-all duration-200"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-sans font-medium">Resume</span>
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-sans text-xs rounded-full bg-[#1a1a1a] text-white border-transparent"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Posts Card */}
          <RecentPostsCard posts={recentPosts} />

          {/* Status - Square Card (Top Right) */}
          <Card className="md:col-span-1 p-6 bg-[#6acdff] border border-border relative overflow-hidden rounded-2xl shadow-none">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-extrabold text-black font-sans">
                  Available
                </h3>
              </div>
              <p className="text-sm font-bold text-[#525252] mb-4 font-sans">
                Open to new opportunities
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-[#525252] font-sans mb-1">
                    Role
                  </p>
                  <p className="font-bold text-black font-sans">
                    Frontend Developer 👩🏻‍💻
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#525252] font-sans mb-1">
                    Projects
                  </p>
                  <p className="font-bold text-black font-sans">
                    8+
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#525252] font-sans mb-1">
                    Projects
                  </p>
                  <p className="font-bold text-black font-sans">
                    8+
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#525252] font-sans mb-1">
                    Experience
                  </p>
                  <p className="font-bold text-black font-sans">
                    1 years
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links - Square Card (Bottom Left) */}
          <Card
            id="contact"
            className="md:col-span-1 p-6 bg-[#9bd9f8] border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <h3 className="font-extrabold text-black mb-4 font-sans">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 text-black hover:text-primary hover:font-extrabold hover:translate-x-1 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-semibold font-sans">GitHub</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-black hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-semibold font-sans">LinkedIn</span>
                </a>
                {/* <a
                  href="#"
                  className="flex items-center gap-3 text-black hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm font-sans">Twitter</span>
                </a> */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-black hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-semibold font-sans">Email</span>
                </a>
              </div>
            </div>
          </Card>

          {/* Experience moved to bottom row */}
          <Card
            id="experience"
            className="md:col-span-2 lg:col-span-3 p-6 bg-[#ff3299] border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <h3 className="font-extrabold text-white mb-4 font-sans">
                Experience
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white font-sans">
                      RE
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white font-sans text-sm">
                      Frontend Developer
                    </h4>
                    <p className="text-xs font-bold text-white/80 font-sans">
                      RushEight Inc. • 2025 - Present
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white font-sans">
                      ST
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white font-sans text-sm">
                      Full Stack Developer
                    </h4>
                    <p className="text-xs font-bold text-white/80 font-sans">
                      StartupXYZ • 2020 - 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-muted-foreground text-sm font-sans">
            Built with v0.dev • © 2025 Felix Macaspac
          </p>
        </footer>
      </div>
    </div>
  );
}
