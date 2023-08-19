import { db } from "@/lib/db";
import { CategoryDescriptionValidator } from "@/lib/validators/category";
import { headers } from "next/headers";
import { z } from "zod";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { description } = CategoryDescriptionValidator.parse(body);

  try {
    await db.category.update({
      where: {
        id: headers().get("category-id")!,
      },
      data: {
        description: description,
      },
    });

    return new Response("Category updated!");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      console.log("error is instance of z.ZodError");
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update category", { status: 500 });
  }
}
