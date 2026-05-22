import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useGetStatisticsQuery } from "@/redux/services/dashBoardApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "#c7d2fe",
  },
  ordersCount: {
    label: "Orders",
    color: "#1e3a8a",
  },
} satisfies ChartConfig;

const BarChartComponent = () => {
  const { data, isLoading, isError } = useGetStatisticsQuery({});

  const statistics = data?.data?.["2026"] || [];

  const chartData = statistics.map((item: any) => ({
    month: item.monthName.slice(0, 3),
    totalSales: item.totalSales,
    ordersCount: item.ordersCount,
  }));

  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[300px] items-center justify-center text-red-500">
        Failed to load statistics
      </div>
    );
  }

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
          />

          <Tooltip cursor={false} />

          <Bar
            dataKey="totalSales"
            fill={chartConfig.totalSales.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={20}
          />

          <Bar
            dataKey="ordersCount"
            fill={chartConfig.ordersCount.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChartComponent;
