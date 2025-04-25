import type { Metadata } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Topbar from "@/components/topbar/topbar";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
});

const title = "MyAnimeGameList";
const description = "Created by lecterkn with gemini-2.5 pro";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} ${notoSansJp.variable} antialiased`}>
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
          <Topbar />
          {children}
          <footer className="text-center text-gray-500 mt-8 py-4 border-t border-gray-300">
            <p>
              {metadata.title?.toString()} - {metadata.description?.toString()}
            </p>
            <p>Copyright 2025 - lecterkn</p>
          </footer>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
