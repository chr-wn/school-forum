import { Icons } from "@/components/ui/Icons";
import "@/styles/globals.css";

export const metadata = {
  title: "WebsiteTitle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:text-black dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[#09090b] dark:bg-white" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo />
          TheWebsiteTitle
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This forum has saved me countless hours of work and helped
              me deliver stunning essays to my English teacher faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}
