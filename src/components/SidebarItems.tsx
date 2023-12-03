"use client";

import { SIDEBAR_ITEMS } from "@/config";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/Button";
import { ScrollArea } from "./ui/ScrollArea";

interface SidebarItemsProps {
  categories: Category[];
}

const SidebarItems: FC<SidebarItemsProps> = ({ categories }) => {
  const pathname = usePathname();

  const routes = SIDEBAR_ITEMS;

  return (
    <>
      <div className="px-3 py-2 h-fit w-full">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hidden xl:block">
          Discover
        </h2>
        <div className="space-y-1 p-2 flex flex-col items-center">
          {routes.map((item) => (
            <Button
              key={item.label}
              asChild
              variant={`${pathname === item.href ? "secondary" : "ghost"}`}
              className="xl:w-full w-fit flex justify-center xl:justify-start "
            >
              <Link href={`${item.href}`}>
                <item.icon className="xl:mr-2.5" strokeWidth={1} />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="px-3 py-2 h-fit hidden xl:block w-full">
        {categories.length > 0 && (
          <>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Following
            </h2>
            <ScrollArea className="h-[200px]">
              <div className="space-y-1 p-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    asChild
                    variant={"ghost"}
                    className="w-full flex justify-start"
                  >
                    <Link href={`/categories/${category.url}`}>
                      <div className="rounded-full overflow-hidden h-[25px] w-[25px] mr-2">
                        <Image
                          src={category.image}
                          alt="Category Icon"
                          width={50}
                          height={50}
                          sizes="100vw"
                          className="h-full w-auto rounded-full object-cover"
                        />
                      </div>
                      <span className="hidden xl:inline">{category.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarItems;
