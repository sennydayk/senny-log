import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/90 dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff]',
        destructive:
          'bg-destructive text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-destructive/90 dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff]',
        outline:
          'bg-background border-2 border-input shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-accent hover:text-accent-foreground dark:shadow-[4px_4px_0px_0px_#ffffff]',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary/80 dark:border-white dark:shadow-[4px_4px_0px_0px_#ffffff]',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:font-black',
        link: 'text-primary underline-offset-4 hover:underline decoration-2 decoration-primary',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'size-12',
        'icon-sm': 'size-10',
        'icon-lg': 'size-14',
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
