"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import { Home, Users, Archive, Bookmark, Inbox, User } from "lucide-react";

const NavbarItems: FC = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/home",
        icon: Home,
      },
      {
        label: "Communities",
        href: "/communities",
        icon: Users,
      },
      {
        label: "Messages",
        href: "/messages",
        icon: Inbox,
      },
      {
        label: "Archive",
        href: "/archive",
        icon: Archive,
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

  return (
    <div className="space-y-2.5 mt-4 mb-2.5">
      {routes.map((item) => (
        <div className="flex">
          <Link
            key={item.label}
            className={`flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation basis-auto ${
              pathname == item.href && "font-bold"
            }`}
            href={item.href}
          >
            <item.icon strokeWidth={pathname == item.href ? 3 : 2} />
            <span className="hidden xl:inline">{item.label}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavbarItems;
