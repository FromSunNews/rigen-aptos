"use client";

import { Button } from "@/components/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shared/ui/dialog";
import { Typography } from "@/components/shared/ui/typography";
import { LucideCornerUpRight } from "lucide-react";
import { TwitterShareButton } from "react-share";
import { useMobile } from "@/hooks/shared/use-mobile";
import { cn } from "@/libs/utils/taildwind";

interface SharingDialogProps {
  type: "farming" | "lending";
  data: any;
  renderContent: (data: any, isMobile: boolean) => React.ReactNode;
  className?: string;
}

export function SharingDialog({ type, data, renderContent, className }: SharingDialogProps) {
  const isMobile = useMobile();

  const titles = {
    farming: "Share your Farming Position",
    lending: "Share your APY",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ring" className={cn("frow-icenter gap-2", className)}>
          Share
          <LucideCornerUpRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>
            <Typography className="ml-6 text-base font-semibold">{titles[type]}</Typography>
          </DialogTitle>
        </DialogHeader>

        <div className="fcol gap-4 pb-4 pt-10">
          <Typography>my wallet is reviving 🧟..</Typography>
          <div
            id="share-content-to-X"
            className="fcol aspect-[2] w-full items-center justify-center gap-2 bg-cover bg-center md:gap-4"
            style={{ backgroundImage: "url(/images/sharing/share_banner.png)" }}
          >
            {renderContent(data, isMobile)}
          </div>

          <div className="h-9 w-full rounded-full bg-primary px-4 py-2 text-primary-foreground shadow hover:bg-primary/90">
            <TwitterShareButton
              url={window.location.href}
              title={`Check out my ${type === "farming" ? "Farming Position" : "APY"} stats! 🚀`}
              hashtags={["DeFi", "LYF", "Reviving"]}
              className="w-full"
            >
              Share on X
            </TwitterShareButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
