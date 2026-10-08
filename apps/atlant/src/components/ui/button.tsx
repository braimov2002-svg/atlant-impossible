import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button with Atlant variants — square, architectural, no glow.
 * `primary` — white on graphite (main CTA). `outline` — hairline frame.
 * `gold` — brass accent (rare). `ghost` — text only.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] font-medium transition-colors duration-300 outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg:last-child]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary: "bg-mist text-obsidian-900 hover:bg-white",
        outline: "border border-line-strong bg-transparent text-mist hover:border-mist",
        gold: "bg-gold text-obsidian-900 hover:bg-gold-soft",
        ghost: "text-steel hover:text-mist",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-[15px]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
