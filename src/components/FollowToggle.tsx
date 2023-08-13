"use client";
import { Button } from "@/components/ui/Button";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { FollowCategoryPayload } from "@/lib/validators/category";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useToast } from "../hooks/use-toast";
import Spinner from "./ui/Spinner";

interface FollowToggleProps {
  isFollowing: boolean;
  categoryId: string;
  categoryName: string;
}

const FollowToggle = ({
  isFollowing,
  categoryId,
  categoryName,
}: FollowToggleProps) => {
  const { toast } = useToast();
  const { loginToast } = useCustomToasts();
  const router = useRouter();

  const { mutate: follow, isLoading: isFollowLoading } = useMutation({
    mutationFn: async () => {
      const payload: FollowCategoryPayload = {
        categoryId,
      };

      const { data } = await axios.post("/api/category/follow", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Success!",
        description: `You are now following ${categoryName}`,
      });
    },
  });

  const { mutate: unfollow, isLoading: isUnfollowLoading } = useMutation({
    mutationFn: async () => {
      const payload: FollowCategoryPayload = {
        categoryId,
      };

      const { data } = await axios.post("/api/category/unfollow", payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Error",
        description: err.response?.data as string,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Success!",
        description: `You are no longer following ${categoryName}`,
      });
    },
  });

  return isFollowing ? (
    <Button className="w-full" onClick={() => unfollow()} variant={"outline"}>
      {isUnfollowLoading && <Spinner />}
      Unfollow Category
    </Button>
  ) : (
    <Button className="w-full" onClick={() => follow()} variant={"outline"}>
      {isFollowLoading && <Spinner />}
      Follow Category
    </Button>
  );
};

export default FollowToggle;
