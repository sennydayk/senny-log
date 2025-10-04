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
