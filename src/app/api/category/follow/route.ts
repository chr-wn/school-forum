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

    // check if user is already following the category
    const categoryExists = await db.follow.findFirst({
      where: {
        categoryId,
        userId: session.user.id,
      },
    });

    if (categoryExists) {
      return new Response("You're already following this category", {
        status: 400,
      });
    }

    // create a category and associate it with the user
    await db.follow.create({
      data: {
        categoryId,
        userId: session.user.id,
      },
    });

    return new Response(categoryId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not follow this category at this time. Please try later",
      { status: 500 }
    );
  }
}
