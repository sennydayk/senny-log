import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 uppercase tracking-wider font-mono active:shadow-retro-pressed active:translate-y-[1px]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-retro-plate border-b-2 border-r-2 border-primary-foreground/20 hover:brightness-110',
        destructive:
          'bg-destructive text-destructive-foreground shadow-retro-plate border-b-2 border-r-2 border-destructive-foreground/20 hover:brightness-110',
        outline:
          'bg-transparent border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-glow hover:border-accent transition-shadow duration-300',
        secondary:
          'bg-secondary text-secondary-foreground shadow-retro-plate border-b-2 border-r-2 border-secondary-foreground/20 hover:brightness-110',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-glow',
        link: 'text-primary underline-offset-4 hover:underline decoration-2 decoration-primary/50',
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
