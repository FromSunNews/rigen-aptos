"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/libs/utils/taildwind";
import { useTheme } from "next-themes";
export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={cn(
        "frow-center rounded-full",
        "bg-gray-100 hover:bg-gray-200",
        "border border-gray-200",
        "dark:bg-gray-800 dark:hover:bg-gray-700",
        "dark:border-gray-700",
        "h-9 w-9",
        "transition-colors duration-200"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
          }}
        >
          {theme === "dark" ? (
            <FiSun className="size-4 transform-gpu text-yellow-400 hover:text-yellow-300" />
          ) : (
            <FiMoon className="size-4 transform-gpu text-gray-700 hover:text-gray-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
