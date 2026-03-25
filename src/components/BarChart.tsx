import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 120 },
  { month: "Jul", desktop: 234, mobile: 123 },
  { month: "Aug", desktop: 244, mobile: 256 },
  { month: "Sep", desktop: 124, mobile: 398 },
  { month: "Nov", desktop: 214, mobile: 245 },
  { month: "Dec", desktop: 424, mobile: 165 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "#c7d2fe" },
  mobile: { label: "Mobile", color: "#1e3a8a" },
} satisfies ChartConfig;

const BarChartComponent = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          barGap={2}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            domain={[0, 500]} // adjust based on your data range
            ticks={[0, 100, 200, 300, 400, 500]}
          />
          <Tooltip cursor={false} />
          <Bar
            dataKey="desktop"
            fill={chartConfig.desktop.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={20}
          />
          <Bar
            dataKey="mobile"
            fill={chartConfig.mobile.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChartComponent;
