"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Post, User, Vote } from "@prisma/client";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";
import {
  Bookmark,
  Clipboard,
  Flag,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { Button } from "./ui/Button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  categoryName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  categoryName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="block border-b">
      <div className="pt-[8px] relative cursor-pointer">
        {/* post info */}
        <div className="flex flex-nowrap flex-row items-start justify-start mx-[8px] mb-[8px] relative text-[12px] font-normal leading-[16px]">
          {categoryName && (
            <>
              <div className="basis-auto grow-0 shrink-0">
                <Link
                  className="text-[12px] inline"
                  href={`/categories/${categoryName}`}
                >
                  <Image
                    src="/categoryicon.png"
                    alt="Category Icon"
                    height={20}
                    width={20}
                    sizes="100vw"
                    className="inline-block mr-[4px]"
                  />
                </Link>
              </div>
              <div className="flex flex-wrap grow shrink basis-auto overflow-hidden items-center text-muted-foreground">
                <div className="inline text-[12px] leading-[16px]">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Link
                        href={`/categories/${categoryName}`}
                        className="hover:underline font-bold text-foreground"
                      >
                        {categoryName}
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent>View Community</HoverCardContent>
                  </HoverCard>

                  <span className="text-[6px] leading-[20px] mx-[4px] align-middle">
                    •
                  </span>
                  <span className="mr-[3px]">Posted by</span>
                  <div className="inline-block">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link
                          href={`/users/${post.authorId}`}
                          className="hover:underline mr-[3px]"
                        >
                          {post.author.name}
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent>[User Avatar] profile</HoverCardContent>
                    </HoverCard>
                  </div>
                  <span className="inline-block">
                    <HoverCard>
                      <HoverCardTrigger>
                        {formatDistanceToNowStrict(new Date(post.createdAt))}{" "}
                        ago
                      </HoverCardTrigger>
                      <HoverCardContent>
                        {format(new Date(post.createdAt), "MM/dd/yyyy")}
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* post title */}
        <div className="mx-[8px] ">
          <div className="inline relative break-words">
            <Link href={`/categories/${categoryName}/post/${post.id}`}>
              <div className="inline pr-[5px] break-words text-[18px] font-medium leading-[22px]">
                <h3 className="inline">{post.title}</h3>
              </div>
            </Link>
          </div>
        </div>

        {/* post content */}
        <div className="mt-[8px]" ref={pRef}>
          <Link href={`/categories/${categoryName}/post/${post.id}`}>
            <div className="max-h-[250px] overflow-hidden pt-[5px] pb-[10px] px-[8px]">
              <EditorOutput content={post.content} />
              {pRef.current?.clientHeight === 250 && (
                // blur bottom if content is too long
                <div className="absolute bottom-[40px] left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
              )}
            </div>
          </Link>
        </div>

        {/* post options */}
        <div className="flex justify-start items-center z-20 text-muted-foreground text-[12px] h-[40px]">
          {/* vote options */}
          <PostVoteClient
            postId={post.id}
            initialVotesAmt={_votesAmt}
            initialVote={_currentVote?.type}
          />
          <div className="flex -mr-[40px] pr-[8px] pl-[4px] font-bold items-stretch gap-5">
            <Link href={`/categories/${categoryName}/post/${post.id}`}>
              <Button
                variant="ghost"
                className="px-[4px] flex items-center gap-2 hover:text-muted-foreground"
              >
                <MessageSquare className="h-4 w-4" /> {commentAmt} comments
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="px-[4px] flex items-center gap-2 hover:text-muted-foreground"
            >
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button
              variant="ghost"
              className="px-[4px] flex items-center gap-2 hover:text-muted-foreground"
            >
              <Flag className="h-4 w-4" />
              Report
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 font-bold text-muted-foreground text-[12px]">
                <DropdownMenuItem className="focus:text-muted-foreground">
                  <Clipboard className="mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:text-muted-foreground">
                  <Clipboard className="mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:text-muted-foreground">
                  <Clipboard className="mr-2" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
