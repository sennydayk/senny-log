import HomeContent from "@/components/home-content";
import { getRecentPostsMetadata } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const recentPosts = await getRecentPostsMetadata(3);
  const projects = getAllProjects();

  return (
    <div className="min-h-full px-4 md:px-8 pb-8 md:pb-12 flex flex-col gap-8 max-w-5xl mx-auto relative">
      <HomeContent recentPosts={recentPosts} projects={projects} />
    </div>
  );
}
