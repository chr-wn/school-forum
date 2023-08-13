import MiniCreatePost from "@/components/MiniCreatePost";
import { getAuthSession } from "@/lib/auth";

const Home = async () => {
  const session = await getAuthSession();

  return (
    <>
      <MiniCreatePost session={session} />
      <div>Feed</div>
    </>
  );
};

export default Home;
