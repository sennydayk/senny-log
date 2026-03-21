import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getPostBySlugWithNotion } from "@/lib/posts";
import { MarkdownContent } from "@/components/markdown-content";
import { TableOfContents } from "@/components/table-of-contents";
import { Calendar, ArrowLeft } from "lucide-react";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true; // 동적 라우트 허용

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugWithNotion(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-foreground selection:text-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Return to Directory
        </Link>

        {/* Article Header Container */}
        <div className="bg-card border border-border p-6 md:p-8 mb-10 rounded-lg">
            <header>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1 rounded-md">
                  {post.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-black text-foreground mb-4 leading-[1.15] tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground font-sans font-medium border-l-2 border-border pl-4">
                {post.summary}
              </p>
            </header>
        </div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Table of Contents - Mobile */}
            <div className="xl:hidden mb-8 p-5 border border-border bg-card rounded-lg">
              <p className="font-medium text-sm mb-3 text-muted-foreground uppercase tracking-wide border-b border-border pb-2">Contents</p>
              <TableOfContents content={post.content} />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-sans prose-p:leading-relaxed prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-border prose-pre:rounded-md prose-img:border prose-img:border-border prose-img:rounded-md">
              <MarkdownContent content={post.content} />
            </article>
            
            {/* Footer Tag */}
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                <div className="font-medium text-lg text-muted-foreground/30 uppercase tracking-wide">End of File</div>
                <Badge variant="secondary" className="text-xs rounded-md">SENNY.LOG</Badge>
            </div>
          </div>

          {/* Table of Contents - Desktop */}
          <aside className="hidden xl:block w-72 shrink-0 self-start sticky top-24">
            <div className="border border-border bg-card p-5 rounded-lg">
               <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wide border-b border-border pb-2">Index</h3>
               <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
