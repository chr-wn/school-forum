import { db } from "@/lib/db";
import { CategoryNameValidator } from "@/lib/validators/category";
import { headers } from "next/headers";
import { z } from "zod";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { name } = CategoryNameValidator.parse(body);

  try {
    await db.category.update({
      where: {
        id: headers().get("category-id")!,
      },
      data: {
        name: name,
      },
    });

    return new Response("Name updated!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update name", { status: 500 });
  }
}
