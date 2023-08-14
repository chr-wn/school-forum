"use client";

import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { PostVoteRequest } from "@/lib/validators/vote";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "../../hooks/use-toast";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { usePathname } from "next/navigation";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVotesAmt,
  initialVote,
}: PostVoteClientProps) => {
  const { loginToast } = useCustomToasts();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);
  const pathname = usePathname();

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };

      await axios.patch("/api/category/post/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your vote was not registered. Please try again.",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div
      className={`flex justify-between items-center px-[2px] h-[24px] w-[86px] ${
        pathname.includes("/post") && "flex-col"
      }`}
    >
      {/* upvote */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          vote("UP");
        }}
        size="sm"
        variant="ghost"
        aria-label="upvote"
        className="h-fit w-fit p-0"
      >
        <ArrowBigUp
          className={`hover:text-emerald-500 ${
            currentVote === "UP" && "fill-emerald-500 text-emerald-500"
          }`}
          strokeWidth={1.5}
        />
      </Button>

      {/* score */}
      <p className={`text-center text-[12px] text-foreground`}>{votesAmt}</p>

      {/* downvote */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          vote("DOWN");
        }}
        size="sm"
        variant="ghost"
        aria-label="downvote"
        className="h-fit w-fit p-0"
      >
        <ArrowBigDown
          onClick={() => vote("DOWN")}
          className={`hover:text-yellow-500 ${
            currentVote === "DOWN" && "fill-yellow-500 text-yellow-500"
          }`}
          strokeWidth={1.5}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;
