import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./ui/Icons";
import SidebarItems from "./SidebarItems";
import UserMenu from "./UserMenu";
import { buttonVariants } from "./ui/Button";

export async function Sidebar() {
  const session = await getAuthSession();

  return (
    <div className="hidden lg:flex lg:w-[80px] xl:w-[250px] flex-col space-y-4 py-4 items-center justify-center xl:justify-start h-screen sticky top-0">
      <div className="flex basis-auto h-fit px-6">
        <Link
          href="/home"
          className={cn(buttonVariants({ variant: "link" }), "w-fit p-0")}
        >
          <Icons.logo />
          <span className="hidden xl:inline ml-2 text-lg">Acme Inc</span>
        </Link>
      </div>

      <SidebarItems />

      <div className="flex grow"></div>

      {session?.user && <UserMenu user={session.user} />}
    </div>
  );
}
