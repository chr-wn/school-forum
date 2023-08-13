"use client";

import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Home,
  Search,
  Bookmark,
  Inbox,
  User,
  Palette,
  Activity,
  Monitor,
  Book,
} from "lucide-react";
import { Apple, Film, Music, BookOpen, Code, Globe } from "lucide-react";
import { ScrollArea } from "./ui/ScrollArea";

interface SidebarItemsProps {}

const SidebarItems: FC<SidebarItemsProps> = ({}) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/home",
        icon: Home,
      },
      {
        label: "Explore",
        href: "/explore",
        icon: Search,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: Inbox,
      },
      {
        label: "Bookmarks",
        href: "/bookmarks",
        icon: Bookmark,
      },
      {
        label: "Profile",
        href: "/profile",
        icon: User,
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      {
        label: "Cafeteria",
        href: "/cafeteria",
        icon: Apple,
      },
      {
        label: "Orchestra",
        href: "/orchestra",
        icon: Music,
      },
      {
        label: "English",
        href: "/english",
        icon: BookOpen,
      },
      {
        label: "Math",
        href: "/math",
        icon: Code,
      },
      {
        label: "Science",
        href: "/science",
        icon: Globe,
      },
      {
        label: "History",
        href: "/history",
        icon: Film,
      },
      {
        label: "Physical Education",
        href: "/pe",
        icon: Activity,
      },
      {
        label: "Art",
        href: "/art",
        icon: Palette,
      },
      {
        label: "Computer Science",
        href: "/cs",
        icon: Monitor,
      },
      {
        label: "Library",
        href: "/library",
        icon: Book,
      },
    ],
    []
  );

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
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Following
        </h2>
        <ScrollArea className="h-[250px]">
          <div className="space-y-1 p-2">
            {categories.map((item) => (
              <Button
                key={item.label}
                asChild
                variant={`${pathname === item.href ? "secondary" : "ghost"}`}
                className="w-full flex justify-start"
              >
                <Link href={`${item.href}`}>
                  <item.icon className="mr-2.5" strokeWidth={1} />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default SidebarItems;
