"use client";

import React, { useState } from "react";

export const Component = () => {
  return (
    <section className="grid place-content-center gap-2 bg-background w-full h-screen text-black">
      <FlipLink href="https://x.com/thisis_vaib">Twitter</FlipLink>
      <FlipLink href="https://linkedin.com/in/vaib215">Linkedin</FlipLink>
      <FlipLink href="https://github.com/vaib215">Github</FlipLink>
      <FlipLink href="https://instagram.com/thisis_vaib">Instagram</FlipLink>
    </section>
  );
};

const flipLetterStyles =
  "inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]";
const flipLetterStylesOverlay =
  "inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0";

function letterSpanClass(base: string, letter: string) {
  const spaceClass = letter === " " ? " min-w-[0.25em]" : "";
  return base + spaceClass;
}

function FlipLetters({ text }: { text: string }) {
  return (
    <>
      <div className="flex">
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className={letterSpanClass(flipLetterStyles, letter)}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className={letterSpanClass(flipLetterStylesOverlay, letter)}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </>
  );
}

const TRANSITION = "transform 300ms ease-in-out";

function FlipLettersWithState({
  text,
  hovered,
  wrap = false,
}: {
  text: string;
  hovered: boolean;
  wrap?: boolean;
}) {
  const flexClass = wrap ? "flex flex-wrap" : "flex";
  const baseClass = "inline-block";
  const getClass = (letter: string) =>
    letter === " " ? `${baseClass} min-w-[0.25em]` : baseClass;
  return (
    <>
      <span className={flexClass}>
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className={getClass(letter)}
            style={{
              transition: TRANSITION,
              transitionDelay: `${i * 25}ms`,
              transform: hovered ? "translateY(-110%)" : "translateY(0)",
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span className={`absolute inset-0 ${flexClass}`}>
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className={getClass(letter)}
            style={{
              transition: TRANSITION,
              transitionDelay: `${i * 25}ms`,
              transform: hovered ? "translateY(0)" : "translateY(110%)",
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    </>
  );
}

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <a
      href={href}
      className="group text-primary relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{ lineHeight: 0.75 }}
    >
      <FlipLetters text={children} />
    </a>
  );
};

export interface FlipTextProps {
  children: string;
  className?: string;
  /** 외부에서 호버 상태 제어. 지정 시 onMouseEnter/Leave는 사용하지 않음 */
  hovered?: boolean;
  /** true면 줄바꿈 허용(description 등 긴 문장용) */
  wrap?: boolean;
}

export function FlipText({
  children,
  className = "",
  hovered: controlledHovered,
  wrap = false,
}: FlipTextProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const isControlled = controlledHovered !== undefined;
  const hovered = isControlled ? controlledHovered : internalHovered;
  const whitespaceClass = wrap ? "whitespace-normal" : "whitespace-nowrap";

  return (
    <span
      className={`relative block overflow-hidden ${whitespaceClass} ${className}`}
      onMouseEnter={isControlled ? undefined : () => setInternalHovered(true)}
      onMouseLeave={isControlled ? undefined : () => setInternalHovered(false)}
    >
      <FlipLettersWithState text={children} hovered={hovered} wrap={wrap} />
    </span>
  );
}
