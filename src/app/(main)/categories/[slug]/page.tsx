import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
// import PostFeed from '@/components/PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;

  const session = await getAuthSession();

  const category = await db.category.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!category) return notFound();

  return (
    <>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={category.posts} categoryName={category.name} />
    </>
  );
};

export default page;
