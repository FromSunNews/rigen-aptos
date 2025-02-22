import * as React from "react";
import { cn } from "@/libs/utils/taildwind";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { Typography } from "@/components/shared/ui/typography";

const notifyHeaderVariants = cva("z-50 w-full fcenter overflow-hidden transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-secondary",
      primary: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      warning: "bg-yellow-500 text-white",
    },
    size: {
      default: "h-[var(--notify-height)]",
      sm: "h-[24px]",
      lg: "h-[36px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface NotifyHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notifyHeaderVariants> {
  message?: string | React.ReactNode;
  time?: number;
  scrollThreshold?: number;
  showCloseButton?: boolean;
  onClose?: () => void;
  scrollBehavior?: "hide" | "show" | "sticky";
}

/**
 * NotifyHeader component
 * example:
 * Default
 *   <NotifyHeader
 *     message="This is a default notification"
 *     scrollBehavior="show"
 *   />
 * Primary
 *   <NotifyHeader
 *     variant="primary"
 *     message="This is a primary notification"
 *     scrollBehavior="show"
 *   />
 * Destructive
 *   <NotifyHeader
 *     variant="destructive"
 *     message="This is a destructive notification"
 *     scrollBehavior="show"
 *   />
 *
 * Different sizes
 *   <NotifyHeader
 *     size="sm"
 *     message="Small notification"
 *     scrollBehavior="show"
 *   />
 *   <NotifyHeader
 *     size="lg"
 *     message="Large notification"
 *     scrollBehavior="show"
 * />
 * Without close button
 *   <NotifyHeader
 *     message="Notification without close button"
 *     showCloseButton={false}
 *     scrollBehavior="show"
 *   />
 *
 */
const NotifyHeader = React.forwardRef<HTMLDivElement, NotifyHeaderProps>(
  (
    {
      className,
      variant,
      size,
      message,
      time,
      scrollThreshold = 10,
      showCloseButton = true,
      onClose,
      scrollBehavior = "hide",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    React.useEffect(() => {
      if (!time) setIsVisible(true);
      else setTimeout(() => setIsVisible(true), time);
    }, [time]);

    React.useEffect(() => {
      if (scrollBehavior === "hide") {
        setIsScrolled(scrollY > scrollThreshold);
      } else if (scrollBehavior === "show") {
        setIsScrolled(false);
      }
    }, [scrollY, scrollThreshold, scrollBehavior]);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!message) return null;
    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(notifyHeaderVariants({ variant, size }), isScrolled ? "h-0" : "", className)}
        {...props}
      >
        <div
          className={cn(
            "fcenter w-full transition-transform duration-300",
            "relative",
            size === "default" && "h-[var(--notify-height)]",
            size === "sm" && "h-[24px]",
            size === "lg" && "h-[36px]",
            isScrolled ? "-translate-y-full" : "translate-y-0"
          )}
        >
          {typeof message === "string" ? (
            <Typography className="text-center text-sm">{message}</Typography>
          ) : (
            <div className="w-full text-center text-sm">{message}</div>
          )}
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 transition-transform duration-200 hover:scale-110 hover:bg-transparent"
              onClick={handleClose}
            >
              <X size={18} />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

NotifyHeader.displayName = "NotifyHeader";

export { NotifyHeader, notifyHeaderVariants };
