"use client";

import React from "react";
import type { Session } from "next-auth";
import HomeFeed from "./feeds/HomeFeed";

interface NavbarHomeCombinerProps {
  userSession: Session | null;
  children: React.ReactNode;
}

const NavbarHomeCombiner: React.FC<NavbarHomeCombinerProps> = ({
  userSession,
  children,
}) => {
  const [filterType, setFilterType] = React.useState("all");

  return (
    <>
      <div className="text-primary flex flex-col items-center sm:justify-between py-2 px-3 sticky top-0 z-50 border-top border-border backdrop-blur-lg">
        <div className="flex w-full justify-start">{children}</div>
        <div className="flex w-full h-[50px] items-center">
          <div
            className="w-full h-full flex flex-col items-center cursor-pointer"
            onClick={() => setFilterType("all")}
          >
            <div
              className={`h-full w-full flex items-center justify-center ${
                filterType === "all" && "font-bold"
              }`}
            >
              All
            </div>
            <div
              className={`h-[4px] w-[100px] bg-foreground rounded-sm ${
                filterType !== "all" && "invisible"
              }`}
            />
          </div>
          <div
            className="w-full h-full flex flex-col items-center cursor-pointer"
            onClick={() => setFilterType("following")}
          >
            <div
              className={`h-full w-full flex items-center justify-center  ${
                filterType === "following" && "font-bold"
              }`}
            >
              Following
            </div>
            <div
              className={`h-[4px] w-[100px] bg-foreground rounded-sm ${
                filterType !== "following" && "invisible"
              }`}
            />
          </div>
        </div>
      </div>

      <HomeFeed userSession={userSession} filterType={filterType} />
    </>
  );
};

export default NavbarHomeCombiner;
