"use client";

import React, { useState, useEffect, useRef } from "react";
import type { BlogStats } from "@/lib/posts";
import { BarChart3, TrendingUp, Activity } from "lucide-react";

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

  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);

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
    if (count === 0) return "rgba(128, 128, 128, 0.1)"; 
    if (count === 1) return "rgba(204, 255, 0, 0.3)"; 
    if (count === 2) return "rgba(204, 255, 0, 0.6)"; 
    return "rgba(204, 255, 0, 1)"; // Acid Lime
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "#ccff00", // Lime
      "#ff0099", // Pink
      "#00ffff", // Cyan
      "#ffffff", // White
    ];
    return colors[index % colors.length];
  };

  if (!isMounted) {
    return (
      <div className="w-full font-mono text-xs">
        <div className="animate-pulse text-primary">LOADING_SYSTEM_METRICS...</div>
      </div>
    );
  }

  return (
    <div className="w-full font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-dashed border-muted pb-2">
         <div className="flex items-center gap-2 text-xs font-bold">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span>SYSTEM_ACTIVITY</span>
         </div>
         <div className="flex gap-1">
            <button
               onClick={() => setActiveTab("heatmap")}
               className={`px-2 py-0.5 text-[10px] border ${activeTab === "heatmap" ? "bg-primary text-black border-primary" : "border-muted text-muted-foreground hover:text-foreground"}`}
            >
               HEATMAP
            </button>
            <button
               onClick={() => setActiveTab("categories")}
               className={`px-2 py-0.5 text-[10px] border ${activeTab === "categories" ? "bg-primary text-black border-primary" : "border-muted text-muted-foreground hover:text-foreground"}`}
            >
               CATEGORY
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="overflow-hidden">
        {activeTab === "heatmap" ? (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-muted p-2 bg-black/20">
                <div className="text-[10px] text-muted-foreground mb-1">TOTAL_LOGS</div>
                <div className="text-xl font-bold text-white">{String(countUp.total).padStart(3, '0')}</div>
              </div>
              <div className="border border-muted p-2 bg-black/20">
                <div className="text-[10px] text-muted-foreground mb-1">CURRENT_MONTH</div>
                <div className="text-xl font-bold text-primary">{String(countUp.monthly).padStart(2, '0')}</div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="relative bg-black/40 p-2 border border-muted">
               {/* Year Selector */}
               {availableYears.length > 1 && (
                 <div className="absolute top-2 right-2 flex gap-1 z-10">
                   {availableYears.map((year) => (
                     <button
                       key={year}
                       onClick={() => setSelectedYear(year)}
                       className={`text-[10px] px-1 ${selectedYear === year ? "text-primary underline" : "text-muted-foreground"}`}
                     >
                       {year}
                     </button>
                   ))}
                 </div>
               )}

              <div className="flex items-start gap-2 overflow-x-auto pb-1" ref={heatmapScrollRef}>
                <div className="flex gap-0.5 min-w-full">
                    {(() => {
                      const yearData = stats.heatmap.filter(d => d.year === selectedYear);
                      const weekGroups = new Map<number, typeof yearData>();
                      yearData.forEach((data) => {
                        if (!weekGroups.has(data.week)) weekGroups.set(data.week, []);
                        weekGroups.get(data.week)?.push(data);
                      });
                      const sortedWeeks = Array.from(weekGroups.keys()).sort((a, b) => a - b);

                      return sortedWeeks.map((weekIndex) => {
                        const weekData = weekGroups.get(weekIndex) || [];
                        return (
                          <div key={weekIndex} className="flex flex-col gap-0.5">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const cellData = weekData.find(d => d.day === dayIndex);
                              return (
                                <div
                                  key={`${weekIndex}-${dayIndex}`}
                                  className="w-2 h-2 transition-colors duration-300"
                                  style={{
                                    backgroundColor: getHeatmapColor(cellData?.count || 0),
                                  }}
                                  title={cellData ? `${cellData.date}: ${cellData.count}` : ""}
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
          </div>
        ) : (
          <div className="space-y-2">
             {stats.categories.map((category, index) => (
                <div key={category.name} className="flex items-center gap-2 text-xs">
                   <div className="w-16 text-right shrink-0 truncate">{category.name}</div>
                   <div className="flex-1 h-2 bg-muted/20 relative overflow-hidden">
                      <div 
                         className="h-full absolute top-0 left-0"
                         style={{ 
                            width: `${category.percentage}%`, 
                            backgroundColor: getCategoryColor(index) 
                         }}
                      />
                   </div>
                   <div className="w-6 text-right font-bold text-primary">{category.count}</div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
