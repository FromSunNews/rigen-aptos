"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  isBlur?: boolean;
  blurAmount?: number;
  overlayOpacity?: number;
}

export function VideoBackground({ isBlur = false, blurAmount = 10, overlayOpacity = 10 }: VideoBackgroundProps) {
  const SPEED_RATE = 1;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = SPEED_RATE; // custom video background speed
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blur Overlay */}
      {isBlur && (
        <div
          className={`absolute inset-0 backdrop-blur-[${blurAmount}px] z-10`}
          style={{
            backgroundColor: `rgba(var(--background), ${overlayOpacity})`,
          }}
        />
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        poster="/background/background.jpg"
      >
        <source
          src="https://res.cloudinary.com/drjdgtxvh/video/upload/v1740370153/ioqlfavgoesofbbasztm.mov"
          type="video/mp4"
        />
        {/* Fallback image */}
        <img src="/background/background.jpg" alt="background" className="h-full w-full object-cover" />
      </video>
    </div>
  );
}
