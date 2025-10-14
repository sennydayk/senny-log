"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold text-card-foreground mb-6 mt-8 first:mt-0 font-sans">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold text-card-foreground mb-4 mt-8 font-sans">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold text-card-foreground mb-3 mt-6 font-sans">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-base text-card-foreground leading-7 mb-4 font-sans">
            {children}
          </p>
        ),
        hr: () => <hr className="my-8 border-t border-border" />,
        code: (props) => {
          const { inline, className, children } = props as {
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          };
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="my-4 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                style={oneDark as never}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-card-foreground">
              {children}
            </code>
          );
        },
        img: ({ src, alt }) => (
          <span className="block my-6 relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt || ""}
              fill
              className="object-cover"
            />
          </span>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-card-foreground font-sans">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-card-foreground font-sans">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/40 pl-4 py-2 my-4 italic text-muted-foreground font-sans">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-purple-600 dark:text-purple-400 hover:underline font-sans"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
