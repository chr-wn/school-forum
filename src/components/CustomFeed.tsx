import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import PostFeed from "@/components/PostFeed";
import { notFound } from "next/navigation";

const CustomFeed = async () => {
  const session = await getAuthSession();

  // only rendered if session exists, so this will not happen
  if (!session) return notFound();

  const followedCategories = await db.follow.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      category: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      category: {
        name: {
          in: followedCategories.map((category) => category.category.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
