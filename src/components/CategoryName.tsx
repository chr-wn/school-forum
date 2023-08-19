"use client";

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
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { toast } from "@/hooks/use-toast";
import { CategoryNamePayload } from "@/lib/validators/category";
import { Category, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Pen } from "lucide-react";
import React, { useRef, useState } from "react";

interface CategoryNameProps {
  category: Category;
  user: User | null;
}

const CategoryName: React.FC<CategoryNameProps> = ({ category, user }) => {
  const [input, setInput] = useState<string>(category.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const alertTriggerRef = useRef<HTMLButtonElement>(null);
  const { loginToast } = useCustomToasts();

  useOnClickOutside(inputContainerRef, () => {
    if (input !== category.name && input.length > 0)
      alertTriggerRef.current?.click();
    else {
      setInput(category.name);
      setIsEditing(false);
    }
  });

  const { mutate: updateName, isLoading } = useMutation({
    mutationFn: async () => {
      if (!input) return;

      const payload: CategoryNamePayload = {
        name: input,
      };

      let config = {
        headers: {
          "category-id": category.id,
        },
      };

      const { data } = await axios.patch(
        "/api/category/update/name",
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
            title: "Invalid category name",
            description: "The name cannot be more than 30 characters",
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
                className="flex flex-col h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ref={inputContainerRef}
              >
                <input
                  id="name"
                  value={input}
                  ref={inputRef}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="enter category name"
                  className="w-full bg-inherit resize-none text-[15px] placeholder:text-[15px] focus:outline-none no-scrollbar"
                  maxLength={30}
                />
                <div className="flex justify-between w-full items-center text-[12px]">
                  <span>{30 - input.length}/30</span>
                  <div className="flex gap-2">
                    <button
                      className="text-red-500 disabled:text-opacity-50"
                      disabled={isLoading || input.length === 0}
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="text-blue-500 disabled:text-opacity-50"
                      onClick={() => updateName()}
                      disabled={isLoading || input.length === 0}
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
                        setInput(category.name);
                        setIsEditing(false);
                      }}
                    >
                      Discard
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => updateName()}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <div
              className="flex items-center text-[15px] hover:transition-all hover:p-1 hover:pl-2 hover:border border-foreground rounded-sm mr-2 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <span className="break-words w-[180px]">
                {input}
                {/* <Pen className="inline ml-2" size={12} /> */}
              </span>
            </div>
          )}
        </>
      ) : (
        <div>{category.name}</div>
      )}
    </>
  );
};

export default CategoryName;
