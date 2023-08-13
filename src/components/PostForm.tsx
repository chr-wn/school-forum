import { getAuthSession } from "@/lib/auth";
import React from "react";
import { HiOutlineListBullet, HiOutlinePhoto } from "react-icons/hi2";
import UserAvatar from "./UserAvatar";

type PostFormProps = {};

const PostForm: React.FC<PostFormProps> = async () => {
  const session = await getAuthSession();

  return (
    <div
      className={`border-b border-border p-3 flex space-x-3 overflow-y-scroll no-scrollbar`}
    >
      <UserAvatar
        user={{
          name: session?.user.name || null,
          image: session?.user.image || null,
        }}
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-border">
        <div className={`space-y-2.5`}>
          <textarea
            name="body"
            rows={2}
            placeholder="What's happening?"
            className="bg-transparent outline-none text-primary text-lg placeholder-muted-foreground tracking-wide w-full min-h-[50px] resize-none"
          />
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon">
              <HiOutlinePhoto className="h-[22px] text-brand" size={28} />
              <input type="file" hidden />
            </div>

            <div className="icon">
              <HiOutlineListBullet className="text-brand h-[22px]" size={28} />
            </div>
          </div>
          <button
            className="bg-brand text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-brand-hover disabled:bg-brand disabled:opacity-50 disabled:cursor-default"
            disabled={true}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostForm;
