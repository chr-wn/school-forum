import { z } from "zod";

export const CategoryValidator = z.object({
  name: z.string().min(1).max(30),
  url: z.string().min(1),
  image: z.string(),
  description: z.string().min(1).max(500),
});

export const CategoryImageValidator = z.object({
  image: z.string(),
});

export const CategoryNameValidator = z.object({
  name: z.string().min(1).max(30),
});

export const CategoryDescriptionValidator = z.object({
  description: z.string().min(1).max(500),
});

export const CategoryFollowValidator = z.object({
  categoryId: z.string(),
});

export type CreateCategoryPayload = z.infer<typeof CategoryValidator>;
export type CategoryImagePayload = z.infer<typeof CategoryImageValidator>;
export type CategoryNamePayload = z.infer<typeof CategoryNameValidator>;
export type CategoryDescriptionPayload = z.infer<
  typeof CategoryDescriptionValidator
>;
export type FollowCategoryPayload = z.infer<typeof CategoryFollowValidator>;
