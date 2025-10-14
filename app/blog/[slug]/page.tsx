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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-sans mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>

        <div className="flex gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-4xl">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-xs font-sans">
                  {post.category}
                </Badge>
                <span className="text-sm text-muted-foreground font-sans flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4 font-sans leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground font-sans">
                {post.summary}
              </p>
            </header>

            {/* Table of Contents - Mobile */}
            <div className="xl:hidden mb-8 p-6 border border-border rounded-lg bg-card/50">
              <TableOfContents content={post.content} />
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownContent content={post.content} />
            </article>
          </div>

          {/* Table of Contents - Desktop */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
