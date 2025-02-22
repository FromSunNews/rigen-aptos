import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/utils/taildwind";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-base bg-primary text-primary-foreground shadow hover:bg-primary/90 relative",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-primary shadow-sm hover:bg-secondary/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        none: "text-muted-foreground",
        third: "bg-third text-third-foreground hover:border-ring text-primary",
        ring: "border border-ring/40 bg-background text-ring-foreground hover:bg-third/10",
      },
      size: {
        default: "h-9 px-6 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      rounded: {
        default: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animationHover?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animationHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    if (animationHover) {
      return (
        <div className="group relative w-full">
          <Comp className={cn(buttonVariants({ variant, size, className }), "w-full")} ref={ref} {...props}>
            <div
              className={cn(
                "flex w-full items-center justify-center gap-2",
                animationHover && "transition-transform duration-500 group-hover:-translate-y-1"
              )}
            >
              {props.children}
            </div>
          </Comp>
          <div className="translate-y-3 opacity-0 transition-all duration-500 group-hover:-translate-y-0 group-hover:opacity-100">
            <img
              src="/images/hand/hand.gif"
              className="absolute bottom-0.5 left-4 h-4 w-4 -translate-x-1/2 transform"
              alt="hover animation"
            />
            <img
              src="/images/hand/hand.gif"
              className="absolute bottom-0.5 right-2 h-4 w-4 -translate-x-0 transform"
              alt="hover animation"
            />
          </div>
        </div>
      );
    } else {
      return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
