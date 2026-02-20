"use client";

import React, { useState, useEffect, useRef } from "react";
import type { BlogStats } from "@/lib/posts";
import { BarChart3, TrendingUp } from "lucide-react";

type BlogActivityDashboardProps = {
  stats: BlogStats;
};

export function BlogActivityDashboard({ stats }: BlogActivityDashboardProps) {
  const [activeTab, setActiveTab] = useState<"heatmap" | "categories">(
    "heatmap"
  );
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countUp, setCountUp] = useState({ total: 0, monthly: 0 });
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  // 연도별 필터링 (실제 포스트가 있는 연도만)
  const availableYears = Array.from(
    new Set(
      stats.heatmap
        .filter((d) => d.count > 0)
        .map((d) => d.year)
    )
  ).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || 2025
  );

  // 클라이언트 마운트 체크
  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);

    // 카운트업 애니메이션
    const duration = 1000;
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCountUp({
        total: Math.floor(stats.totalPosts * progress),
        monthly: Math.floor(stats.monthlyPosts * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCountUp({
          total: stats.totalPosts,
          monthly: stats.monthlyPosts,
        });
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);

  // 히트맵을 가장 최근 날짜(오른쪽 끝)로 스크롤
  useEffect(() => {
    if (heatmapScrollRef.current && activeTab === "heatmap") {
      setTimeout(() => {
        if (heatmapScrollRef.current) {
          heatmapScrollRef.current.scrollLeft =
            heatmapScrollRef.current.scrollWidth;
        }
      }, 100);
    }
  }, [activeTab, selectedYear]);

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "var(--color-border)";
    if (count === 1) return "var(--color-muted-foreground)";
    if (count === 2) return "var(--color-foreground)";
    return "var(--color-foreground)";
  };

  const getHeatmapOpacity = (count: number) => {
    if (count === 0) return 0.3;
    if (count === 1) return 0.5;
    if (count === 2) return 0.75;
    return 1;
  };

  const getCategoryColor = (index: number) => {
    const opacities = [1, 0.7, 0.5, 0.3];
    return `color-mix(in srgb, var(--color-foreground) ${(opacities[index % opacities.length]) * 100}%, transparent)`;
  };

  // 클라이언트 마운트 전에는 기본 레이아웃만 표시
  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="mt-3 mb-4">
          <h3 className="text-md font-bold text-foreground mb-1 font-sans">
            Blog Activity
          </h3>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-secondary rounded" />
          <div className="h-32 bg-secondary rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="mt-3 mb-4">
        <h3 className="text-md font-bold text-foreground mb-1 font-sans">
          Blog Activity
        </h3>
      </div>

      {/* 탭 */}
      <div className="flex gap-0 mb-4 border-b border-border">
        <button
          onClick={() => setActiveTab("heatmap")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs transition-colors font-sans relative ${
            activeTab === "heatmap"
              ? "font-bold text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
              : "font-medium text-muted-foreground cursor-pointer hover:text-foreground"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          활동 히트맵
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs transition-colors font-sans relative ${
            activeTab === "categories"
              ? "font-bold text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
              : "font-medium text-muted-foreground cursor-pointer hover:text-foreground"
          }`}
        >
          <BarChart3 className="w-3 h-3" />
          카테고리
        </button>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="overflow-hidden">
        {activeTab === "heatmap" ? (
          <div className="space-y-4">
            {/* 통계 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-md p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1 font-sans">
                  Total Posts
                </div>
                <div className="text-2xl font-bold text-foreground font-sans">
                  {countUp.total}
                </div>
              </div>
              <div className="bg-secondary rounded-md p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1 font-sans">
                  This Month
                </div>
                <div className="text-2xl font-bold text-foreground font-sans flex items-center gap-1">
                  {countUp.monthly}
                </div>
              </div>
            </div>

            {/* 연도 선택 */}
            {availableYears.length > 1 && (
              <div className="flex gap-2 mb-3">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors font-sans ${
                      selectedYear === year
                        ? "font-bold text-foreground bg-secondary border border-border"
                        : "font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            {/* 히트맵 */}
            <div className="relative">
              <div className="flex items-start gap-2">
                {/* 연도 레이블 */}
                <div className="text-xs font-medium text-muted-foreground pt-1 font-sans w-10 shrink-0">
                  {selectedYear}
                </div>

                {/* 히트맵 그리드 */}
                <div ref={heatmapScrollRef} className="flex-1 overflow-x-auto">
                  <div className="flex gap-0.5">
                    {(() => {
                      // 선택된 연도의 데이터만 필터링
                      const yearData = stats.heatmap.filter(
                        (d) => d.year === selectedYear
                      );

                      // 주차별로 그룹화
                      const weekGroups = new Map<number, typeof yearData>();
                      yearData.forEach((data) => {
                        if (!weekGroups.has(data.week)) {
                          weekGroups.set(data.week, []);
                        }
                        weekGroups.get(data.week)?.push(data);
                      });

                      // 주차 순서대로 정렬
                      const sortedWeeks = Array.from(weekGroups.keys()).sort(
                        (a, b) => a - b
                      );

                      return sortedWeeks.map((weekIndex) => {
                        const weekData = weekGroups.get(weekIndex) || [];

                        return (
                          <div
                            key={weekIndex}
                            className="flex flex-col gap-0.5"
                          >
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const cellData = weekData.find(
                                (d) => d.day === dayIndex
                              );
                              const isHovered =
                                hoveredCell === `${weekIndex}-${dayIndex}`;

                              return (
                                <div
                                  key={`${weekIndex}-${dayIndex}`}
                                  className={`w-2.5 h-2.5 rounded-sm transition-all duration-200 cursor-pointer ${
                                    isLoaded
                                      ? "opacity-100 scale-100"
                                      : "opacity-0 scale-0"
                                  } ${
                                    isHovered
                                      ? "ring-1 ring-foreground/50 scale-125 z-10"
                                      : ""
                                  }`}
                                  style={{
                                    backgroundColor: getHeatmapColor(
                                      cellData?.count || 0
                                    ),
                                    opacity: getHeatmapOpacity(cellData?.count || 0),
                                    transitionDelay: `${
                                      (weekIndex * 7 + dayIndex) * 2
                                    }ms`,
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredCell(`${weekIndex}-${dayIndex}`)
                                  }
                                  onMouseLeave={() => setHoveredCell(null)}
                                  title={
                                    cellData
                                      ? `${cellData.date}: ${cellData.count} posts`
                                      : "No data"
                                  }
                                />
                              );
                            })}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* 범례 */}
              <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground font-sans">
                <span>Less</span>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{
                        backgroundColor: getHeatmapColor(level),
                        opacity: getHeatmapOpacity(level),
                      }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {stats.categories.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4 font-sans">
                아직 작성된 글이 없습니다.
              </p>
            ) : (
              stats.categories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex items-center justify-between p-2.5 rounded-md hover:bg-secondary transition-colors duration-200 cursor-pointer ${
                    isLoaded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getCategoryColor(index) }}
                    />
                    <span className="font-medium text-foreground text-sm font-sans">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-20 h-1.5 bg-secondary rounded-sm overflow-hidden border border-border">
                      <div
                        className="h-full transition-all duration-1000 ease-out bg-foreground"
                        style={{
                          width: isLoaded ? `${category.percentage}%` : "0%",
                          opacity: 1 - index * 0.2,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground w-6 text-right font-sans">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
