export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  introduction: string;
  content: string;
  thumbnail: string;
};

// 로컬 포스트는 노션 연동 후 비활성화
const BLOG_POSTS: BlogPost[] = [];

function sortByDateDesc(a: BlogPost, b: BlogPost): number {
  const timeA = new Date(a.date).getTime();
  const timeB = new Date(b.date).getTime();
  return timeB - timeA;
}

/**
 * 노션과 로컬 포스트를 통합하여 반환
 * 노션 API 사용 시 서버 컴포넌트에서만 호출 가능
 */
export async function getAllPostsWithNotion(): Promise<BlogPost[]> {
  // 노션 API가 설정되어 있으면 노션에서 가져오기
  if (process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID) {
    const { getNotionPosts } = await import("./notion");
    const notionPosts = await getNotionPosts();
    // 노션 포스트와 로컬 포스트 병합 (노션 우선)
    return [...notionPosts, ...BLOG_POSTS].sort(sortByDateDesc);
  }
  // 노션 미설정 시 로컬 포스트만 반환
  return [...BLOG_POSTS].sort(sortByDateDesc);
}

/**
 * 로컬 포스트만 반환 (클라이언트 컴포넌트용)
 */
export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(sortByDateDesc);
}

export async function getPostBySlugWithNotion(
  slug: string
): Promise<BlogPost | null> {
  const posts = await getAllPostsWithNotion();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post ?? null;
}

export async function getAllSlugsWithNotion(): Promise<string[]> {
  const posts = await getAllPostsWithNotion();
  return posts.map((p) => p.slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export async function getAllCategoriesWithNotion(): Promise<string[]> {
  const posts = await getAllPostsWithNotion();
  const categories = posts.map((p) => p.category);
  return Array.from(new Set(categories));
}

export function getAllCategories(): string[] {
  const categories = BLOG_POSTS.map((p) => p.category);
  return Array.from(new Set(categories));
}

export function getPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category).sort(sortByDateDesc);
}

export function getRecentPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export async function getRecentPostsWithNotion(
  limit: number = 3
): Promise<BlogPost[]> {
  const posts = await getAllPostsWithNotion();
  return posts.slice(0, limit);
}

// 블로그 활동 통계 타입
export type CategoryStats = {
  name: string;
  count: number;
  percentage: number;
};

export type HeatmapData = {
  date: string;
  count: number;
  week: number;
  day: number;
  year: number;
};

export type BlogStats = {
  totalPosts: number;
  monthlyPosts: number;
  categories: CategoryStats[];
  heatmap: HeatmapData[];
};

/**
 * 블로그 활동 통계 가져오기
 */
export async function getBlogStats(): Promise<BlogStats> {
  const posts = await getAllPostsWithNotion();
  const totalPosts = posts.length;

  // 이번 달 포스트 수 계산
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyPosts = posts.filter((post) => {
    const postDate = new Date(post.date);
    return (
      postDate.getMonth() === currentMonth &&
      postDate.getFullYear() === currentYear
    );
  }).length;

  // 카테고리별 통계 계산
  const categoryMap = new Map<string, number>();
  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  const categories: CategoryStats[] = Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalPosts > 0 ? Math.round((count / totalPosts) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // 히트맵 데이터 생성 (최근 1년, 52주)
  const heatmap: HeatmapData[] = [];
  const totalDays = 365; // 1년

  // 1년치 날짜별 데이터 생성
  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const year = date.getFullYear();
    const dayOfWeek = date.getDay(); // 0(일) ~ 6(토)

    // 연초부터의 주차 계산
    const startOfYear = new Date(year, 0, 1);
    const daysSinceStart = Math.floor(
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    const week = Math.floor(daysSinceStart / 7);

    const count = posts.filter((post) => post.date === dateStr).length;

    heatmap.push({
      date: dateStr,
      count,
      week,
      day: dayOfWeek,
      year,
    });
  }

  return {
    totalPosts,
    monthlyPosts,
    categories,
    heatmap,
  };
}
