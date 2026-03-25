import { ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const incomeData = [
  { month: "January", value: 186 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
];

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md text-sm">
        <div className="font-semibold">{label}</div>
        <div>{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export function ChartAreaDefault() {
  return (
    <Card className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <CardHeader className="flex items-center justify-between mb-4">
        <CardTitle className="text-lg font-bold text-gray-800">
          Income Overview
        </CardTitle>
        <button className="flex items-center gap-1.5 bg-[#1e3a8a] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors">
          2024
          <ChevronDown size={13} />
        </button>
      </CardHeader>

      {/* Chart */}
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={incomeData}>
            {/* Gradient fill for the area */}
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.3} />
              </linearGradient>
            </defs>

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
              domain={[0, 550]}
              ticks={[100, 200, 300, 400, 500]}
            />
            <Tooltip content={<CustomAreaTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1e3a8a"
              strokeWidth={2.5}
              fill="url(#incomeGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#1e3a8a", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ChartAreaDefault;
