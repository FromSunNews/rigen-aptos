"use client";

import { cn } from "@/libs/utils/taildwind";
import { WalletSelector } from "@/components/features/wallet-selector";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/custom/logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NotifyHeader } from "@/components/shared/custom/notify-header";
import { Typography } from "@/components/shared/ui/typography";
import { MobileHeader } from "./mobile-header";
import { useMobile } from "@/hooks/shared/use-mobile";
import { mainMenuItems } from "@/config/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";
import React from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMobile();

  const getCurrentTab = React.useCallback(() => {
    if (pathname === "/") {
      return mainMenuItems[0].path;
    }
    const currentPath = mainMenuItems.find((item) => pathname.startsWith(item.path));
    return currentPath?.path || mainMenuItems[0].path;
  }, [pathname]);

  const [activeTab, setActiveTab] = React.useState(() => getCurrentTab());

  const handleNavigation = React.useCallback(
    (path: string) => {
      if (path !== activeTab) {
        setActiveTab(path);
        router.push(path);
      }
    },
    [activeTab, router]
  );

  React.useEffect(() => {
    const newTab = getCurrentTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [pathname, activeTab, getCurrentTab]);

  if (isMobile) {
    return <MobileHeader />;
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <NotifyHeader
        message={
          <div className="frow-center gap-2">
            <Typography size="sm">Ensure you&apos;re visiting</Typography>
            <Link href="https://rigen.io" className="underline underline-offset-2">
              https://rigen.io
            </Link>
          </div>
        }
        time={2000}
        scrollBehavior="hide"
      />
      {/* Gradient blur background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20" />
        <div className="absolute inset-0 bg-[#0E0C15]/10 backdrop-blur-md backdrop-saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>

      <nav className="frow h-[var(--header-height)] w-full items-center justify-between border-b border-white/[0.02] px-2 md:px-10">
        {/* Logo with animation */}
        <motion.div className="f gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Logo />
        </motion.div>

        {/* Desktop Menu using Tabs */}
        <div className="hidden items-center md:flex">
          <Tabs
            value={activeTab}
            defaultValue={mainMenuItems[0].path}
            onValueChange={handleNavigation}
            className="w-fit"
          >
            <TabsList className="relative">
              {mainMenuItems.map((item) => (
                <TabsTrigger
                  key={item.path}
                  value={item.path}
                  disabled={item?.commingSoon}
                  className={cn(
                    "relative z-10 px-6 py-2.5 transition-all duration-200",
                    item?.commingSoon && "cursor-not-allowed opacity-50",
                    activeTab === item.path && "text-primary"
                  )}
                >
                  <Typography className="font-medium">
                    {item.title} {item?.commingSoon && "(Coming Soon)"}
                  </Typography>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Right Section */}
        <div className="fcenter gap-6">
          <WalletSelector />
        </div>
      </nav>
    </header>
  );
}
