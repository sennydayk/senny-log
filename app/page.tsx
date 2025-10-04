"use client";

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
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useState } from "react";
import { getRecentPosts } from "@/lib/posts";

export default function Portfolio() {
  const [isHoveringEmpty, setIsHoveringEmpty] = useState(false);
  const recentPosts = getRecentPosts(3);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 h-[1000px] md:h-[800px] md:grid-rows-[1.8fr_1fr]">
          {/* About Me - Tall Card (Top Left) */}
          <Card
            id="about"
            className="md:col-span-2 lg:col-span-2 md:row-span-2 p-6 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary font-sans">
                    FM
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-card-foreground font-sans">
                    Kim Seyeon
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="font-sans">대한민국, 서울</span>
                  </div>
                </div>
              </div>
              <p className="text-card-foreground leading-relaxed font-sans flex-1 text-sm">
                I'm Felix Macaspac, a passionate HubSpot CMS developer from the
                Philippines with 5 years of experience building scalable web
                applications and custom CMS solutions. I specialize in HubSpot
                development, creating seamless user experiences and optimizing
                content management workflows. When I'm not coding, you'll find
                me exploring new web technologies and contributing to the
                developer community.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge
                  variant="secondary"
                  className="font-sans text-xs rounded-full"
                >
                  HubSpot CMS
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-sans text-xs rounded-full"
                >
                  JavaScript
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-sans text-xs rounded-full"
                >
                  React
                </Badge>
                <Badge
                  variant="secondary"
                  className="font-sans text-xs rounded-full"
                >
                  Node.js
                </Badge>
              </div>
            </div>
          </Card>

          {/* Recent Posts Card */}
          <Card
            id="blog"
            className="md:col-span-2 lg:col-span-3 p-6 pb-8 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"
            onMouseEnter={() => setIsHoveringEmpty(true)}
            onMouseLeave={() => setIsHoveringEmpty(false)}
          >
            <div
              className={`relative z-10 transition-all duration-300 ${
                isHoveringEmpty ? "opacity-40 blur-[2px]" : ""
              }`}
            >
              <h3 className="font-bold text-card-foreground mb-6 font-sans">
                Recent Posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block relative z-30 cursor-pointer hover:text-primary hover:translate-x-1 transition-all duration-200"
                    onMouseEnter={() => setIsHoveringEmpty(false)}
                    onMouseLeave={() => setIsHoveringEmpty(true)}
                  >
                    <div className="flex items-start gap-3 p-3">
                      <div className="flex-1">
                        <h4 className="font-semibold font-sans">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 font-sans">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span className="font-sans">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs font-sans rounded-full ml-2"
                          >
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`absolute inset-0 -z-10 transition-opacity duration-300 bg-background/60 backdrop-blur-sm flex items-center justify-center pointer-events-none ${
                isHoveringEmpty ? "z-20 opacity-100" : "opacity-0"
              }`}
            >
              <Link href="/blog" className="pointer-events-auto">
                <Button
                  size="lg"
                  className="font-sans rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  View All Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Status - Square Card (Top Right) */}
          <Card className="md:col-span-1 p-6 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-semibold text-card-foreground font-sans">
                  Available
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 font-sans">
                Open to new opportunities
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-sans">
                    Projects
                  </span>
                  <span className="font-semibold text-card-foreground font-sans">
                    25+
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-sans">
                    Experience
                  </span>
                  <span className="font-semibold text-card-foreground font-sans">
                    5 years
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links - Square Card (Bottom Left) */}
          <Card
            id="contact"
            className="md:col-span-1 p-6 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <h3 className="font-semibold text-card-foreground mb-4 font-sans">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-sans">GitHub</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-sans">LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm font-sans">Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-sans">Email</span>
                </a>
              </div>
            </div>
          </Card>

          {/* Experience moved to bottom row */}
          <Card
            id="experience"
            className="md:col-span-2 lg:col-span-3 p-6 bg-card border border-border relative overflow-hidden rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <h3 className="font-bold text-card-foreground mb-4 font-sans">
                Experience
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">
                      TC
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">
                      Senior Full Stack Developer
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      TechCorp Inc. • 2022 - Present
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">
                      ST
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">
                      Full Stack Developer
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
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
