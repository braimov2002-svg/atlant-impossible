"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

/** shadcn/ui Slider (Radix) with a glowing lime track and gold thumb. */
function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-forest-800 shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-lime/40 to-lime shadow-[0_0_16px_#00ff66]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-6 w-6 cursor-grab rounded-full border-2 border-gold bg-forest-950 shadow-[0_0_0_6px_rgb(212_175_55/0.15),0_0_24px_rgb(212_175_55/0.5)] transition-[box-shadow,transform] duration-300 hover:scale-110 focus-visible:shadow-[0_0_0_8px_rgb(0_255_102/0.25)] focus-visible:outline-none active:cursor-grabbing"
        aria-label={props["aria-label"]}
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };
