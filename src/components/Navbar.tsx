import Link from "next/link";
import { Icons } from "./ui/Icons";
import { Plus } from "lucide-react";
import NavbarItems from "./NavbarItems";

import { getAuthSession } from "@/lib/auth";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[300px] p-2 h-full">
      <div className="flex basis-auto">
        <Link
          href="/home"
          className="flex items-center justify-center w-14 h-14 hoverAnimation p-0"
        >
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
        </Link>
      </div>

      <NavbarItems />

      <button className="hidden xl:inline bg-brand text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-brand-hover">
        Create Post
      </button>
      <Plus
        className="hidden sm:flex p-2 xl:hidden bg-brand text-white rounded-full text-lg font-bold shadow-md hover:bg-brand-hover cursor-pointer"
        size={40}
      />

      <UserMenu user={session!.user} />
    </div>
  );
};

export default Navbar;
