import { Button } from "@/components/shared/ui/button";
import { SliderCustomStep } from "@/components/shared/ui/slider-custom-step";
import { Typography } from "@/components/shared/ui/typography";
import { Image } from "@/components/shared/ui/image";
import { Slider } from "@/components/shared/ui/slider";
import { Switch } from "@/components/shared/ui/switch";
import { ChartSimulator } from "@/components/features/chart-simulator";

export const AddSection = () => {
  return (
    <div className="space-y-4">
      {/* Deposit section */}
      <div className="fcol gap-2">
        <Typography variant="h4" color="primary">
          Add Collateral
        </Typography>
        <div className="flex w-full flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center sm:justify-between">
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
      </div>
      {/* Borrow section */}
      <div className="fcol gap-2">
        <Typography variant="h4" color="primary">
          Borrow
        </Typography>
        <div className="fcenter w-full gap-4 rounded-3xl border p-5">
          <Typography variant="small" color="embossed">
            Add collateral to borrow
          </Typography>
        </div>
      </div>
      {/* Borrow full section */}
      <div className="fcol gap-2">
        <Typography variant="h4" color="primary">
          Borrow
        </Typography>
        <div className="fcol-center w-full gap-4 rounded-3xl border">
          <div className="flex w-full flex-col items-center gap-2 border-b px-5 py-4 sm:flex-row sm:justify-between">
            <div className="frow-icenter gap-3">
              <Typography variant="small" weight="medium">
                Enable Strategy
              </Typography>
              <Switch id="airplane-mode" />
            </div>
            <div className="frow-icenter gap-3">
              <Typography variant="small" weight="medium">
                Default strategy
              </Typography>
              <div className="fcenter rounded-3xl bg-primary/30 px-3 py-0.5">
                <Typography variant="small" color="primary" weight="medium">
                  Neutral (Pseudo)
                </Typography>
              </div>
              {["Long", "Short"].map((strategy) => (
                <div key={strategy} className="fcenter rounded-3xl bg-third px-3 py-0.5">
                  <Typography variant="small" weight="medium">
                    {strategy}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div className="fcol w-full gap-10 px-5">
            <div className="fcol w-full gap-3 rounded">
              <div className="frow-between w-full items-center">
                <Typography variant="h3">Customise Leverage</Typography>
                <div className="fcenter rounded-full border border-ring/20 px-4 py-2">
                  <Typography variant="small" weight="medium">
                    3.0x
                  </Typography>
                </div>
              </div>
              {/* Slider Customise Leverage */}
              <Typography variant="small" color="submerged" className="w-full">
                Please keep in mind that when you leverage above 2x, you will have a slight short on the borrowed asset.
                The other paired asset will have typical long exposure, so choose which asset you borrow wisely.
              </Typography>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              {["APTOS", "USDC"].map((token) => (
                <div key={token} className="f1 fcol gap-3.5 overflow-hidden rounded-xl border pb-2.5">
                  <div className="frow gap-4 self-stretch bg-third px-3 py-2.5">
                    <Image src="/images/token/aptos.png" alt="aptos" width={36} height={36} className="rounded-full" />
                    <div className="fcol w-[299px] gap-[5px]">
                      <div className="frow-between items-baseline self-stretch">
                        <Typography>0</Typography>
                        <Typography variant="small">{token}</Typography>
                      </div>
                      <Typography variant="small" color="submerged">
                        $0.00
                      </Typography>
                      <div className="frow gap-2 self-start rounded-xl bg-third-foreground/20 px-2 py-0.5">
                        <Typography variant="small" color="submerged">
                          Borrowing Interest: 20%
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="frow-between w-full items-center px-3">
                    <div className="w-[80%]">
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        min={0}
                        step={25}
                        marks={[
                          { value: 0, label: "0%" },
                          { value: 25, label: "25%" },
                          { value: 50, label: "50%" },
                          { value: 75, label: "75%" },
                          { value: 100, label: "100%" },
                        ]}
                        onValueChange={(value: any) => {
                          console.log(value[0]);
                        }}
                      />
                    </div>
                    <div className="rounded-base fcenter border border-ring/20 px-2 py-1">
                      <Typography variant="small" weight="medium">
                        50%
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="fcol items-center gap-5">
              <Typography variant="h3" className="self-start">
                Simulator
              </Typography>
              <div className="w-full">
                <ChartSimulator />
              </div>
              <div className="fcol my-5 gap-4 self-stretch rounded-xl border px-5 py-2.5">
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
        </div>
      </div>
      {/* Button */}
      <Button variant="secondary" className="w-full">
        Add Deposit
      </Button>
    </div>
  );
};
