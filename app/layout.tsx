import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Senny Log",
  description: "Senny's Digital Atelier - A 3D Design System Portfolio",
  generator: "Cursor",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning className="overflow-x-hidden selection:bg-primary/30">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {/* Floating Glass Navigation */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
              <nav className="mx-auto flex h-16 items-center justify-between rounded-full border border-white/40 bg-white/30 px-6 shadow-clay-md backdrop-blur-xl transition-all duration-300 hover:bg-white/40 dark:bg-black/30 dark:border-white/10 dark:hover:bg-black/40 hover:shadow-float">
                <Link 
                  href="/" 
                  className="text-xl font-black tracking-tight text-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
                    Senny
                  </span>
                  <span className="ml-1 opacity-80">Log</span>
                </Link>
                
                <div className="flex items-center gap-2">
                  <Link href="/blog">
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/40 dark:hover:bg-white/10 font-medium">
                      Blog
                    </Button>
                  </Link>
                  <div className="h-4 w-px bg-foreground/10 mx-2" />
                  <ThemeToggle />
                </div>
              </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
              {children}
            </main>

            {/* Simple Footer */}
            <footer className="py-8 text-center text-sm text-muted-foreground/60">
              <p>© {new Date().getFullYear()} Senny Log. Designed with Claymorphism.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
