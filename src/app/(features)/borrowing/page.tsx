"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RocketIcon } from "lucide-react";

export default function BorrowingPage() {
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
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 to-secondary/20 backdrop-blur-xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(var(--primary), 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center space-y-12"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image src="/logo/rigen.svg" alt="rigen logo" width={100} height={100} className="object-contain" />
              </motion.div>
              <motion.h1 className="h-16 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                Borrowing Coming Soon
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl space-y-4 text-center">
              <p className="text-xl leading-relaxed sm:text-2xl">
                Our advanced borrowing features are under development
              </p>
              <motion.div
                className="flex items-center justify-center gap-2 text-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <RocketIcon className="h-6 w-6 animate-pulse" />
                <span>Launching Soon</span>
              </motion.div>
            </motion.div>

            {/* Features Preview */}
            <motion.div variants={itemVariants} className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="flex flex-col items-center rounded-xl border border-white/10 bg-card/30 p-8 text-center backdrop-blur-md"
              >
                <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Flexible Borrowing</h3>
                <p className="text-lg leading-relaxed text-submerged sm:text-xl">
                  Borrow against your crypto assets with competitive interest rates
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="flex flex-col items-center rounded-xl border border-white/10 bg-card/30 p-8 text-center backdrop-blur-md"
              >
                <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">Smart Collateral</h3>
                <p className="text-lg leading-relaxed text-submerged sm:text-xl">
                  Optimize your collateral usage with our advanced risk management system
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
