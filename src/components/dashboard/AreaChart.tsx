import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useGetTaxesQuery,
  useUpdateTaxesMutation,
} from "@/redux/services/dashBoardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";
import PromoCodePage from "./PromoCode";

const taxSchema = z.object({
  shippingPrice: z.number().min(0),
  taxPrice: z.number().min(0),
});

type TaxForm = z.infer<typeof taxSchema>;

const incomeData = [
  { month: "January", value: 186 },
  { month: "February", value: 305 },
  { month: "March", value: 237 },
  { month: "April", value: 73 },
  { month: "May", value: 209 },
  { month: "June", value: 214 },
];

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomAreaTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg bg-white p-2 shadow-md text-sm">
        <div className="font-semibold">{label}</div>
        <div>{payload[0].value}</div>
      </div>
    );
  }

  return null;
};

const ChartAreaDefault = () => {
  const { data, isLoading } = useGetTaxesQuery({});
  const [updateTaxes] = useUpdateTaxesMutation();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const taxData = data?.data;

  const form = useForm<TaxForm>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      shippingPrice: 0,
      taxPrice: 0,
    },
  });

  /* OPEN MODAL */
  const handleOpenEdit = () => {
    form.reset({
      shippingPrice: taxData?.shippingPrice ?? 0,
      taxPrice: taxData?.taxPrice ?? 0,
    });

    setOpen(true);
  };

  /* SUBMIT */
  const onSubmit = async (values: TaxForm) => {
    try {
      setIsSaving(true);
      await updateTaxes(values).unwrap();
      setOpen(false);
    } catch (err) {
      console.log("Update failed:", err);
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart */}
      <Card className="rounded-3xl bg-white p-6 shadow-sm">
        <div>
          <h2 className="mb-4 text-[22px] font-bold text-[#1E3A8A]">
            Income Overview
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Shipping */}
            <Card className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#374151]">
                    Shipping price
                  </h3>

                  <p className="mt-3 text-[22px] font-bold text-[#3E325C]">
                    {isLoading ? "Loading..." : taxData?.shippingPrice}
                  </p>
                </div>

                <button
                  onClick={handleOpenEdit}
                  className="cursor-pointer mt-8 flex items-center justify-center gap-2 rounded-full bg-[#0BA8FF] py-2.5 text-white"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </Card>

            {/* Tax */}
            <Card className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-[#374151]">
                    Tax price
                  </h3>

                  <p className="mt-3 text-[22px] font-bold text-[#3E325C]">
                    {isLoading ? "Loading..." : taxData?.taxPrice}
                  </p>
                </div>

                <button
                  onClick={handleOpenEdit}
                  className="cursor-pointer mt-8 flex items-center justify-center gap-2 rounded-full bg-[#0BA8FF] py-2.5 text-white"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#1e3a8a]">
            Income statistics
          </h3>

          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-[#1e3a8a]">
            <ChevronDown size={15} />
            2024 Year
          </button>
        </div>

        <CardContent className="p-0">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={incomeData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.08} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 550]} />

              <Tooltip content={<CustomAreaTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#1e3a8a"
                strokeWidth={3}
                fill="url(#incomeGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Taxes</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="number"
              placeholder="Shipping Price"
              {...form.register("shippingPrice", {
                valueAsNumber: true,
              })}
            />

            <Input
              type="number"
              placeholder="Tax Price"
              {...form.register("taxPrice", {
                valueAsNumber: true,
              })}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <PromoCodePage />
    </div>
  );
};

export default ChartAreaDefault;
