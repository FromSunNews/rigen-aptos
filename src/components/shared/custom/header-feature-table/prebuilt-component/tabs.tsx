"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { cn } from "@/libs/utils/taildwind";
import { Typography } from "@/components/shared/ui/typography";
import React from "react";

interface TabsProps {
  options: {
    value: string;
    label: string;
    icon?: React.ReactNode | ((props: any) => JSX.Element);
  }[];
  onChange?: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "animation";
  value?: string;
}

export default function HeaderTabs({ options, onChange, isLoading, className, variant = "default", value }: TabsProps) {
  const [selected, setSelected] = React.useState(value || options[0]?.value);

  React.useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  if (isLoading) {
    return (
      <div className="frow-center gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-28 rounded-full" />
        ))}
      </div>
    );
  }

  if (variant === "animation") {
    return (
      <Tabs value={value} defaultValue={options[0]?.value} className={cn("w-full", className)} onValueChange={onChange}>
        <TabsList className="grid grid-cols-3">
          {options.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }

  if (variant === "default") {
    return (
      <div className="frow-center gap-2 ps-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "fcenter cursor-pointer gap-2 rounded-full p-2 md:px-5 md:py-3",
              selected === option.value ? "border border-primary bg-third" : "bg-third"
            )}
            onClick={() => {
              setSelected(option.value);
              onChange?.(option.value);
            }}
          >
            {/* {typeof option.icon === "function" ? option.icon({}) : option.icon} */}
            {typeof option.icon === "function"
              ? option.icon({ className: selected === option.value ? "fill-primary" : "fill-embossed" })
              : option.icon}
            <Typography variant="small" color={selected === option.value ? "primary" : "embossed"}>
              {option.label}
            </Typography>
          </div>
        ))}
      </div>
    );
  }
}
