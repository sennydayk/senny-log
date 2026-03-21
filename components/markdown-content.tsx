"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

type MarkdownContentProps = {
  content: string;
};

// 마크다운 콘텐츠에서 모든 헤딩을 미리 파싱하여 ID 매핑 생성
function createHeadingIdMap(content: string): Map<string, string> {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const idMap = new Map<string, string>();
  const idCounts = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const baseId = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // 중복된 ID가 있으면 숫자를 붙여서 고유하게 만들기
    const count = idCounts.get(baseId) || 0;
    const uniqueId = count === 0 ? baseId : `${baseId}-${count + 1}`;
    idCounts.set(baseId, count + 1);

    // 원본 텍스트를 key로 하여 고유 ID 저장
    idMap.set(text, uniqueId);
  }

  return idMap;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // 콘텐츠가 변경될 때만 ID 매핑 재생성
  const headingIdMap = useMemo(() => createHeadingIdMap(content), [content]);

  // 헤딩 텍스트로부터 ID를 가져오는 헬퍼 함수
  const getHeadingId = (children: React.ReactNode): string => {
    const text = String(children);
    return headingIdMap.get(text) || text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <h1
              id={id}
              className="text-4xl font-bold text-card-foreground mb-6 mt-8 first:mt-0 font-sans scroll-mt-20"
            >
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <h2
              id={id}
              className="text-3xl font-semibold text-card-foreground mb-4 mt-8 font-sans scroll-mt-20"
            >
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const id = getHeadingId(children);
          return (
            <h3
              id={id}
              className="text-2xl font-semibold text-card-foreground mb-3 mt-6 font-sans scroll-mt-20"
            >
              {children}
            </h3>
          );
        },
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
            <code
              className="px-1.5 py-0.5 rounded text-sm font-mono text-primary dark:text-[#C678DC]"
              style={{
                backgroundColor: "var(--inline-code-bg)",
              }}
            >
              {children}
            </code>
          );
        },
        img: ({ src, alt }) => {
          const imageSrc = typeof src === "string" ? src : "/placeholder.svg";

          return (
            <span className="block my-6 relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={imageSrc}
                alt={alt || ""}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </span>
          );
        },
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
            className="text-primary dark:text-primary hover:underline font-sans"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="my-6 w-full overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-secondary">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-border">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-border">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="border border-border px-4 py-2 text-left font-semibold text-card-foreground font-sans bg-secondary">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2 text-left text-card-foreground font-sans">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
