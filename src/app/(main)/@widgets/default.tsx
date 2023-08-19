import AdminPanel from "@/components/Widgets/AdminPanel";
import SearchBar from "@/components/Widgets/SearchBar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const page = async () => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <>
      <SearchBar />
      <div className="sticky top-1">{user?.isAdmin && <AdminPanel />}</div>
    </>
  );
};

export default page;
