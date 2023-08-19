"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { toast } from "@/hooks/use-toast";
import { CreateCategoryPayload } from "@/lib/validators/category";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./ui/Spinner";
import { Textarea } from "./ui/Textarea";

export default function CreateCategoryModal() {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { loginToast } = useCustomToasts();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCategoryPayload = {
        name: input,
        url: url,
        image: "/categoryicon.png",
        description: description,
      };

      const { data } = await axios.post("/api/category", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "URL is taken.",
            description: "Please choose a different url.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid category options",
            description:
              "The name cannot be more than 30 characters long and the description cannot be more than 500 characters long.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create category.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/categories/${data}`);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Category URLs cannot be changed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right w-fit">
              Name
            </Label>
            <Input
              id="name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="col-span-3"
              maxLength={30}
            />
            <Label htmlFor="url" className="text-right w-fit">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              className="col-span-3"
            />
          </div>
          {url.length > 0 && <span>Location: acme.edu/categories/{url}</span>}
        </div>
        <div className="flex">
          <Label htmlFor="description" className="text-right w-fit">
            Description
          </Label>
          <div className="grow"></div>
          <span className="text-[12px]">{500 - description.length}/500</span>
        </div>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none text-[15px] placeholder:text-[15px] focus:outline-none mb-4"
          maxLength={500}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={
              input.length === 0 ||
              url.length === 0 ||
              description.length === 0 ||
              isLoading
            }
            onClick={() => createCommunity()}
          >
            {isLoading && <Spinner />}
            Create Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
