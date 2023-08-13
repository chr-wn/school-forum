import Directory from "@/components/Directory";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";

export const metadata = {
  title: "Home | WebsiteTitle",
};

export default function RootLayout({
  children,
  widgets,
}: {
  children: React.ReactNode;
  widgets: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center m-0 p-0 min-h-screen">
        <Sidebar />

        <div className="text-primary flex-grow border-l border-r border-border max-w-2xl">
          <div className="text-primary flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg:background border-b border-border backdrop-blur">
            <Directory />
          </div>
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
