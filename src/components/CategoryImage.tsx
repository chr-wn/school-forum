"use client";

import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { CategoryImagePayload } from "@/lib/validators/category";
import { Category, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface CategoryIconProps {
  category: Category;
  user: User | null;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, user }) => {
  const [selectedFileString, setSelectedFileString] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File[]>();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const { loginToast } = useCustomToasts();

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedFile([event.target.files[0]]);

    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFileString(readerEvent.target?.result as string);
      }
    };
  };

  const { mutate: updateImage, isLoading } = useMutation({
    mutationFn: async () => {
      if (!selectedFile) return;

      const [res] = await uploadFiles(selectedFile, "imageUploader");

      const payload: CategoryImagePayload = {
        image: res.fileUrl,
      };

      let config = {
        headers: {
          "category-id": category.id,
        },
      };

      const { data } = await axios.patch(
        "/api/category/update/image",
        payload,
        config
      );

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not update image.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Image updated successfully!",
        description:
          "It may take up to 24 hours for changes to fully take effect.",
        variant: "default",
      });
      setSelectedFile([]);
      setSelectedFileString("");
    },
  });

  return (
    <>
      <div className="flex items-center flex-col">
        <div className="rounded-full h-[50px] w-[50px] mr-2 relative">
          <div
            className={`absolute text-[10px] text-center overflow-hidden h-full w-full justify-center items-center rounded-full bg-black text-white opacity-0  transition-opacity flex cursor-default ${
              user?.isAdmin && "hover:opacity-70 cursor-pointer"
            }`}
            onClick={() => selectFileRef.current?.click()}
          >
            Edit Image
          </div>
          <Image
            src={selectedFileString ? selectedFileString : category.image}
            alt="Category Icon"
            width={50}
            height={50}
            sizes="100vw"
            className="h-full w-auto rounded-full object-cover"
          />
          {user?.isAdmin && (
            <>
              <input
                id="file-upload"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                hidden
                ref={selectFileRef}
                onChange={onSelectImage}
              />
              {/* <Pen size={24} className="absolute bottom-0 right-0 w-4 h-4" /> */}
            </>
          )}
        </div>
        {selectedFileString && selectedFileString.length > 0 && (
          <div className="flex gap-[2px] items-start">
            <button
              onClick={() => updateImage()}
              disabled={isLoading}
              className="p-0 h-fit text-[9px] text-blue-500 disabled:text-opacity-50"
            >
              {isLoading ? "Saving" : "Save"}
            </button>
            <button
              onClick={() => {
                setSelectedFile([]);
                setSelectedFileString("");
              }}
              disabled={isLoading}
              className="p-0 h-fit text-[9px] text-red-500 disabled:text-opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryIcon;
