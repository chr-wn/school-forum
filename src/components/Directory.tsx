import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FC } from "react";
import DirectoryMenu from "./DirectoryMenu";

const Directory: FC = async () => {
  const session = await getAuthSession();

  const follows = await db.follow.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      category: true,
    },
  });

  const categories = follows.map((follow) => follow.category);

  return <DirectoryMenu categories={categories} />;
};

export default Directory;
