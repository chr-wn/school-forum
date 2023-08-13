import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCategoriesIds: string[] = [];

  if (session) {
    const followedCategories = await db.follow.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    });

    followedCategoriesIds = followedCategories.map(
      (follow) => follow.category.id
    );
  }

  try {
    const { limit, page, categoryName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        categoryName: z.string().nullish().optional(),
      })
      .parse({
        categoryName: url.searchParams.get("categoryName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    if (categoryName) {
      whereClause = {
        category: {
          name: categoryName,
        },
      };
    } else if (session) {
      whereClause = {
        category: {
          id: {
            in: followedCategoriesIds,
          },
        },
      };
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
