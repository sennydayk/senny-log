import type React from "react"
import type { Metadata } from "next"
import { Oswald, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "SENNY // MAXIMALISM",
  description: "A digital manifesto of bold ideas and louder designs.",
  generator: "Cursor",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <div className="noise-overlay" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
