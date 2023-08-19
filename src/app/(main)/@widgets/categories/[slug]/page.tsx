import CategoryInfo from "@/components/Widgets/CategoryInfo";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

interface pageProps {
  params: { slug: string };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <>
      <CategoryInfo slug={params.slug} user={user} />
    </>
  );
};

export default page;
