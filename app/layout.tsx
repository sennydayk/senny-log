import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SENNY_LOG // SYSTEM_ONLINE",
  description: "Personal Data Terminal of Senny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col items-center justify-center p-2 md:p-6 bg-neutral-900`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Device Casing */}
          <div className="w-full max-w-7xl min-h-[90vh] bg-background border-4 border-black rounded-3xl shadow-[0_0_0_10px_#333,0_0_0_14px_#111] relative overflow-hidden flex flex-col">
            
            {/* Top Bar / Status Bar */}
            <header className="h-12 border-b-4 border-black bg-secondary flex items-center justify-between px-4 sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-black animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                <span className="ml-2 font-bold uppercase tracking-tighter text-black">SENNY_OS v2.025</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="hidden md:block overflow-hidden w-40 h-6 bg-black text-secondary px-2 text-xs leading-6 uppercase">
                    <div className="animate-marquee whitespace-nowrap">
                      System Optimal... Memory OK... Welcome User...
                    </div>
                 </div>
                <ThemeToggle />
              </div>
            </header>

            {/* Main Screen Content */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide">
              {/* CRT Overlay Layer - Absolute Positioned */}
              <div className="fixed inset-0 crt-overlay z-50 pointer-events-none"></div>
              {children}
            </main>
            
            {/* Footer / Device Label */}
            <footer className="h-8 bg-black text-white text-[10px] flex items-center justify-center uppercase tracking-[0.2em] font-bold">
              Designed by Genius UI // 2025 Edition
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
