"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Github, Globe, Mail } from "lucide-react";

interface ContactItem {
  label: string;
  href: string;
  icon: "mail" | "github" | "globe";
  radius: number;
  tint: string;
  tintHover: string;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Email",
    href: "mailto:senny@email.com",
    icon: "mail",
    radius: 52,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    label: "GitHub",
    href: "https://github.com/senny",
    icon: "github",
    radius: 58,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
  {
    label: "Website",
    href: "https://senny.dev",
    icon: "globe",
    radius: 48,
    tint: "rgba(163,163,163,0.12)",
    tintHover: "rgba(115,115,115,0.25)",
  },
];

const ICON_MAP = {
  mail: Mail,
  github: Github,
  globe: Globe,
} as const;

interface BallPosition {
  x: number;
  y: number;
}

function BallOverlay({
  item,
  x,
  y,
  isHovered,
}: {
  item: ContactItem;
  x: number;
  y: number;
  isHovered: boolean;
}) {
  const Icon = ICON_MAP[item.icon];
  const r = item.radius;

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
      <div
        className="w-full h-full rounded-full flex items-center justify-center relative transition-all duration-300"
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
        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <Icon
            className="transition-all duration-300"
            style={{
              width: isHovered ? 22 : 18,
              height: isHovered ? 22 : 18,
              color: isHovered
                ? "var(--color-foreground)"
                : "var(--color-muted-foreground)",
            }}
          />
          <span
            className="text-[10px] font-medium tracking-wide transition-colors duration-300"
            style={{
              color: isHovered
                ? "var(--color-foreground)"
                : "var(--color-muted-foreground)",
            }}
          >
            {item.label}
          </span>
        </div>
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
  return CONTACT_ITEMS.map((item, i) => {
    const r = item.radius;
    const t = CONTACT_ITEMS.length + 1;
    const x = (width * (i + 1)) / t;
    const y = height / 2 + (i - 1) * 28;
    return { x: clamp(x, r, width - r), y: clamp(y, r, height - r) };
  });
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
  const [hoveredIndex, setHoveredIndex] = useState(-1);

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
        if (item.href.startsWith("mailto:")) {
          window.location.href = item.href;
        } else {
          window.open(item.href, "_blank", "noopener,noreferrer");
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

      positionsRef.current = next;
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[360px] overflow-hidden rounded-lg bg-secondary border border-border select-none touch-none"
      style={{ cursor: hoveredIndex >= 0 ? "pointer" : "default" }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {CONTACT_ITEMS.map((item, i) => (
        <BallOverlay
          key={item.label}
          item={item}
          x={positions[i].x}
          y={positions[i].y}
          isHovered={hoveredIndex === i}
        />
      ))}

      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-[11px] text-muted-foreground/40 font-medium tracking-wide">
          move cursor · click to visit
        </p>
      </div>
    </div>
  );
}
