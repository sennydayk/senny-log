"use client";

import { useEffect, useState } from "react";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  content: string;
};

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 마크다운 콘텐츠에서 헤딩 추출
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const extractedHeadings: HeadingItem[] = [];
    const idCounts = new Map<string, number>();
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // 중복된 ID가 있으면 숫자를 붙여서 고유하게 만들기
      const count = idCounts.get(baseId) || 0;
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      idCounts.set(baseId, count + 1);

      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // 스크롤 시 현재 보고 있는 섹션 하이라이트
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // 헤더 높이만큼 여백
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1">
      <h4 className="text-sm font-semibold text-card-foreground mb-3 font-sans">
        목차
      </h4>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}
            className="text-sm"
          >
            <button
              onClick={() => handleClick(id)}
              className={`
                text-left w-full transition-colors hover:text-primary dark:hover:text-purple-400 font-sans
                ${
                  activeId === id
                    ? "text-primary dark:text-purple-400 font-bold"
                    : "text-muted-foreground cursor-pointer"
                }
              `}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

