import { getAllPostsWithNotion, getAllCategoriesWithNotion } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";

export const revalidate = 3600; // 1시간마다 재검증

export default async function BlogIndexPage() {
  const allPosts = await getAllPostsWithNotion();
  const categories = await getAllCategoriesWithNotion();

  return <BlogList posts={allPosts} categories={categories} />;
}
