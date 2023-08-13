import { Editor } from "@/components/Editor";
import PostCategorySelector from "@/components/PostCategorySelector";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const category = await db.category.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!category) return notFound();

  return (
    <div className="flex flex-col items-center gap-6 m-5">
      {/* heading */}

      {/* form */}
      <PostCategorySelector />

      <Editor categoryId={category.id} />
    </div>
  );
};

export default page;
