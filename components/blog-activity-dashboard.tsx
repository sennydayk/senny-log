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

  // 연도별 필터링
  const availableYears = Array.from(
    new Set(stats.heatmap.map((d) => d.year))
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
      // 약간의 딜레이를 주어 렌더링이 완료된 후 스크롤
      setTimeout(() => {
        if (heatmapScrollRef.current) {
          heatmapScrollRef.current.scrollLeft =
            heatmapScrollRef.current.scrollWidth;
        }
      }, 100);
    }
  }, [activeTab, selectedYear]);

  const getHeatmapColor = (count: number) => {
    // 깃허브 잔디와 유사한 색상 (보라색 계열)
    if (count === 0) return "#ebedf0"; // 연한 회색 (항상 보임)
    if (count === 1) return "#c084fc"; // 연한 보라색
    if (count === 2) return "#9333ea"; // 중간 보라색
    return "#7e22ce"; // 진한 보라색
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--primary) / 0.7)",
      "hsl(var(--primary) / 0.5)",
      "hsl(var(--primary) / 0.3)",
    ];
    return colors[index % colors.length];
  };

  // 클라이언트 마운트 전에는 기본 레이아웃만 표시
  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="mt-3 mb-4">
          <h3 className="text-md font-bold text-card-foreground mb-1 font-sans">
            Blog Activity
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            최근 작성 활동과 카테고리 현황
          </p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted/20 rounded" />
          <div className="h-32 bg-muted/20 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="mt-3 mb-4">
        <h3 className="text-md font-bold text-card-foreground mb-1 font-sans">
          Blog Activity
        </h3>
        <p className="text-xs text-muted-foreground font-sans">
          최근 작성 활동과 카테고리 현황
        </p>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("heatmap")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all font-sans ${
            activeTab === "heatmap"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground cursor-pointer"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          활동 히트맵
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all font-sans ${
            activeTab === "categories"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground cursor-pointer"
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
              <div className="bg-primary/5 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1 font-sans">
                  Total Posts
                </div>
                <div className="text-2xl font-bold text-primary font-sans">
                  {countUp.total}
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1 font-sans">
                  This Month
                </div>
                <div className="text-2xl font-bold text-primary font-sans flex items-center gap-1">
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
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all font-sans ${
                      selectedYear === year
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground cursor-pointer"
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
                <div className="text-xs font-medium text-muted-foreground pt-1 font-sans w-10 flex-shrink-0">
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
                                  className={`w-2.5 h-2.5 !rounded-sm transition-all duration-200 cursor-pointer border border-transparent ${
                                    isLoaded
                                      ? "opacity-100 scale-100"
                                      : "opacity-0 scale-0"
                                  } ${
                                    isHovered
                                      ? "ring-2 ring-primary/50 scale-125 z-10"
                                      : ""
                                  }`}
                                  style={{
                                    backgroundColor: getHeatmapColor(
                                      cellData?.count || 0
                                    ),
                                    borderRadius: "0.5rem",
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
                      className="w-2.5 h-2.5 !rounded-sm"
                      style={{
                        backgroundColor: getHeatmapColor(level),
                        borderRadius: "0.5rem",
                      }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.categories.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4 font-sans">
                아직 작성된 글이 없습니다.
              </p>
            ) : (
              stats.categories.map((category, index) => (
                <div
                  key={category.name}
                  className={`flex items-center justify-between p-2.5 rounded-lg  transition-all duration-300 cursor-pointer transform hover:scale-105 ${
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
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: getCategoryColor(index) }}
                    />
                    <span className="font-medium text-card-foreground text-sm font-sans">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 ease-out"
                        style={{
                          width: isLoaded ? `${category.percentage}%` : "0%",
                          backgroundColor: getCategoryColor(index),
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
