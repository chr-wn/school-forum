import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/Toaster";

export const metadata = {
  title: "Home | WebsiteTitle",
};

export default function Layout({
  children,
  widgets,
  navbar,
}: {
  children: React.ReactNode;
  widgets: React.ReactNode;
  navbar: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center m-0 p-0 min-h-screen">
        <Sidebar />

        <div className="text-primary flex-grow border-l border-r border-border max-w-2xl">
          {navbar}
          {children}
        </div>

        <div className="hidden lg:inline ml-8 lg:w-[300px] py-1 space-y-5">
          {widgets}
        </div>
      </div>
      <Toaster />
    </>
  );
}
