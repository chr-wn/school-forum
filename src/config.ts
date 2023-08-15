import { Home, Search, Bookmark, Inbox, User } from "lucide-react";

export const INFINITE_SCROLL_PAGINATION_RESULTS = 2;
export const SIDEBAR_ITEMS = [
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
];
