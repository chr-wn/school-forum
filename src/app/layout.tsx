import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "WebsiteTitle",
  description: "description",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen">
        <div className="z-50">
          <NextTopLoader showSpinner={false} />
        </div>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
