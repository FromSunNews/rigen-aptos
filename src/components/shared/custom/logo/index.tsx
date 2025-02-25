import { useMobile } from "@/hooks/shared/use-mobile";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Logo() {
  const isMobile = useMobile();

  const imageAnimation = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const textAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  return (
    <Link href="/" className="frow relative items-center justify-start gap-4">
      {isMobile ? (
        <>
          <motion.div initial="initial" animate="animate" variants={imageAnimation}>
            <Image src="/logo/rigen.svg" alt="rigen logo" width={35} height={35} />
          </motion.div>
          <motion.span
            className="text-2xl font-semibold tracking-[0.2em]"
            initial="initial"
            animate="animate"
            variants={textAnimation}
          >
            RIGEN
          </motion.span>
        </>
      ) : (
        <>
          <motion.div initial="initial" animate="animate" variants={imageAnimation}>
            <Image src="/logo/rigen.svg" alt="rigen logo" width={35} height={35} className="object-contain" />
          </motion.div>
          <motion.span
            className="text-2xl font-semibold tracking-[0.2em]"
            initial="initial"
            animate="animate"
            variants={textAnimation}
          >
            RIGEN
          </motion.span>
        </>
      )}
    </Link>
  );
}
