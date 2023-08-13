"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreHorizontal } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { ModeToggle } from "./ModeToggle";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";

interface UserMenuProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <Button variant="ghost" className="h-fit w-fit p-2" asChild>
        <DropdownMenuTrigger className="mt-auto mb-2">
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className="h-8 w-8 xl:mr-4"
          />
          <div className="hidden xl:inline leading-5">
            <h4 className="fond-bold">{user.name}</h4>
            <p className="text-muted-foreground w-fit">Student</p>
          </div>
          <MoreHorizontal className="h-5 hidden xl:inline ml-10" />
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* <DropdownMenuItem> inside <ModeToggle />*/}
        <ModeToggle />

        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
