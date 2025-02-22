"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/shared/ui/button";
import { cn } from "@/libs/utils/taildwind";
import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { WalletSelector } from "@/components/features/wallet-selector";
import { mainMenuItems } from "@/config/navigation";
import { Logo } from "@/components/shared/custom/logo";
import { Typography } from "../../ui/typography";
import { NotifyHeader } from "../../custom/notify-header";
import { Check } from "lucide-react";
import { Image } from "../../ui/image";

const menuItemVariants = {
  closed: {
    y: 50,
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)",
    transition: {
      y: { stiffness: 1000 },
      opacity: { duration: 0.15 },
    },
  },
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      opacity: { duration: 0.5 },
      scale: { type: "spring", stiffness: 400, damping: 30 },
    },
  },
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isOpen ? "rgba(0,0,0,0)" : "rgba(var(--background),0.85)",
          transition: { duration: 0.3 },
        }}
        className="fixed left-0 top-0 z-50 w-full border-b border-border/50 backdrop-blur-md md:hidden"
      >
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
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
            <div className="flex items-center">
              <Logo />
            </div>
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="fcenter relative">
              <Image src="/icon/audit_brand.png" alt="Logo" width={20} height={20} className="mr-1 rounded-full" />
              <div className="fcenter absolute bottom-3/4 left-3/4 h-3 w-3 rounded-full bg-primary">
                <Check size={10} className="font-bold text-background" />
              </div>
            </div>
            <WalletSelector />

            {/* Menu Button */}
            <motion.div
              initial={false}
              animate={{
                scale: isOpen ? 1.1 : 1,
                rotate: isOpen ? 90 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative h-9 w-9 rounded-full bg-third p-0 transition-all duration-300",
                  isOpen && "bg-third shadow-lg shadow-third/20"
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 90 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    className="text-primary"
                  >
                    {isOpen ? <IoClose size={18} /> : <IoMenu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{
                height: "auto",
                opacity: 1,
                y: 0,
                transition: {
                  height: { duration: 0.4 },
                  opacity: { duration: 0.4 },
                  y: { type: "spring", stiffness: 300, damping: 25 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -20,
                transition: {
                  height: { duration: 0.3 },
                  opacity: { duration: 0.2 },
                  y: { duration: 0.3 },
                },
              }}
              className="overflow-hidden bg-background/60 backdrop-blur-lg"
            >
              <motion.div
                className="flex flex-col space-y-2 p-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.2,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                {mainMenuItems.map((item, index) => (
                  <motion.div key={item.path} variants={menuItemVariants} custom={index}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "group relative w-full justify-start overflow-hidden rounded-xl border border-border/50 bg-background/50 p-6 text-left backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-background/80 hover:shadow-lg",
                        item.commingSoon && "cursor-not-allowed opacity-50",
                        pathname === item.path && "border-primary bg-primary/5"
                      )}
                      onClick={() => {
                        if (!item.commingSoon) {
                          router.push(item.path);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                        initial={false}
                        animate={{
                          opacity: pathname === item.path ? 0.1 : 0,
                        }}
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium">{item.title}</span>
                          {item.commingSoon && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              Soon
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(8px)",
              transition: {
                opacity: { duration: 0.3 },
                backdropFilter: { duration: 0.4 },
              },
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              transition: {
                opacity: { duration: 0.2 },
                backdropFilter: { duration: 0.2 },
              },
            }}
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
