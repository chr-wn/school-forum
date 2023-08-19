"use client";

import { Category, User } from "@prisma/client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/Button";
import TextareaAutosize from "react-textarea-autosize";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { toast } from "@/hooks/use-toast";
import { CategoryDescriptionPayload } from "@/lib/validators/category";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { Pen } from "lucide-react";

interface CategoryDescriptionProps {
  category: Category;
  user: User | null;
}

const CategoryDescription: React.FC<CategoryDescriptionProps> = ({
  category,
  user,
}) => {
  const [input, setInput] = useState<string>(category.description);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaContainerRef = useRef<HTMLDivElement>(null);
  const alertTriggerRef = useRef<HTMLButtonElement>(null);
  const { loginToast } = useCustomToasts();

  useOnClickOutside(textareaContainerRef, () => {
    if (input !== category.description) alertTriggerRef.current?.click();
    else {
      setInput(category.description);
      setIsEditing(false);
    }
  });

  const { mutate: updateCategory, isLoading } = useMutation({
    mutationFn: async () => {
      if (!input) return;

      const payload: CategoryDescriptionPayload = {
        description: input,
      };

      let config = {
        headers: {
          "category-id": category.id,
        },
      };

      const { data } = await axios.patch(
        "/api/category/update/description",
        payload,
        config
      );

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log("Error status: ", err.response?.status);

        if (err.response?.status === 401) {
          return loginToast();
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid category description",
            description: "The description cannot be more than 500 characters",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not update category.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Category updated successfully!",
        description:
          "It may take up to 24 hours for changes to fully take effect.",
        variant: "default",
      });
      setIsEditing(false);
    },
  });

  return (
    <>
      {user?.isAdmin ? (
        <>
          {isEditing ? (
            <>
              <div
                className="flex flex-col justify-between h-fit w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ref={textareaContainerRef}
              >
                <TextareaAutosize
                  id="description"
                  value={input}
                  ref={textareaRef}
                  onChange={(e) => setInput(e.target.value)}
                  minRows={1}
                  placeholder="Tell everyone about this category."
                  className="w-full bg-inherit resize-none text-[15px] placeholder:text-[15px] focus:outline-none no-scrollbar mb-4"
                  maxLength={500}
                />
                <div className="flex justify-between w-full items-center text-[12px]">
                  <span className="">
                    {500 - input.length} characters remaining
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-red-500"
                      disabled={isLoading}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => updateCategory()}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger ref={alertTriggerRef}></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Save changes before leaving?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You have made some changes to the category. Do you wish to
                      leave this menu without saving?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        setInput(category.description);
                        setIsEditing(false);
                      }}
                    >
                      Discard
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => updateCategory()}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              {category.description.replace(/\s/g, "").length !== 0 &&
              input.replace(/\s/g, "").length !== 0 ? (
                <>
                  <div
                    className="flex items-center text-[15px] hover:transition-all hover:p-1 hover:pl-2 hover:border border-foreground rounded-sm mr-2 cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    <p className="break-words w-full">
                      {input}
                      {/* <Pen className="inline ml-2" size={12} /> */}
                    </p>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Add Description
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <div>{category.description}</div>
      )}
    </>
  );
};

export default CategoryDescription;
