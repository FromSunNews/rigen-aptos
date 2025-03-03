"use client";

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
      <div className="relative z-10 w-full"></div>
    </div>
  );
}
