"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Github, Globe, Mail, Instagram, Linkedin, BookOpen, Copy, Check } from "lucide-react";

type ContactIconType = "mail" | "github" | "globe" | "instagram" | "velog" | "linkedin";

interface ContactItemBase {
  label: string;
  icon: ContactIconType;
  radius: number;
  tint: string;
  tintHover: string;
}

interface ContactItemEmail extends ContactItemBase {
  type: "email";
  emailAddress: string;
}

interface ContactItemLink extends ContactItemBase {
  type: "link";
  href: string;
}

type ContactItem = ContactItemEmail | ContactItemLink;

const CONTACT_ITEMS: ContactItem[] = [
  {
    type: "email",
    label: "Email",
    emailAddress: "seyeon981217@gmail.com",
    icon: "mail",
    radius: 52,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    type: "link",
    label: "GitHub",
    href: "https://github.com/senny",
    icon: "github",
    radius: 58,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    type: "link",
    label: "Website",
    href: "https://senny.dev",
    icon: "globe",
    radius: 48,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    type: "link",
    label: "Instagram",
    href: "https://instagram.com/senny",
    icon: "instagram",
    radius: 50,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    type: "link",
    label: "Velog",
    href: "https://velog.io/@senny",
    icon: "velog",
    radius: 46,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    type: "link",
    label: "LinkedIn",
    href: "https://linkedin.com/in/senny",
    icon: "linkedin",
    radius: 50,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
];

const ICON_MAP: Record<ContactIconType, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  mail: Mail,
  github: Github,
  globe: Globe,
  instagram: Instagram,
  velog: BookOpen,
  linkedin: Linkedin,
};

interface BallPosition {
  x: number;
  y: number;
}

function getEmailLines(emailAddress: string): [string, string] {
  const atIndex = emailAddress.indexOf("@");
  if (atIndex < 0) return [emailAddress, ""];
  return [emailAddress.slice(0, atIndex + 1), emailAddress.slice(atIndex + 1)];
}

function BallOverlay({
  item,
  x,
  y,
  prevX,
  prevY,
  isHovered,
  copied,
  showTrail,
}: {
  item: ContactItem;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  isHovered: boolean;
  copied?: boolean;
  showTrail: boolean;
}) {
  const Icon = ICON_MAP[item.icon];
  const r = item.radius;
  const isEmail = item.type === "email";
  const showCopyIcon = isEmail && (isHovered || copied);
  const displayLabel = item.type === "email" ? item.emailAddress : item.label;
  const emailLines = item.type === "email" ? getEmailLines(item.emailAddress) : null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
      }}
    >
      {/* 트레일: 공이 움직일 때 은은한 빛/부스러기 */}
      {showTrail && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r - 6,
              top: r - 6,
              width: 12,
              height: 12,
              backgroundColor: "rgba(128, 128, 128, 0.2)",
              filter: "blur(4px)",
              transform: `translate(${(prevX - x) * 0.5}px, ${(prevY - y) * 0.5}px)`,
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r - 8,
              top: r - 8,
              width: 16,
              height: 16,
              backgroundColor: "rgba(128, 128, 128, 0.12)",
              filter: "blur(6px)",
              transform: `translate(${(prevX - x) * 0.8}px, ${(prevY - y) * 0.8}px)`,
            }}
          />
        </>
      )}
      <div
        className="w-full h-full rounded-full flex items-center justify-center relative transition-all duration-300 cursor-pointer"
        style={{
          background: isHovered ? item.tintHover : item.tint,
          border: `1.5px solid ${isHovered ? "rgba(115,115,115,0.3)" : "rgba(200,200,200,0.2)"}`,
          boxShadow: isHovered
            ? "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)",
          transform: `scale(${isHovered ? 1.08 : 1})`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="absolute inset-[2px] rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12), transparent 60%)",
          }}
        />
        {showCopyIcon ? (
          <div className="flex items-center justify-center relative z-10">
            {copied ? (
              <Check
                className="transition-all duration-300"
                style={{
                  width: 22,
                  height: 22,
                  color: "var(--color-foreground)",
                }}
              />
            ) : (
              <Copy
                className="transition-all duration-300"
                style={{
                  width: 22,
                  height: 22,
                  color: "var(--color-foreground)",
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 relative z-10 px-0.5">
            <Icon
              className="transition-all duration-300 shrink-0"
              style={{
                width: isHovered ? 22 : 18,
                height: isHovered ? 22 : 18,
                color: isHovered
                  ? "var(--color-foreground)"
                  : "var(--color-muted-foreground)",
              }}
            />
            {emailLines ? (
              <span
                className="text-[10px] font-medium tracking-wide transition-colors duration-300 text-center leading-tight"
                style={{
                  color: isHovered
                    ? "var(--color-foreground)"
                    : "var(--color-muted-foreground)",
                }}
              >
                <span className="block">{emailLines[0]}</span>
                <span className="block">{emailLines[1]}</span>
              </span>
            ) : (
              <span
                className="text-[10px] font-medium tracking-wide transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis text-center min-w-0 max-w-full"
                style={{
                  color: isHovered
                    ? "var(--color-foreground)"
                    : "var(--color-muted-foreground)",
                }}
              >
                {displayLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const LERP_FOLLOW = 0.08;
const LERP_REST = 0.05;
const DROP_START_OFFSET = 120;
const GRAVITY = 0.35;
const RESTITUTION = 0.58;
const LAND_VELOCITY_THRESHOLD = 0.2;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getDefaultPositions(width: number, height: number): BallPosition[] {
  const positions: BallPosition[] = [];
  const margin = 24;
  for (let i = 0; i < CONTACT_ITEMS.length; i++) {
    const r = CONTACT_ITEMS[i].radius;
    const minX = r + margin;
    const maxX = width - r - margin;
    const minY = r + margin;
    const maxY = height - r - margin;
    let x: number;
    let y: number;
    let attempts = 0;
    do {
      x = minX + Math.random() * (maxX - minX);
      y = minY + Math.random() * (maxY - minY);
      const tooClose = positions.some((p, j) => {
        const otherR = CONTACT_ITEMS[j].radius;
        const dist = Math.hypot(p.x - x, p.y - y);
        return dist < r + otherR + 16;
      });
      if (!tooClose || attempts > 30) break;
      attempts++;
    } while (true);
    positions.push({ x: clamp(x, r, width - r), y: clamp(y, r, height - r) });
  }
  return positions;
}

function findClosestBallIndex(
  mx: number,
  my: number,
  pos: BallPosition[]
): number {
  let best = -1;
  let bestD2 = Infinity;
  for (let i = 0; i < pos.length; i++) {
    const dx = pos[i].x - mx;
    const dy = pos[i].y - my;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = i;
    }
  }
  return best;
}

export default function ContactBalls() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef<BallPosition>({ x: 0, y: 0 });
  const isInsideRef = useRef(false);
  const defaultPositionsRef = useRef<BallPosition[]>(CONTACT_ITEMS.map(() => ({ x: 0, y: 0 })));
  const positionsRef = useRef<BallPosition[]>(
    CONTACT_ITEMS.map(() => ({ x: 0, y: 0 }))
  );
  const dropPhaseRef = useRef(true);
  const dropVelocityRef = useRef<number[]>(CONTACT_ITEMS.map(() => 0));
  const dropLandedRef = useRef<boolean[]>(CONTACT_ITEMS.map(() => false));
  const pointerDownRef = useRef<{ x: number; y: number; time: number; ballIndex: number } | null>(null);

  const [positions, setPositions] = useState<BallPosition[]>(
    CONTACT_ITEMS.map(() => ({ x: 0, y: 0 }))
  );
  const prevPositionsRef = useRef<BallPosition[]>(CONTACT_ITEMS.map(() => ({ x: 0, y: 0 })));
  const [prevPositions, setPrevPositions] = useState<BallPosition[]>(
    CONTACT_ITEMS.map(() => ({ x: 0, y: 0 }))
  );
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [copiedEmailIndex, setCopiedEmailIndex] = useState(-1);

  const getContainerPoint = useCallback(
    (clientX: number, clientY: number): BallPosition => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: clientX - rect.left, y: clientY - rect.top };
    },
    []
  );

  const findBallIndexAt = useCallback((px: number, py: number): number => {
    const pos = positionsRef.current;
    for (let i = 0; i < CONTACT_ITEMS.length; i++) {
      const r = CONTACT_ITEMS[i].radius;
      const dx = pos[i].x - px;
      const dy = pos[i].y - py;
      if (dx * dx + dy * dy <= r * r) return i;
    }
    return -1;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const pt = getContainerPoint(e.clientX, e.clientY);
      mouseRef.current = { x: pt.x, y: pt.y };
      isInsideRef.current = true;
      const idx = findBallIndexAt(pt.x, pt.y);
      setHoveredIndex(idx);
    },
    [getContainerPoint, findBallIndexAt]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const pt = getContainerPoint(e.clientX, e.clientY);
      const ballIndex = findBallIndexAt(pt.x, pt.y);
      pointerDownRef.current = { x: pt.x, y: pt.y, time: Date.now(), ballIndex };
    },
    [getContainerPoint, findBallIndexAt]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const down = pointerDownRef.current;
      pointerDownRef.current = null;
      if (!down || down.ballIndex < 0) return;

      const pt = getContainerPoint(e.clientX, e.clientY);
      const dx = pt.x - down.x;
      const dy = pt.y - down.y;
      const dist = Math.hypot(dx, dy);
      const elapsed = Date.now() - down.time;

      if (dist < 12 && elapsed < 220) {
        const item = CONTACT_ITEMS[down.ballIndex];
        if (item.type === "link") {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else if (item.type === "email") {
          navigator.clipboard.writeText(item.emailAddress);
          setCopiedEmailIndex(down.ballIndex);
          window.setTimeout(() => setCopiedEmailIndex(-1), 2000);
        }
      }
    },
    [getContainerPoint]
  );

  const handlePointerLeave = useCallback(() => {
    setHoveredIndex(-1);
    pointerDownRef.current = null;
    isInsideRef.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || cancelled) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      sizeRef.current = { width, height };
      const defaults = getDefaultPositions(width, height);
      defaultPositionsRef.current = defaults;
      const startPositions: BallPosition[] = defaults.map((d, i) => ({
        x: d.x,
        y: -CONTACT_ITEMS[i].radius - DROP_START_OFFSET,
      }));
      positionsRef.current = [...startPositions];
      dropPhaseRef.current = true;
      dropVelocityRef.current = CONTACT_ITEMS.map(() => 0);
      dropLandedRef.current = CONTACT_ITEMS.map(() => false);
      mouseRef.current = { x: width / 2, y: height / 2 };
      setPositions([...startPositions]);
    });

    observer.observe(container);

    const tick = () => {
      if (cancelled) return;
      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const pos = positionsRef.current;
      const defaults = defaultPositionsRef.current;
      const next: BallPosition[] = [];

      if (dropPhaseRef.current) {
        const vel = dropVelocityRef.current;
        const landed = dropLandedRef.current;
        for (let i = 0; i < CONTACT_ITEMS.length; i++) {
          const targetX = defaults[i].x;
          const targetY = defaults[i].y;
          if (landed[i]) {
            next.push({ x: targetX, y: targetY });
            continue;
          }
          vel[i] += GRAVITY;
          let nx = pos[i].x + (targetX - pos[i].x) * 0.12;
          let ny = pos[i].y + vel[i];
          if (ny >= targetY) {
            ny = targetY;
            vel[i] = -vel[i] * RESTITUTION;
            if (Math.abs(vel[i]) < LAND_VELOCITY_THRESHOLD) {
              vel[i] = 0;
              landed[i] = true;
              next.push({ x: targetX, y: targetY });
              continue;
            }
          }
          next.push({ x: nx, y: ny });
        }
        const allLanded = landed.every(Boolean);
        if (allLanded) {
          for (let i = 0; i < CONTACT_ITEMS.length; i++) {
            next[i] = { ...defaults[i] };
          }
          dropPhaseRef.current = false;
        }
      } else {
        const mouse = mouseRef.current;
        const following =
          isInsideRef.current ? findClosestBallIndex(mouse.x, mouse.y, pos) : -1;
        for (let i = 0; i < CONTACT_ITEMS.length; i++) {
          const r = CONTACT_ITEMS[i].radius;
          const isThisFollowing = following === i;
          const targetX = isThisFollowing
            ? clamp(mouse.x, r, width - r)
            : defaults[i].x;
          const targetY = isThisFollowing
            ? clamp(mouse.y, r, height - r)
            : defaults[i].y;
          const lerp = isThisFollowing ? LERP_FOLLOW : LERP_REST;
          next.push({
            x: pos[i].x + (targetX - pos[i].x) * lerp,
            y: pos[i].y + (targetY - pos[i].y) * lerp,
          });
        }
      }

      prevPositionsRef.current = [...pos];
      positionsRef.current = next;
      setPrevPositions([...pos]);
      setPositions([...next]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const TRAIL_DISTANCE_THRESHOLD = 0.8;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[360px] overflow-hidden rounded-lg bg-secondary border border-border select-none touch-none"
      style={{ cursor: "pointer" }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {CONTACT_ITEMS.map((item, i) => {
        const curr = positions[i];
        const prev = prevPositions[i];
        const dist = Math.hypot(curr.x - prev.x, curr.y - prev.y);
        const showTrail = dist > TRAIL_DISTANCE_THRESHOLD;
        return (
          <BallOverlay
            key={item.label}
            item={item}
            x={curr.x}
            y={curr.y}
            prevX={prev.x}
            prevY={prev.y}
            isHovered={hoveredIndex === i}
            copied={item.type === "email" ? copiedEmailIndex === i : undefined}
            showTrail={showTrail}
          />
        );
      })}

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[11px] text-muted-foreground/40 font-medium tracking-wide">
          move cursor · click to visit
        </p>
      </div>
    </div>
  );
}
