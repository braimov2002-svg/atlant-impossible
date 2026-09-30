import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button with Atlant variants.
 * `gold` — champagne primary CTA with a liquid shimmer sweep on hover.
 * `glass` — titanium glassmorphism. `cyan` — blueprint accent. `ghost`/`outline` — secondary.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-all duration-500 ease-[var(--ease-out-expo)] outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      variant: {
        gold:
          "bg-gradient-to-b from-[#f3dc9f] via-gold to-gold-deep text-obsidian-900 shadow-[0_10px_40px_-10px_rgb(226_184_89/0.7),inset_0_1px_0_rgb(255_255_255/0.5)] hover:shadow-[0_14px_50px_-8px_rgb(226_184_89/0.9),inset_0_1px_0_rgb(255_255_255/0.6)] hover:-translate-y-0.5",
        glass:
          "glass text-mist hover:border-cyan/40 hover:text-white hover:shadow-[0_0_30px_-8px_rgb(0_240_255/0.45)]",
        outline: "border border-line bg-transparent text-mist hover:border-gold/60 hover:text-gold",
        ghost: "text-steel hover:text-mist hover:bg-white/5",
        cyan: "bg-cyan text-obsidian-900 shadow-[0_0_40px_-8px_rgb(0_240_255/0.8)] hover:bg-cyan-soft",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
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

/** Shimmer sweep — drop inside a gold/glass Button. */
function ButtonShimmer() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover/btn:animate-shimmer group-hover/btn:opacity-100"
    />
  );
}

export { Button, ButtonShimmer, buttonVariants };
