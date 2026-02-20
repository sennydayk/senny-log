import { ArrowLeft } from "lucide-react";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer bg-secondary rounded-md ${className}`}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Navigation Skeleton */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
          <ArrowLeft className="w-3 h-3" />
          <span>Return to Directory</span>
        </div>

        {/* Article Header Container Skeleton */}
        <div className="bg-card border border-border p-6 md:p-8 mb-10 rounded-lg">
          <header>
            {/* Badge & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-4 w-28" />
            </div>
            
            {/* Title */}
            <Skeleton className="h-8 md:h-10 w-full mb-3" />
            <Skeleton className="h-8 md:h-10 w-3/4 mb-4" />
            
            {/* Summary */}
            <div className="border-l-2 border-border pl-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </header>
        </div>

        <div className="flex flex-col xl:flex-row gap-12">
          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Table of Contents - Mobile Skeleton */}
            <div className="xl:hidden mb-8 p-5 border border-border bg-card rounded-lg">
              <Skeleton className="h-4 w-20 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Article Content Skeleton */}
            <article className="space-y-6">
              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
              </div>

              {/* Heading */}
              <Skeleton className="h-8 w-2/3 mt-8" />

              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Code block */}
              <Skeleton className="h-40 w-full rounded-md" />

              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
              </div>

              {/* Heading */}
              <Skeleton className="h-8 w-1/2 mt-8" />

              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>

              {/* Image placeholder */}
              <Skeleton className="h-64 w-full rounded-md" />

              {/* More paragraphs */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
              </div>
            </article>
            
            {/* Footer Skeleton */}
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28 rounded-md" />
            </div>
          </div>

          {/* Table of Contents - Desktop Skeleton */}
          <aside className="hidden xl:block w-72 shrink-0 self-start sticky top-24">
            <div className="border border-border bg-card p-5 rounded-lg">
              <Skeleton className="h-4 w-16 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
