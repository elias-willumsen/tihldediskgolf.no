import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import AnimationProvider from "./animation-provider";
import AnimationToggle from "@/components/AnimationToggle";
import BackgroundLayer from "@/components/BackgroundLayer"; // den er client component nå

export const metadata: Metadata = {
  title: "TIHLDE Diskgolf",
  description: "Ting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <AnimationProvider>
          <Providers>
            <BackgroundLayer />

            <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
              <div className="mx-auto max-w-4xl p-4 flex items-center gap-4">
                <Link
                  href="/"
                  className="font-semibold"
                  aria-label="TIHLDE Diskgolf home"
                >
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto sm:h-9 rounded-4xl motion-safe:hover:animate-spin motion-safe:active:animate-bounce"
                  />
                </Link>
                <nav className="ml-auto flex items-center gap-2">
                  <Link
                    href="/players"
                    className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Players
                  </Link>
                  <Link
                    href="/games"
                    className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    Games
                  </Link>
                  <AnimationToggle />
                  <ThemeToggle />
                </nav>
              </div>
            </header>

            <main className="mx-auto max-w-4xl p-4">
              <div className="rounded-2xl border bg-white/80 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
                {children}
              </div>
            </main>
          </Providers>
        </AnimationProvider>
      </body>
    </html>
  );
}
