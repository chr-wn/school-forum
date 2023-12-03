import MiniCreatePost from "@/components/MiniCreatePost";
import CategoryFeed from "@/components/feeds/CategoryFeed";
import { getAuthSession } from "@/lib/auth";

interface PageProps {
  params: {
    slug: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;

  const session = await getAuthSession();

  return (
    <>
      <CategoryFeed userSession={session} categoryURL={slug} />
    </>
  );
};

export default page;
