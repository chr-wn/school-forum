import CategoryInfo from "@/components/Widgets/CategoryInfo";
import React from "react";

interface pageProps {
  params: { slug: string };
}

const page: React.FC<pageProps> = ({ params }) => {
  return (
    <>
      <CategoryInfo slug={params.slug} />
    </>
  );
};

export default page;
