import type { Post, Category, User, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
