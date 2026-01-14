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
          'border-transparent bg-primary text-primary-foreground shadow-[0_0_8px_rgba(255,77,0,0.5)]',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground shadow-[0_0_8px_rgba(0,143,122,0.5)]',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-[0_0_8px_rgba(230,25,25,0.5)]',
        outline: 'text-foreground border-border/60 bg-muted/20',
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
