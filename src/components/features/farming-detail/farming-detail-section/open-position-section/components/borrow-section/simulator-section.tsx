import { Typography } from "@/components/shared/ui/typography";
import { ChartSimulator } from "@/components/features/chart-simulator";
import { SliderCustomStep } from "@/components/shared/ui/slider-custom-step";
import { useBoundStore } from "@/store";

export const SimulatorSection = () => {
  const investDays = useBoundStore((state) => state.investDays);
  const simulatorValue = useBoundStore((state) => state.simulatorValue);
  const updateInvestDays = useBoundStore((state) => state.updateInvestDays);
  const updateSimulatorValue = useBoundStore((state) => state.updateSimulatorValue);

  const investDayOptions = [0, 30, 90, 180, 360];

  const handleInvestDaysChange = (value: number) => {
    updateInvestDays(value);
    console.log("Invest days changed:", value);
  };

  return (
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
            <Typography variant="small">{investDays}</Typography>
          </div>
        </div>
        <SliderCustomStep
          values={investDayOptions}
          defaultValue={[investDays]}
          onValueChange={handleInvestDaysChange}
          className="rounded-full border border-ring/20"
        />
      </div>
    </div>
  );
};
