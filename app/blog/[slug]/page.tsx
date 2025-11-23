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
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 mb-12 relative overflow-hidden">
            {/* Decorative Tape */}
            <div className="absolute -top-3 right-20 w-32 h-8 bg-primary/20 rotate-3 border-l border-r border-primary/30"></div>

            <header className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="outline" className="text-xs font-bold border-black bg-secondary text-black px-2 py-1 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {post.category.toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground border border-black/20 px-2 py-1 bg-muted/30">
                  CREATED: {formatDate(post.date)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-black mb-6 leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground font-sans font-medium border-l-4 border-primary pl-4 italic">
                {post.summary}
              </p>
            </header>
        </div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Table of Contents - Mobile */}
            <div className="xl:hidden mb-8 p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-sm mb-4 uppercase border-b-2 border-black pb-2">Contents</p>
              <TableOfContents content={post.content} />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-sans prose-p:leading-relaxed prose-pre:bg-black prose-pre:border-2 prose-pre:border-black prose-pre:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] prose-pre:rounded-none prose-img:border-2 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose-img:rounded-none">
              <MarkdownContent content={post.content} />
            </article>
            
            {/* Footer Tag */}
            <div className="mt-16 pt-8 border-t-4 border-black border-dashed flex justify-between items-center">
                <div className="font-black text-4xl text-black/10 uppercase">End of File</div>
                <Badge className="bg-black text-white rounded-none hover:bg-primary text-xs">SENNY_OS v2.025</Badge>
            </div>
          </div>

          {/* Table of Contents - Desktop */}
          <aside className="hidden xl:block w-72 shrink-0 relative">
            <div className="sticky top-24 h-fit">
              <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                 <div className="absolute -top-2 -left-2 w-4 h-4 bg-black"></div>
                 <div className="absolute -top-2 -right-2 w-4 h-4 bg-black"></div>
                 <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-black"></div>
                 <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-black"></div>
                 
                 <h3 className="font-black text-lg mb-4 uppercase border-b-4 border-black pb-2">Index</h3>
                 <TableOfContents content={post.content} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
