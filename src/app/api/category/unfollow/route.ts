import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CategoryFollowValidator } from "@/lib/validators/category";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { categoryId } = CategoryFollowValidator.parse(body);

    // check if user is already following or not
    const isFollowing = await db.follow.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (!isFollowing) {
      return new Response("You are not following this category yet.", {
        status: 400,
      });
    }

    // create category and associate it with the user
    await db.follow.delete({
      where: {
        userId_categoryId: {
          categoryId,
          userId: session.user.id,
        },
      },
    });

    return new Response(categoryId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not unfollow from category at this time. Please try later",
      { status: 500 }
    );
  }
}
