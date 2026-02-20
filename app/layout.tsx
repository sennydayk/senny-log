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
  title: "SENNY.LOG",
  description: "Personal Blog of Senny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Container */}
          <div className="w-full max-w-5xl mx-auto min-h-screen flex flex-col">
            
            {/* Top Bar */}
            <header className="h-14 border-b border-border flex items-center justify-between px-6 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
              <a href="/" className="font-display font-bold text-sm text-foreground tracking-tight">
                senny.log
              </a>
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 scrollbar-hide">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="h-10 text-muted-foreground text-xs flex items-center justify-center font-medium border-t border-border">
              &copy; {new Date().getFullYear()} Senny
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
