import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Session } from "next-auth";
import { useRef, useEffect } from "react";

export const useInfinitePosts = (
  filterType: string,
  userSession: Session | null,
  categoryURL?: string
) => {
  const fetchInfinitePosts = async (
    limit: number,
    page: number,
    filterType: string,
    userId?: string,
    categoryURL?: string
  ) => {
    const query =
      `/api/posts?limit=${limit}&page=${page}` +
      (filterType === "following"
        ? `&userId=${userId}`
        : filterType === "category" && `&categoryURL=${categoryURL}`);

    const { data } = await axios.get(query);
    return data as ExtendedPost[];
  };

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["posts", filterType],
      async ({ pageParam = 1 }) =>
        fetchInfinitePosts(
          INFINITE_SCROLL_PAGINATION_RESULTS,
          pageParam,
          filterType,
          userSession?.user.id,
          categoryURL
        ),

      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
      }
    );

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const posts = data?.pages.flatMap((page) => page);

  return { posts, isLoading, fetchNextPage, isFetchingNextPage, ref };
};
