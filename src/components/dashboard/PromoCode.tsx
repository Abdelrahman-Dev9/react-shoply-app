import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCouponsQuery } from "@/redux/services/dashBoardApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import AddCouponDialog from "./AddCoupon";
import CouponActionDialog from "./CouponActionDialog";

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
  const { data, isLoading, isError } = useGetCouponsQuery({});
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const coupons = data?.data || [];

  if (isError) {
    return (
      <div className="flex h-[200px] items-center justify-center text-red-500">
        Failed to load coupons
      </div>
    );
  }

  return (
    <>
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
          {/* HEADER */}
          <div className="grid grid-cols-4 border-b border-gray-200 pb-4 text-sm font-semibold text-[#374151]">
            <p>Code</p>
            <p>Start date</p>
            <p>End date</p>
            <p>Discount</p>
          </div>

          {/* BODY */}
          <div className="relative min-h-[200px] divide-y divide-gray-100">
            {/* LOADING OVERLAY */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
                <Loader2 className="h-8 w-8 animate-spin " />
              </div>
            )}

            {/* DATA */}
            {!isLoading &&
              coupons.map((item: Coupon) => (
                <div
                  onClick={() => {
                    setSelectedCoupon(item);
                    setActionOpen(true);
                  }}
                  key={item._id}
                  className="grid grid-cols-4 cursor-pointer items-center py-6 text-sm text-[#6B7280] hover:bg-gray-50"
                >
                  <p className="font-medium text-[#374151]">{item.name}</p>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  <p>{new Date(item.expire).toLocaleDateString()}</p>
                  <p className="ml-3">{item.discount}%</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <AddCouponDialog open={open} setOpen={setOpen} />

      <CouponActionDialog
        open={actionOpen}
        setOpen={setActionOpen}
        coupon={selectedCoupon}
      />
    </>
  );
};

export default PromoCodePage;
