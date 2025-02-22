import { Typography } from "@/components/shared/ui/typography";
import { colors } from "@/libs/utils/colors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { useState, useMemo } from "react";
import { useBoundStore } from "@/store";

/**
 * ChartSimulator visualizes position performance based on various parameters:
 *
 * Input Parameters:
 * 1. Deposit Amounts:
 *    - Base position size
 *    - Initial capital allocation
 *    - Affects Y-axis scale
 *
 * 2. Strategy Settings:
 *    - Neutral: Balanced exposure to both assets
 *    - Long: Higher exposure to appreciating asset
 *    - Short: Higher exposure to depreciating asset
 *    - Affects curve direction and steepness
 *
 * 3. Leverage Level:
 *    - Amplifies potential gains and losses
 *    - Modifies curve volatility
 *    - Affects risk indicators
 *
 * 4. Token Distribution:
 *    - Determines asset exposure ratios
 *    - Influences price impact
 *    - Affects curve sensitivity
 *
 * Chart Updates:
 * - Real-time recalculation on any parameter change
 * - Smooth transitions between states
 * - Risk level indicators
 * - Performance projections
 */

export const ChartSimulator = () => {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // Global state
  const depositAmount = useBoundStore((state) => state.depositAmount);
  const leverage = useBoundStore((state) => state.leverage);
  const selectedStrategy = useBoundStore((state) => state.selectedStrategy);
  const isSimpleBorrow = useBoundStore((state) => state.isSimpleBorrow);

  // Memoize chart data calculation
  const data = useMemo(() => {
    const baseData = [
      { price: 0, leveraged: 0, normal: 0, hodl: 0 },
      { price: 1, leveraged: 0, normal: 0, hodl: 0 },
      { price: 2, leveraged: 0, normal: 0, hodl: 0 },
      { price: 3, leveraged: 0, normal: 0, hodl: 0 },
      { price: 4, leveraged: 0, normal: 0, hodl: 0 },
      { price: 5, leveraged: 0, normal: 0, hodl: 0 },
      { price: 6, leveraged: 0, normal: 0, hodl: 0 },
      { price: 7, leveraged: 0, normal: 0, hodl: 0 },
      { price: 8, leveraged: 0, normal: 0, hodl: 0 },
      { price: 9, leveraged: 0, normal: 0, hodl: 0 },
      { price: 10, leveraged: 0, normal: 0, hodl: 0 },
    ];

    return baseData.map((point) => {
      const totalDeposit = depositAmount.usdc + depositAmount.aptos;
      if (totalDeposit === 0) return point;

      const INITIAL_PRICE = 5; // Initial price
      const BASE_APY = 10; // 10% base APY

      // Calculate price change percentage from initial price
      const priceChangePercent = ((point.price - INITIAL_PRICE) / INITIAL_PRICE) * 100;

      // HODL: Only affected by price changes
      const hodlValue = priceChangePercent;

      // Normal: Affected by price changes + APY
      let normalValue = hodlValue;
      switch (selectedStrategy) {
        case "Long":
          normalValue = hodlValue * 1.2 + BASE_APY;
          break;
        case "Short":
          normalValue = hodlValue * 0.8 + BASE_APY;
          break;
        default: // Neutral
          normalValue = hodlValue + BASE_APY;
      }

      // Leveraged: Multiplied by leverage, but with maximum limit
      const maxLeverage = Math.min(leverage, 5); // Maximum leverage limit of 5x
      const leveragedValue = normalValue * maxLeverage;

      // Limit maximum and minimum values
      const clampValue = (value: number) => Math.min(Math.max(value, -100), 200);

      return {
        price: point.price,
        leveraged: clampValue(leveragedValue),
        normal: clampValue(normalValue),
        hodl: clampValue(hodlValue),
      };
    });
  }, [depositAmount, leverage, selectedStrategy]); // Đã xóa isSimpleBorrow khỏi dependencies

  const tickXAxisData = [
    { value: 2, label: "$2.00", color: colors.destructive },
    { value: 5, label: "$5.00", color: colors.embossed },
    { value: 8, label: "$8.00", color: colors.destructive },
  ];

  return (
    <div className="h-[500px] w-full rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 30, right: 0, bottom: 0, left: 10 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke="rgba(255,255,255,0.1)" />
          <ReferenceArea x1={2} x2={8} fill="#1FFF94" fillOpacity={0.1} />
          <XAxis
            dataKey="price"
            stroke={colors.embossed}
            label={{
              value: "APTOS Price in USDC",
              position: "bottom",
              fill: colors.submerged,
              dy: 20,
            }}
            tick={(props) => {
              const { x, y, payload } = props;
              if (!tickXAxisData.some((item) => item.value === payload.value)) {
                return <text />;
              }

              return (
                <text
                  x={x}
                  y={y + 20}
                  fill={tickXAxisData.find((item) => item.value === payload.value)?.color}
                  textAnchor="middle"
                >
                  ${payload.value.toFixed(2)}
                </text>
              );
            }}
          />
          <YAxis
            stroke={colors.embossed}
            domain={[0, 120]}
            tickFormatter={(value) => `${value}%`}
            label={{
              value: "PnL (% of Principal in USDC)",
              angle: -90,
              position: "center",
              fill: colors.submerged,
              dx: -30,
            }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={(props) => {
              const { payload, label } = props;
              if (!payload || !payload.length) return null;

              const leveragedValue = payload.find((p) => p.name === "Leveraged Farming")?.value;
              const normalValue = payload.find((p) => p.name === "Farm Without leverage")?.value;
              const hodlValue = payload.find((p) => p.name === "Hodl without farm")?.value;

              return (
                <div className="fcol w-[250px] gap-2 rounded-lg bg-third/80 p-2.5">
                  {/* Header */}
                  <div className="frow-center w-full border-b border-white/20 pb-1.5">
                    <div className="frow-center gap-2">
                      <Typography as="span" variant="small" color="embossed" className="font-mono">
                        1 APT = {label} USDC{" "}
                      </Typography>
                      <Typography as="span" variant="small" color="primary" className="font-mono">
                        (+124%)
                      </Typography>
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="fcol w-full gap-1 border-b border-white/20 pb-1.5">
                    <div className="frow-between w-full ps-6">
                      <Typography variant="small" color="submerged" className="font-mono">
                        LP Value
                      </Typography>
                      <Typography variant="small" color="primary" className="w-24 text-right font-mono">
                        30%
                      </Typography>
                    </div>

                    <div className="frow-between w-full ps-6">
                      <Typography variant="small" color="submerged" className="font-mono">
                        Yield
                      </Typography>
                      <Typography variant="small" color="primary" className="w-24 text-right font-mono">
                        30%
                      </Typography>
                    </div>

                    <div className="frow-between w-full">
                      <div className="frow-icenter">
                        <Typography variant="small" color="primary" className="w-6 text-center font-mono">
                          -
                        </Typography>
                        <Typography variant="small" color="submerged" className="font-mono">
                          Interest
                        </Typography>
                      </div>
                      <Typography variant="small" color="embossed" className="text-right font-mono">
                        15%
                      </Typography>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="frow-between w-full">
                    <div className="frow-center">
                      <Typography variant="small" color="primary" className="w-6 text-center font-mono">
                        =
                      </Typography>
                      <Typography variant="small" color="submerged" className="font-mono">
                        Leveraged Farming
                      </Typography>
                    </div>
                    <Typography variant="small" color="primary" className="text-right font-mono">
                      45%
                    </Typography>
                  </div>
                </div>
              );
            }}
          />
          <Legend
            content={({ payload }) => (
              <div className="frow-center gap-2 pl-[10%] pt-12">
                {payload?.map((entry, index) => (
                  <div
                    key={index}
                    className="fcenter color-embossed cursor-pointer"
                    onMouseEnter={() => setHoveredLine(entry.value)}
                    onMouseLeave={() => setHoveredLine(null)}
                  >
                    <div
                      className="mr-2 h-[1px] w-8"
                      style={{
                        borderTop:
                          entry.value === "Farm Without leverage"
                            ? `1px dashed ${entry.color}`
                            : `1px solid ${entry.color}`,
                      }}
                    />
                    <span className="text-submerged">{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
          <Line
            type="natural"
            dataKey="leveraged"
            name="Leveraged Farming"
            stroke={colors.primary50}
            dot={false}
            strokeWidth={2}
            opacity={hoveredLine ? (hoveredLine === "Leveraged Farming" ? 1 : 0.2) : 1}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey="normal"
            name="Farm Without leverage"
            stroke={colors.primary50}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={2}
            opacity={hoveredLine ? (hoveredLine === "Farm Without leverage" ? 1 : 0.2) : 1}
            animationBegin={200}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey="hodl"
            name="Hodl without farm"
            stroke={colors.embossed}
            dot={false}
            strokeWidth={2}
            opacity={hoveredLine ? (hoveredLine === "Hodl without farm" ? 1 : 0.2) : 1}
            animationBegin={400}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <ReferenceLine
            x={2}
            strokeDasharray="4 6"
            stroke={colors.destructive}
            label={{
              value: "Liquidation",
              fill: colors.destructive,
              position: "top",
              dy: -10,
            }}
          />
          <ReferenceLine
            x={8}
            strokeDasharray="4 6"
            stroke={colors.destructive}
            label={{
              value: "Liquidation",
              fill: colors.destructive,
              position: "top",
              dy: -10,
            }}
          />
          <ReferenceLine
            x={5}
            stroke={colors.submerged}
            strokeDasharray="4 6"
            label={{
              value: "Current Price",
              fill: "white",
              position: "top",
              dy: -10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
