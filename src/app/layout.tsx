import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import SearchProvider from "@/components/SearchProvider";
import SearchButton from "@/components/SearchButton";
import { getAllPosts } from "@/lib/mdx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aibrief24 - 60-second AI news",
  description: "60-second AI news, bytes & hacks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getAllPosts();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <SearchProvider posts={posts}>
          {/* Fixed top bar */}
          <header className="bg-brand-black text-brand-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo.svg" 
                  alt="aibrief24 Logo" 
                  width={40} 
                  height={40}
                  className="rounded-md"
                />
                <span className="font-bold text-xl">aibrief24</span>
              </Link>
            </div>
            <div className="text-sm md:text-base">
              60-second AI news, bytes & hacks.
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/" className="hover:text-brand-accent transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-brand-accent transition-colors">
                About
              </Link>
              <SearchButton />
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-brand-black text-brand-white p-4 text-center text-sm">
            <div className="container mx-auto">
              © {new Date().getFullYear()} aibrief24. All rights reserved.
            </div>
          </footer>
        </SearchProvider>
      </body>
    </html>
  );
}
