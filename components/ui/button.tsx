import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner',
        destructive:
          'bg-destructive text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner',
        outline:
          'border-2 border-primary/20 bg-background shadow-clay-sm hover:shadow-clay-md hover:border-primary/50 text-foreground active:shadow-pressed',
        secondary:
          'bg-secondary text-secondary-foreground shadow-clay-sm hover:shadow-clay-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-pressed',
        ghost: 
          'hover:bg-accent/50 hover:text-accent-foreground data-[state=open]:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        clay: 
          'bg-card text-foreground shadow-clay-sm hover:shadow-clay-md hover:-translate-y-1 active:translate-y-0 active:shadow-pressed border border-white/40 dark:border-white/5',
      },
      size: {
        default: 'h-11 px-6 py-2 has-[>svg]:px-4 min-w-[100px]',
        sm: 'h-9 rounded-xl px-4 text-xs has-[>svg]:px-3',
        lg: 'h-14 rounded-3xl px-8 text-base has-[>svg]:px-6',
        icon: 'size-11 rounded-2xl',
        'icon-sm': 'size-9 rounded-xl',
        'icon-lg': 'size-14 rounded-3xl',
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
