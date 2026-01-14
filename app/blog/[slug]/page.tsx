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
export const revalidate = 3600; // 1시간마다 재검증

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
    <div className="min-h-screen bg-[#F5F5F5] text-foreground font-mono selection:bg-primary selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-black hover:translate-x-[-2px] transition-all mb-8 border-b border-transparent hover:border-black pb-0.5"
        >
          <ArrowLeft className="w-3 h-3" />
          Return to Directory
        </Link>

        {/* Article Header Container */}
        <div className="bg-white border border-black/15 shadow-sm p-8 md:p-12 mb-12 rounded-lg">
            <header>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="outline" className="text-xs font-medium border-black/20 bg-secondary/50 text-black/80 px-2.5 py-1 rounded-md">
                  {post.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-black mb-6 leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground font-sans font-medium border-l-2 border-primary/60 pl-4">
                {post.summary}
              </p>
            </header>
        </div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Table of Contents - Mobile */}
            <div className="xl:hidden mb-8 p-5 border border-black/10 bg-white shadow-sm rounded-lg">
              <p className="font-semibold text-sm mb-3 text-black/70 uppercase tracking-wide border-b border-black/10 pb-2">Contents</p>
              <TableOfContents content={post.content} />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-sans prose-p:leading-relaxed prose-pre:bg-black prose-pre:border-2 prose-pre:border-black prose-pre:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] prose-pre:rounded-none prose-img:border-2 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose-img:rounded-none">
              <MarkdownContent content={post.content} />
            </article>
            
            {/* Footer Tag */}
            <div className="mt-16 pt-8 border-t border-black/10 flex justify-between items-center">
                <div className="font-semibold text-2xl text-black/10 uppercase tracking-wide">End of File</div>
                <Badge className="bg-black/80 text-white rounded-md hover:bg-primary text-xs">SENNY_OS v2.025</Badge>
            </div>
          </div>

          {/* Table of Contents - Desktop */}
          <aside className="hidden xl:block w-72 shrink-0 self-start sticky top-24">
            <div className="border border-black/10 bg-white p-5 shadow-sm rounded-lg">
               <h3 className="font-semibold text-sm mb-4 text-black/70 uppercase tracking-wide border-b border-black/10 pb-2">Index</h3>
               <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
