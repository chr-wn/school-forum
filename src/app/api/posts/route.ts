import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // await sleep(2000);

  const url = new URL(req.url);

  try {
    const { limit, page, userId, categoryURL } = z
      .object({
        limit: z.string(),
        page: z.string(),
        userId: z.string().nullish().optional(),
        categoryURL: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        userId: url.searchParams.get("userId"),
        categoryURL: url.searchParams.get("categoryURL"),
      });

    let followedCategoriesIds: string[] = [];

    if (userId) {
      const followedCategories = await db.follow.findMany({
        where: {
          userId: userId,
        },
        include: {
          category: true,
        },
      });

      followedCategoriesIds = followedCategories.map(
        (follow) => follow.category.id
      );
    }

    let whereClause = {};

    if (userId) {
      whereClause = {
        category: {
          id: {
            in: followedCategoriesIds,
          },
        },
      };
    } else if (categoryURL) {
      whereClause = {
        category: {
          url: categoryURL,
        },
      };
    } else {
      whereClause = {};
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
