import { Typography } from "@/components/shared/ui/typography";
import { Image } from "@/components/shared/ui/image";
import { SliderCustomStep } from "@/components/shared/ui/slider-custom-step";
import { ChartSimulator } from "@/components/features/chart-simulator";
import { Button } from "@/components/shared/ui/button";

export const RepaySection = () => {
  return (
    <div className="space-y-6">
      <Typography variant="h4" color="primary">
        Repay Debt
      </Typography>

      <div className="space-y-5 rounded-3xl border px-5 py-6">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* USDC Section */}
          <div className="f1 fcol gap-2 sm:w-full">
            <div className="frow-between items-center">
              <div className="frow gap-2 rounded-lg bg-secondary px-2 py-0.5">
                <Typography variant="small" color="primary">
                  Stable Coin
                </Typography>
              </div>
              <Typography variant="small" className="sm:text-xs">
                Available 1,000.00
              </Typography>
            </div>
            <div className="frow-icenter gap-4 rounded-xl border px-5 py-2.5 sm:px-3">
              <Image
                src="/images/token/usdc.png"
                alt="usdc"
                width={36}
                height={36}
                className="rounded-full sm:h-8 sm:w-8"
              />
              <div className="f1 fcol gap-[5px]">
                <div className="frow-between items-baseline">
                  <Typography weight="medium" className="sm:text-sm">
                    500.00
                  </Typography>
                  <Typography variant="small">USDC</Typography>
                </div>
                <div className="frow-between items-center">
                  <Typography variant="small" color="submerged" className="sm:text-xs">
                    $500.00
                  </Typography>
                  <div className="fcenter rounded-lg bg-third px-2 py-1">
                    <Typography variant="small" className="sm:text-xs">
                      max
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="frow gap-2.5">
              {["25%", "50%", "75%", "100%"].map((percent) => (
                <div
                  key={percent}
                  className={`f1 fcenter h-6 rounded-lg px-2 py-1 ${
                    percent === "50%" ? "bg-primary/30" : "bg-third"
                  } sm:h-5 sm:px-1`}
                >
                  <Typography variant="small" color={percent === "50%" ? "primary" : "embossed"} className="sm:text-xs">
                    {percent}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <Typography variant="small" className="text-center sm:py-2">
            and/or
          </Typography>

          {/* APTOS Section */}
          <div className="f1 fcol gap-2 sm:w-full">
            <div className="text-end">
              <Typography variant="small" className="sm:text-xs">
                Available 0.00
              </Typography>
            </div>
            <div className="frow-icenter gap-4 rounded-lg border px-5 py-2.5 sm:px-3">
              <Image
                src="/images/token/aptos.png"
                alt="aptos"
                width={36}
                height={36}
                className="rounded-full sm:h-8 sm:w-8"
              />
              <div className="f1 fcol gap-[5px]">
                <div className="frow-between items-baseline">
                  <Typography weight="medium" className="sm:text-sm">
                    0
                  </Typography>
                  <Typography variant="small">APTOS</Typography>
                </div>
                <div className="frow-between items-center">
                  <Typography variant="small" color="submerged" className="sm:text-xs">
                    $0.00
                  </Typography>
                  <div className="fcenter rounded-lg bg-third px-2 py-1">
                    <Typography variant="small" className="sm:text-xs">
                      max
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="frow gap-2.5">
              {["25%", "50%", "75%", "100%"].map((percent) => (
                <div key={percent} className="f1 fcenter h-6 rounded-lg bg-third px-2 py-1 sm:h-5 sm:px-1">
                  <Typography variant="small" className="sm:text-xs">
                    {percent}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="fcol items-center gap-5">
          <Typography variant="h3" className="self-start">
            Simulator
          </Typography>
          <div className="w-full">
            <ChartSimulator />
          </div>
          <div className="fcol mt-5 gap-4 self-stretch rounded-xl border px-5 py-2.5">
            <div className="frow-between items-center self-stretch">
              <Typography variant="h3">Invest Days</Typography>
              <div className="frow-between h-9 items-center rounded-xl border border-ring/20 px-3.5 py-1">
                <Typography variant="small">180</Typography>
              </div>
            </div>
            <SliderCustomStep
              values={[0, 30, 90, 180, 360]}
              defaultValue={[180]}
              className="rounded-full border border-ring/20"
            />
          </div>
        </div>
      </div>

      <Button variant="default" className="mt-10 w-full">
        Repay
      </Button>
    </div>
  );
};
