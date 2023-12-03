import Directory from "@/components/Directory";

const page: React.FC = () => {
  return (
    <>
      <div className="text-primary flex flex-col items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg:background border-b border-border backdrop-blur">
        <div className="flex w-full justify-start">
          <Directory />
        </div>
      </div>
    </>
  );
};

export default page;
