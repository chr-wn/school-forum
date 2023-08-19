import AdminPanel from "@/components/Widgets/AdminPanel";
import SearchBar from "@/components/Widgets/SearchBar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <>
      <SearchBar />
      <div className="sticky top-1">
        {user?.isAdmin && <AdminPanel />}
        {children}
      </div>
    </>
  );
};

export default layout;
