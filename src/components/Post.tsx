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
import { FC, useRef, useState } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { Button } from "./ui/Button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";
import { useRouter } from "next/navigation";

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
  const [showFullPost, setshowFullPost] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div
      className="block border-b hover:bg-accent transition-colors"
      onClick={() => {
        router.push(`/categories/${categoryName}/post/${post.id}`);
      }}
    >
      <div className="pt-[8px] relative cursor-pointer">
        {/* post info */}
        <div className="flex flex-nowrap flex-row items-start justify-start mx-[8px] mb-[8px] relative text-[12px] font-normal leading-[16px]">
          {categoryName && (
            <>
              <div className="basis-auto grow-0 shrink-0">
                <Link
                  className="text-[12px] inline"
                  href={`/categories/${categoryName}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
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
            <div className="inline pr-[5px] break-words text-[18px] font-medium leading-[22px]">
              <h3 className="inline">{post.title}</h3>
            </div>
          </div>
        </div>

        {/* post content */}
        <div className="mt-[8px]" ref={pRef}>
          <div
            className={`overflow-hidden pt-[5px] pb-[10px] px-[8px] ${
              !showFullPost && "max-h-[250px]"
            }`}
          >
            <EditorOutput content={post.content} />
          </div>
          {pRef.current?.clientHeight === 250 && !showFullPost && (
            <div className="w-full flex items-center justify-center absolute bottom-[60px] left-0">
              <Button
                className="w-[200px] h-[25px] opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  setshowFullPost(true);
                }}
              >
                Show Full Post
              </Button>
            </div>
          )}
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
                className="px-[4px] flex items-center gap-2 hover:text-blue-500"
              >
                <MessageSquare className="h-4 w-4" /> {commentAmt} comments
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="px-[4px] flex items-center gap-2 hover:text-purple-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Bookmark className="h-4 w-4" />
              Save
            </Button>

            <Button
              variant="ghost"
              className="px-[4px] flex items-center gap-2 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Flag className="h-4 w-4" />
              Report
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 font-bold text-muted-foreground text-[12px]">
                <DropdownMenuItem className="focus:text-muted-foreground">
                  <Clipboard className="mr-2" />
                  Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link
            className="flex grow"
            href={`categories/${categoryName}/post/${post.id}`}
          ></Link>
        </div>
      </div>
    </div>
  );
};
export default Post;
