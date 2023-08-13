"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Image as ImageIcon, Link2 } from "lucide-react";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-fit px-6 py-4 flex justify-between gap-6 items-center border-b">
      <div className="relative">
        <Link href="/profile">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />
        </Link>
      </div>
      <Input
        onClick={() => router.push(pathname + "/submit")}
        readOnly
        placeholder="Create post"
      />
      <Button
        onClick={() => router.push(pathname + "/submit")}
        variant="ghost"
        className="h-fit p-1 hidden sm:block"
      >
        <ImageIcon className="text-muted-foreground" />
      </Button>
      <Button
        onClick={() => router.push(pathname + "/submit")}
        variant="ghost"
        className="h-fit p-1 hidden sm:block"
      >
        <Link2 className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default MiniCreatePost;
