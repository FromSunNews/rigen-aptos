import { Typography } from "@/components/shared/ui/typography";
import { Image } from "@/components/shared/ui/image";
import { FarmingPosition } from "./columns";
import { useMobile } from "@/hooks/shared/use-mobile";
import { cn } from "@/libs/utils/taildwind";
import { Separator } from "@/components/shared/ui/separator";

interface ExpandedContentProps {
  data: FarmingPosition;
}

export function ExpandedContent({ data }: ExpandedContentProps) {
  const isMobile = useMobile();

  const InfoItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className={cn("flex", isMobile ? "flex-col gap-1.5" : "gap-5")}>
      <div className="flex flex-col gap-0.5">
        <Typography variant="small" color="submerged">
          {label}
        </Typography>
        <div className={cn("border-t border-white/5", isMobile ? "pt-1.5" : "pt-[5px]")}>{children}</div>
      </div>
    </div>
  );

  const PriceDisplay = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center gap-2">
      <Image src={icon} alt="token" width={18} height={18} className="rounded-full" />
      <Typography variant="small">{text}</Typography>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-third/50 px-6 py-4">
        <div className="fcol gap-4">
          {/* Time Info */}
          <div className="fcol gap-4">
            <InfoItem label="Position Opened">
              <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
            </InfoItem>

            <InfoItem label="Last edit">
              <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
            </InfoItem>

            <InfoItem label="Last Auto-Compound">
              <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
            </InfoItem>

            <InfoItem label="Debt (with interest)">
              <Typography variant="small">$0</Typography>
            </InfoItem>
          </div>

          <Separator className="bg-white/5" />

          {/* Price Info */}
          <div className="fcol gap-4">
            <InfoItem label="Current Price">
              <PriceDisplay icon="/images/token/aptos.png" text="1 APTOS = 10.00 USDC" />
            </InfoItem>

            <InfoItem label="Liquidation Price">
              <div className="fcol gap-2">
                <PriceDisplay icon="/images/token/aptos.png" text="1 APTOS = 10.00 USDC" />
                <PriceDisplay icon="/images/token/usdc.png" text="1 USDC = 0.1 APTOS" />
              </div>
            </InfoItem>

            <InfoItem label="LP Price">
              <PriceDisplay icon="/images/token/aptos.png" text="1 USDC-APTOS = $123,456" />
            </InfoItem>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="frow h-full gap-6 bg-third p-5">
      {/* Position Opened */}
      <InfoItem label="Position Opened">
        <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
      </InfoItem>

      {/* Last edit */}
      <InfoItem label="Last edit">
        <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
      </InfoItem>

      {/* Last Auto-Compound */}
      <InfoItem label="Last Auto-Compound">
        <Typography variant="small">11:00 UTC+8 26, November, 2024</Typography>
      </InfoItem>

      {/* Debt */}
      <InfoItem label="Debt (with interest)">
        <Typography variant="small">$0</Typography>
      </InfoItem>

      {/* Current & Liquidation Price */}
      <div className="flex flex-col gap-2.5">
        {/* Current Price */}
        <InfoItem label="Current Price">
          <PriceDisplay icon="/images/token/aptos.png" text="1 APTOS = 10.00 USDC" />
        </InfoItem>

        {/* Liquidation Price */}
        <InfoItem label="Liquidation Price">
          <div className="flex flex-col gap-1">
            <PriceDisplay icon="/images/token/aptos.png" text="1 APTOS = 10.00 USDC" />
            <PriceDisplay icon="/images/token/usdc.png" text="1 USDC = 0.1 APTOS" />
          </div>
        </InfoItem>
      </div>

      {/* LP Price */}
      <InfoItem label="LP Price">
        <PriceDisplay icon="/images/token/aptos.png" text="1 USDC-APTOS = $123,456" />
      </InfoItem>
    </div>
  );
}
