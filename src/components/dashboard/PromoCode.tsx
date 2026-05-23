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
  useCreateCouponMutation,
  useGetCouponsQuery,
} from "@/redux/services/dashBoardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface Coupon {
  _id: string;
  name: string;
  createdAt: string;
  expire: string;
  discount: number;
  doctor?: string;
  used?: number;
}
const couponSchema = z.object({
  name: z.string().min(3, "Coupon name is required"),
  expire: z.string().min(1, "Expire date is required"),
  discount: z.number().min(1, "Discount is required"),
  sendTo: z.string().min(1, "Doctor ids are required"),
});
type CouponForm = z.infer<typeof couponSchema>;

const PromoCodePage = () => {
  const { data, isLoading } = useGetCouponsQuery({});
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [open, setOpen] = useState(false);
  const coupons = data?.data || [];

  const form = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      name: "",
      expire: "",
      sendTo: "",
    },
  });

  const onSubmit = async (values: CouponForm) => {
    try {
      await createCoupon({
        name: values.name,
        expire: values.expire,
        discount: values.discount,

        sendTo: values.sendTo.split(",").map((id) => id.trim()),
      }).unwrap();

      form.reset();

      setOpen(false);
    } catch (error) {
      console.log("Create coupon failed:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Card className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">Promocode List</h2>

          <Button
            onClick={() => setOpen(true)}
            className="h-11 rounded-xl bg-[#1e3a8a] px-6 text-sm font-medium hover:bg-[#1a3275]"
          >
            Add new Promocode
          </Button>
        </div>

        <CardContent className="p-0">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-6 border-b border-gray-200 pb-4 text-sm font-semibold text-[#374151]">
            <p>Code</p>
            <p>Start date</p>
            <p>End date</p>
            <p>Discount</p>
            <p>Doctors</p>
            <p className="text-center">Times used</p>
          </div>

          {/* TABLE BODY */}
          <div className="divide-y divide-gray-100">
            {coupons.map((item: Coupon) => (
              <div
                key={item._id}
                className="grid grid-cols-6 items-center py-6 text-sm text-[#6B7280]"
              >
                <p className="font-medium text-[#374151]">{item.name}</p>

                <p>{new Date(item.createdAt).toLocaleDateString()}</p>

                <p>{item.expire}</p>

                <p>{item.discount}%</p>

                <p className="font-medium text-[#374151]">
                  {item.doctor || "-"}
                </p>

                <p className="text-center font-medium text-[#374151]">
                  {item.used || 0}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CREATE COUPON MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Coupon</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* NAME */}
            <div className="space-y-2">
              <Input placeholder="Coupon Name" {...form.register("name")} />

              <p className="text-sm text-red-500">
                {form.formState.errors.name?.message}
              </p>
            </div>

            {/* EXPIRE */}
            <div className="space-y-2">
              <Input type="date" {...form.register("expire")} />

              <p className="text-sm text-red-500">
                {form.formState.errors.expire?.message}
              </p>
            </div>

            {/* DISCOUNT */}
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter The Discount"
                {...form.register("discount", {
                  valueAsNumber: true,
                })}
              />

              <p className="text-sm text-red-500">
                {form.formState.errors.discount?.message}
              </p>
            </div>

            {/* SEND TO */}
            <div className="space-y-2">
              <Input
                placeholder="doctorId1,doctorId2"
                {...form.register("sendTo")}
              />

              <p className="text-xs text-gray-500">Separate ids with comma</p>

              <p className="text-sm text-red-500">
                {form.formState.errors.sendTo?.message}
              </p>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Coupon"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromoCodePage;
