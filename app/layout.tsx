import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

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

          {/* Main Device Casing - Lovely Compact Style */}
          <div className="w-full max-w-6xl min-h-[90vh] bg-background/95 backdrop-blur-md border-2 border-border rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(74,21,75,0.2),8px_8px_0px_0px_rgba(255,102,179,0.2)] relative overflow-hidden flex flex-col z-10">
            
            {/* Top Bar */}
            <header className="h-12 border-b-2 border-border bg-[#F3E5F5] flex items-center justify-between px-4 sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF66B3] border border-border"></div>
                  <div className="w-3 h-3 rounded-full bg-[#D4B2FF] border border-border"></div>
                  <div className="w-3 h-3 rounded-full bg-[#A0E7E5] border border-border"></div>
                </div>
                <span className="ml-2 font-display font-bold text-sm text-foreground/80 tracking-tight">
                  Senny.os <span className="text-primary text-xs">♥</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="hidden md:block overflow-hidden w-40 bg-white/50 border border-border rounded-full px-3 py-0.5 text-[10px] font-bold text-muted-foreground">
                    <div className="animate-marquee whitespace-nowrap">
                      Have a Lovely Day! ✨ Keep Recording... 💜
                    </div>
                 </div>
                <ThemeToggle />
              </div>
            </header>

            {/* Main Screen Content */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="h-8 bg-[#F3E5F5] text-muted-foreground text-[10px] flex items-center justify-center font-medium border-t-2 border-border">
              Built with <span className="text-destructive mx-1">♥</span> by Senny
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
