"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/shared/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
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
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Logo and 404 */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image src="/logo/rigen.svg" alt="rigen logo" width={80} height={80} className="object-contain" />
            </motion.div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="bg-gradient-to-r from-primary via-secondary to-primary/70 bg-clip-text text-6xl font-bold text-transparent sm:text-8xl">
                404
              </h1>
              <p className="mt-4 text-2xl font-medium text-white/90 sm:text-3xl">Page Not Found</p>
            </motion.div>
          </div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md text-center text-lg text-muted-foreground sm:text-xl"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex w-full max-w-xs flex-col gap-4 sm:max-w-md sm:flex-row"
          >
            <Button variant="default" className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary/70" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
