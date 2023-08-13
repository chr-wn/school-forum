import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import FollowToggle from "../FollowToggle";
import { buttonVariants } from "../ui/Button";
import { Widget, WidgetBody, WidgetTitle } from "../ui/Widget";

interface CategoryInfoProps {
  slug: string;
}

const CategoryInfo: React.FC<CategoryInfoProps> = async ({ slug }) => {
  const session = await getAuthSession();
  const shortNumber = require("short-number");

  const category = await db.category.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const follow = !session?.user
    ? undefined
    : await db.follow.findFirst({
        where: {
          category: {
            name: slug,
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
        name: slug,
      },
    },
  });

  return (
    <Widget className="justify-start p-[12px]">
      <WidgetTitle>
        <div className="flex justify-start items-center h-[50px] mb-2">
          <Image
            src="/categoryicon.png"
            alt="Category Icon"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-auto mr-2"
          />
          <span>{category.name}</span>
        </div>
      </WidgetTitle>
      <WidgetBody>
        <div>Next.js is the React framework for production by Vercel.</div>
        <div className="text-muted-foreground">
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

        {category.creatorId === session?.user?.id ? (
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">You created this community</dt>
          </div>
        ) : null}

        <Link
          className={buttonVariants({
            className: "w-full mt-1 mb-2",
          })}
          href={`/categories/${slug}/submit`}
        >
          Create Post
        </Link>

        {category.creatorId !== session?.user?.id ? (
          <FollowToggle
            isFollowing={isFollowing}
            categoryId={category.id}
            categoryName={category.name}
          />
        ) : null}
      </WidgetBody>
    </Widget>
  );
};

export default CategoryInfo;
