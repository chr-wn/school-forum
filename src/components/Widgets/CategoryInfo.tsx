import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import CategoryDescription from "../CategoryDescription";
import CategoryIcon from "../CategoryImage";
import FollowToggle from "../FollowToggle";
import { buttonVariants } from "../ui/Button";
import { Widget, WidgetBody, WidgetTitle } from "../ui/Widget";
import CategoryName from "../CategoryName";

interface CategoryInfoProps {
  slug: string;
  user: User | null;
}

const CategoryInfo: React.FC<CategoryInfoProps> = async ({ slug, user }) => {
  const session = await getAuthSession();
  const shortNumber = require("short-number");

  const category = await db.category.findFirst({
    where: { url: slug },
  });

  const follow = !session?.user
    ? undefined
    : await db.follow.findFirst({
        where: {
          category: {
            url: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isFollowing = !!follow;

  if (!category) return notFound();

  const followerCount = await db.follow.count({
    where: {
      category: {
        url: slug,
      },
    },
  });

  return (
    <Widget className="justify-center">
      <WidgetTitle className="mb-2">
        <div className="flex justify-start gap-2 items-center h-[50px] mb-2">
          <CategoryIcon category={category} user={user} />
          <CategoryName category={category} user={user} />
        </div>
      </WidgetTitle>
      <WidgetBody>
        <CategoryDescription category={category} user={user} />
        <div className="text-muted-foreground mt-3">
          <p>Created {format(category.createdAt, "MMMM d, yyyy")}</p>
        </div>

        <hr className="my-3" />

        <div className="flex gap-[40px]">
          <div>
            <div>{shortNumber(followerCount)}</div>
            <p className="text-muted-foreground text-[12px]">
              {followerCount !== 1 ? "Followers" : "Follower"}
            </p>
          </div>
          <div>
            <div>256</div>
            <p className="text-muted-foreground text-[12px]">Online</p>
          </div>
          <div>
            <div>Top 20%</div>
            <p className="text-muted-foreground text-[12px]">Ranked by Size</p>
          </div>
        </div>

        <hr className="my-3" />

        <Link
          className={buttonVariants({
            className: "w-full mt-1 mb-2",
          })}
          href={`/categories/${slug}/submit`}
        >
          Create Post
        </Link>

        <FollowToggle
          isFollowing={isFollowing}
          categoryId={category.id}
          categoryName={category.name}
        />
      </WidgetBody>
    </Widget>
  );
};

export default CategoryInfo;
