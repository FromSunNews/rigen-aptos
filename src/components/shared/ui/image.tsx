import * as React from "react";
import { cn } from "@/libs/utils/taildwind";
import { Skeleton } from "@/components/shared/ui/skeleton";
import NextImage from "next/image";

interface ImageProps {
  fallbackSrc?: string;
  fallbackName?: string;
  className?: string;
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
}

const COLORS = [
  { bg: "bg-blue-100", text: "text-blue-600" },
  { bg: "bg-red-100", text: "text-red-600" },
  { bg: "bg-green-100", text: "text-green-600" },
  { bg: "bg-yellow-100", text: "text-yellow-600" },
  { bg: "bg-purple-100", text: "text-purple-600" },
  { bg: "bg-pink-100", text: "text-pink-600" },
  { bg: "bg-indigo-100", text: "text-indigo-600" },
  { bg: "bg-teal-100", text: "text-teal-600" },
];

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fallbackSrc = "", fallbackName = "", alt = "image", src, width, height, ...props }, ref) => {
    const [imgSrc, setImgSrc] = React.useState<string | null>(() => src);
    const [isLoading, setIsLoading] = React.useState(() => !!src);
    const [showFallbackLetter, setShowFallbackLetter] = React.useState(() => !src);

    const prevSrcRef = React.useRef(src);

    const colorIndex = React.useMemo(() => {
      let hash = 0;
      for (let i = 0; i < fallbackName.length; i++) {
        hash = fallbackName.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash % COLORS.length);
    }, [fallbackName]);

    React.useEffect(() => {
      if (src && src !== imgSrc) {
        setImgSrc(src);
        setIsLoading(true);
        setShowFallbackLetter(false);
      }
    }, [src, imgSrc]);

    const handleError = () => {
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        setImgSrc(null);
        setShowFallbackLetter(true);
      }
      setIsLoading(false);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    const fallbackElement = React.useMemo(
      () => (
        <div
          className={cn(
            "flex items-center justify-center text-2xl font-medium",
            COLORS[colorIndex].bg,
            COLORS[colorIndex].text,
            className
          )}
          style={{ width, height }}
        >
          {fallbackName.charAt(0).toUpperCase()}
        </div>
      ),
      [fallbackName, width, height, className, colorIndex]
    );

    return (
      <div className="relative">
        {isLoading && <Skeleton className={cn("absolute inset-0 bg-third", className)} />}
        {showFallbackLetter ? (
          fallbackElement
        ) : (
          <NextImage
            className={cn("transition-all", isLoading && "invisible", className)}
            src={imgSrc || ""}
            alt={alt}
            width={width}
            height={height}
            onError={handleError}
            onLoad={handleLoad}
            {...props}
          />
        )}
      </div>
    );
  }
);

Image.displayName = "Image";

export { Image };
