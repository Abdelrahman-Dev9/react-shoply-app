import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCouponsQuery } from "@/redux/services/dashBoardApi";
import { useState } from "react";
import AddCouponDialog from "./AddCoupon";

interface Coupon {
  _id: string;
  name: string;
  createdAt: string;
  expire: string;
  discount: number;
  doctor?: string;
  used?: number;
}

const PromoCodePage = () => {
  const { data, isLoading } = useGetCouponsQuery({});
  const [open, setOpen] = useState(false);

  const coupons = data?.data || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* MAIN TABLE */}
      <Card className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
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
          <div className="grid grid-cols-6 border-b border-gray-200 pb-4 text-sm font-semibold text-[#374151]">
            <p>Code</p>
            <p>Start date</p>
            <p>End date</p>
            <p>Discount</p>
            <p>Doctors</p>
            <p className="text-center">Times used</p>
          </div>

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

      {/* MODAL */}
      <AddCouponDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default PromoCodePage;
