import { getAllPostsMetadata, getAllCategoriesWithNotion } from "@/lib/posts";
import { BlogList } from "@/components/blog-list";

export default async function BlogIndexPage() {
  const allPosts = await getAllPostsMetadata();
  const categories = await getAllCategoriesWithNotion();

  return <BlogList posts={allPosts} categories={categories} />;
}
