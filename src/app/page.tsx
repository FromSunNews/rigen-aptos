"use client";

import { motion } from "framer-motion";
import { Wallet, LineChart, Shield, RefreshCw, Globe, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/ui/button";
import { useMobile } from "@/hooks/shared/use-mobile";
import CountUp from "@/components/shared/custom/count-up";

export default function Home() {
  const isMobile = useMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 to-secondary/20 backdrop-blur-xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(var(--primary), 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section with Logo */}
        <section className="flex h-screen items-center justify-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container flex max-w-6xl flex-col items-center justify-center gap-8 sm:gap-16"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 sm:gap-4">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src="/logo/rigen.svg"
                  alt="rigen logo"
                  width={isMobile ? 80 : 120}
                  height={isMobile ? 80 : 120}
                  className="object-contain"
                />
              </motion.div>
              <motion.span
                variants={itemVariants}
                className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-3xl font-bold tracking-[0.25em] text-transparent sm:text-5xl"
              >
                RIGEN
              </motion.span>
            </motion.div>

            {/* Hero Content */}
            <motion.div variants={itemVariants} className="w-full space-y-12 text-center sm:space-y-12">
              {/* Title Section */}
              <motion.h1
                variants={itemVariants}
                className="space-y-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:space-y-4 sm:text-6xl"
              >
                <span className="block leading-tight tracking-normal">
                  {isMobile ? "Yield Farming" : "Leverage Yield Farming"}
                </span>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-4 tracking-normal sm:gap-3"
                >
                  <span className="text-3xl font-medium text-white/90 sm:text-3xl">on Aptos Network</span>
                  <Image
                    src="/images/token/aptos.png"
                    alt="aptos logo"
                    width={isMobile ? 30 : 45}
                    height={isMobile ? 30 : 45}
                    className="object-contain"
                  />
                </motion.div>
              </motion.h1>

              {/* Market Size Section */}
              <motion.div variants={itemVariants}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center justify-center gap-4 sm:gap-3"
                >
                  <DollarSign className="h-12 w-12 text-primary sm:h-12 sm:w-12" />
                  <CountUp
                    value={1644776669}
                    className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-5xl tracking-tight text-transparent sm:text-6xl"
                    prefix="$"
                    duration={1.5}
                    enableScrollSpy={true}
                    scrollSpyDelay={0}
                  />
                  <motion.div className="group relative" whileHover={{ scale: 1.1 }}>
                    <button className="rounded-full p-3 transition-colors hover:bg-white/10 sm:p-2">
                      <TrendingUp className="h-8 w-8 text-primary sm:h-6 sm:w-6" />
                    </button>
                    <div className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg bg-card/80 p-4 text-base backdrop-blur-md group-hover:block sm:text-sm">
                      Total Value Locked
                    </div>
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="mt-10 space-y-5 sm:mt-8 sm:space-y-6">
                  <div className="space-y-4 sm:space-y-3">
                    <p className="mx-auto max-w-2xl text-3xl leading-relaxed sm:text-2xl">
                      Leverage your crypto assets with our innovative DeFi platform
                    </p>
                    <p className="mx-auto max-w-xl text-2xl sm:text-lg">Lend • Borrow • Farm</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-stretch justify-center gap-6 sm:flex-row sm:items-center sm:gap-8"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    size="lg"
                    className="w-full bg-primary/90 px-10 py-8 text-2xl font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-primary/70 sm:w-auto sm:px-12 sm:py-8 sm:text-xl"
                    asChild
                  >
                    <Link href="/lending" className="flex items-center justify-center gap-4 sm:gap-3">
                      <div className="rounded-lg bg-white/10 p-3 transition-colors group-hover:bg-white/20 sm:p-2">
                        <DollarSign className="h-10 w-10 sm:h-12 sm:w-12" />
                      </div>
                      <span>Start Lending</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/20 px-10 py-8 text-2xl font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:w-auto sm:px-12 sm:py-8 sm:text-xl"
                  >
                    <Link href="/borrowing" className="flex items-center justify-center gap-4 sm:gap-3">
                      <div className="rounded-lg bg-white/10 p-3 transition-colors group-hover:bg-white/20 sm:p-2">
                        <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12" />
                      </div>
                      <span>Start Borrowing</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 sm:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-10 sm:gap-10 md:grid-cols-3"
          >
            {/* Feature Cards */}
            {[
              {
                icon: <Wallet className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Secure Wallet",
                description: "Connect your wallet securely and start trading in minutes",
              },
              {
                icon: <LineChart className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Real-time Analytics",
                description: "Track your investments with advanced analytics tools",
              },
              {
                icon: <Shield className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Protected Assets",
                description: "Your assets are protected by industry-leading security measures",
              },
              {
                icon: <RefreshCw className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Instant Swaps",
                description: "Swap tokens instantly with minimal slippage",
              },
              {
                icon: <Globe className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Global Access",
                description: "Access DeFi from anywhere in the world",
              },
              {
                icon: <Users className="h-12 w-12 text-primary sm:h-10 sm:w-10" />,
                title: "Community Driven",
                description: "Join our growing community of DeFi enthusiasts",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-card/30 p-10 text-center backdrop-blur-md"
              >
                <div className={`mb-8 w-fit rounded-xl bg-primary/10 p-5`}>{feature.icon}</div>
                <h3 className="mb-4 text-3xl font-semibold sm:text-2xl">{feature.title}</h3>
                <p className="text-xl leading-relaxed text-submerged sm:text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
