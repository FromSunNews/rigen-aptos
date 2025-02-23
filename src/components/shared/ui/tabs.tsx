"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/libs/utils/taildwind";
import { motion } from "framer-motion";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [activeRect, setActiveRect] = React.useState<DOMRect | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateActiveTab = () => {
      const activeTab = list.querySelector('[data-state="active"]');
      if (activeTab) {
        setActiveRect(activeTab.getBoundingClientRect());
      }
    };

    updateActiveTab();
    const observer = new MutationObserver(updateActiveTab);
    observer.observe(list, { attributes: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.List
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        listRef.current = node;
      }}
      className={cn(
        "relative inline-flex h-12 items-center justify-center rounded-full bg-[hsl(var(--tab-bg))] p-1",
        className
      )}
      {...props}
    >
      {activeRect && (
        <motion.div
          className="absolute inset-0 top-1.5 h-9 rounded-full bg-[hsl(var(--third))]"
          initial={false}
          animate={{
            width: activeRect.width,
            x: activeRect.left - (listRef.current?.getBoundingClientRect().left || 0),
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
      <div className="relative z-10 flex h-full items-center justify-center gap-1">{props.children}</div>
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-full items-center justify-center whitespace-nowrap rounded-full px-8 py-2.5",
      "text-sm font-medium transition-all",
      "text-muted-foreground",
      "hover:text-[hsl(var(--tab-active-text))]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-[hsl(var(--tab-active-text))]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
