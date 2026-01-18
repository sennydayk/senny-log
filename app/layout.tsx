import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, Heart } from "lucide-react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SENNY_LOG // LOVELY_SYSTEM",
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
        className={`${jetbrainsMono.variable} antialiased min-h-screen flex flex-col items-center justify-center p-2 md:p-4 bg-[#EADCF8]`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Grain/Noise Texture */}
          <div className="grain-overlay"></div>

          {/* Main Device Casing - Glass Style */}
          <div className="w-full max-w-6xl min-h-[90vh] bg-white/20 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col z-10 transition-all duration-500">
            
            {/* Top Bar */}
            <header className="h-14 border-b border-white/10 dark:border-white/5 bg-white/20 dark:bg-black/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60 shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60 shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/60 shadow-inner"></div>
                </div>
                <span className="ml-4 font-display font-bold text-sm text-foreground/70 tracking-tight flex items-center gap-2">
                  Senny.os <span className="text-primary text-xs opacity-50">v2.0</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="hidden md:block overflow-hidden w-48 bg-black/5 dark:bg-white/10 border border-white/10 rounded-full px-4 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md shadow-inner">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-2">
                      Have a Lovely Day! <Sparkles className="w-3 h-3 inline text-yellow-400" /> Keep Recording... <Heart className="w-3 h-3 inline text-red-400" />
                    </div>
                 </div>
                <ThemeToggle />
              </div>
            </header>

            {/* Main Screen Content */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide p-1">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="h-10 bg-white/20 dark:bg-black/20 backdrop-blur-xl text-muted-foreground text-[10px] flex items-center justify-center font-medium border-t border-white/10 dark:border-white/5">
              Built with <Heart className="w-3 h-3 text-primary mx-1 fill-primary" /> by Senny
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
