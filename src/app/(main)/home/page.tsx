import Directory from "@/components/Directory";
import NavbarHomeCombiner from "@/components/NavbarHomeCombiner";
import { getAuthSession } from "@/lib/auth";

const page = async () => {
  const session = await getAuthSession();

  return (
    <>
      <NavbarHomeCombiner userSession={session}>
        <Directory />
      </NavbarHomeCombiner>
    </>
  );
};

export default page;
