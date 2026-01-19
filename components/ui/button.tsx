import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 uppercase tracking-wider font-mono active:shadow-retro-pressed active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: 'bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 border border-white/20 backdrop-blur-sm hover:bg-primary hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300',
        destructive:
          'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 border border-white/20 hover:bg-destructive/90 hover:shadow-destructive/40 hover:-translate-y-0.5 transition-all duration-300',
        outline:
          'bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-md transition-all duration-300',
        secondary:
          'bg-secondary/80 text-secondary-foreground shadow-lg shadow-secondary/20 border border-white/20 backdrop-blur-sm hover:bg-secondary hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all duration-300',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-sm px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
