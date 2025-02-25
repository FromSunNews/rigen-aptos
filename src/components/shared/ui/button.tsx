import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/utils/taildwind";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-base bg-primary text-primary-foreground shadow hover:bg-primary/90 relative",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        none: "text-muted-foreground",
        third: "bg-third text-primary-foreground hover:bg-third/90",
        ring: "border border-ring/40 bg-background text-foreground hover:bg-third/10",
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
      ripple: {
        true: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      ripple: true,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ripple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ripple = true, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Ripple effect handler
    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple) return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rippleSize = Math.max(rect.width, rect.height) * 2;

      // Create ripple element
      const rippleElement = document.createElement("span");
      rippleElement.style.width = rippleElement.style.height = `${rippleSize}px`;
      rippleElement.style.left = `${x - rippleSize / 2}px`;
      rippleElement.style.top = `${y - rippleSize / 2}px`;
      rippleElement.className = "absolute rounded-full bg-white pointer-events-none animate-ripple";

      // Clean up old ripples
      const existingRipples = button.getElementsByClassName("animate-ripple");
      if (existingRipples.length > 0) {
        Array.from(existingRipples).forEach((r) => r.remove());
      }

      button.appendChild(rippleElement);

      // Remove ripple after animation
      setTimeout(() => {
        rippleElement.remove();
      }, 600);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, ripple, className }))}
        ref={ref}
        onClick={(e) => {
          createRipple(e);
          if (props.onClick) props.onClick(e);
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
