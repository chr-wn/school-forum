"use client";

import { useInfinitePosts } from "@/hooks/use-posts";
import type { Session } from "next-auth";
import { FC } from "react";
import MiniCreatePost from "../MiniCreatePost";
import Post from "../Post";
import Spinner from "../ui/Spinner";

interface PostFeedProps {
  userSession: Session | null;
  filterType: string;
}

const PostFeed: FC<PostFeedProps> = ({ userSession, filterType }) => {
  const { posts, isLoading, isFetchingNextPage, ref } = useInfinitePosts(
    filterType,
    userSession
  );

  return (
    <>
      <MiniCreatePost session={userSession} />

      <ul className="flex flex-col col-span-2 ">
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post, index) => {
              const votesAmt = post.votes.reduce((acc, vote) => {
                if (vote.type === "UP") return acc + 1;
                if (vote.type === "DOWN") return acc - 1;
                return acc;
              }, 0);

              const currentVote = post.votes.find(
                (vote) => vote.userId === userSession?.user.id
              );

              if (index === posts.length - 2) {
                // Add a ref to the last post in the list
                return (
                  <li key={post.id} ref={ref}>
                    <Post
                      post={post}
                      commentAmt={post.comments.length}
                      category={post.category}
                      votesAmt={votesAmt}
                      currentVote={currentVote}
                    />
                  </li>
                );
              } else {
                return (
                  <li key={post.id}>
                    <Post
                      key={post.id}
                      post={post}
                      commentAmt={post.comments.length}
                      category={post.category}
                      votesAmt={votesAmt}
                      currentVote={currentVote}
                    />
                  </li>
                );
              }
            })}

            {isFetchingNextPage && (
              <li className="flex justify-center items-center h-[80px]">
                <Spinner className="w-6 h-6" />
              </li>
            )}
          </>
        ) : (
          <>
            {!isLoading && (
              <li className="flex justify-center items-center h-[80px]">
                There are no posts yet.
              </li>
            )}
          </>
        )}
        {isLoading && (
          <li className="flex justify-center items-center h-[80px]">
            <Spinner className="w-6 h-6" />
          </li>
        )}
      </ul>
    </>
  );
};

export default PostFeed;
