"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden",
          orientation === "vertical" && "overflow-y-auto",
          orientation === "horizontal" && "overflow-x-auto",
          orientation === "both" && "overflow-auto",
          "scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
