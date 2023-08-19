import { db } from "@/lib/db";
import { CategoryImageValidator } from "@/lib/validators/category";
import { headers } from "next/headers";
import { z } from "zod";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { image } = CategoryImageValidator.parse(body);

  try {
    await db.category.update({
      where: {
        id: headers().get("category-id")!,
      },
      data: {
        image: image,
      },
    });

    return new Response("Image updated!");
  } catch (error) {
    console.log("ERROR: ", error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update image", { status: 500 });
  }
}
