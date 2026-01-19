import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sm border px-2 py-0.5 text-xs font-mono uppercase tracking-wide w-fit whitespace-nowrap shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/90 text-primary-foreground border border-white/20 backdrop-blur-sm shadow-sm',
        secondary:
          'border-transparent bg-secondary/80 text-secondary-foreground border border-white/20 backdrop-blur-sm shadow-sm',
        destructive:
          'border-transparent bg-destructive/90 text-destructive-foreground border border-white/20 backdrop-blur-sm shadow-sm',
        outline: 'text-foreground border-white/40 dark:border-white/20 bg-white/20 dark:bg-black/20 backdrop-blur-sm',
        indicator: 'rounded-full w-2 h-2 p-0 text-[0px] shadow-[0_0_5px_currentColor]', 
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
