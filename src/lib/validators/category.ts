import { z } from "zod";

export const CategoryValidator = z.object({
  name: z.string().min(3).max(21),
});

export const CategoryFollowValidator = z.object({
  categoryId: z.string(),
});

export type CreateCategoryPayload = z.infer<typeof CategoryValidator>;
export type FollowCategoryPayload = z.infer<typeof CategoryFollowValidator>;
