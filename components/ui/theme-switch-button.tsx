'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [animating, setAnimating] = React.useState<'to-dark' | 'to-light' | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = React.useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setAnimating(next === 'dark' ? 'to-dark' : 'to-light')
    setTheme(next)
  }, [resolvedTheme, setTheme])

  const handleAnimationEnd = React.useCallback(() => {
    setAnimating(null)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  if (!mounted) return <div className="h-8 w-8" />

  const sunAnim = animating === 'to-dark' ? 'animate-icon-out' : animating === 'to-light' ? 'animate-icon-in' : ''
  const moonAnim = animating === 'to-dark' ? 'animate-icon-in' : animating === 'to-light' ? 'animate-icon-out' : ''

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:opacity-80 overflow-hidden ${className}`}
    >
      <Sun
        onAnimationEnd={handleAnimationEnd}
        className={`absolute h-5 w-5 ${sunAnim} ${
          !isDark && !animating
            ? 'scale-100 translate-y-0 opacity-100'
            : isDark && !animating
              ? 'scale-50 translate-y-5 opacity-0'
              : ''
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 ${moonAnim} ${
          isDark && !animating
            ? 'scale-100 translate-y-0 opacity-100'
            : !isDark && !animating
              ? 'scale-50 translate-y-5 opacity-0'
              : ''
        }`}
      />
    </button>
  )
}
