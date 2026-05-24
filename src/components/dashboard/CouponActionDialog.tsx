import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteCouponMutation } from "@/redux/services/dashBoardApi";

interface Coupon {
  _id: string;
  name: string;
  expire: string;
  discount: number;
  doctor?: string;
}

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  coupon: Coupon | null;
}

const CouponActionDialog = ({ open, setOpen, coupon }: Props) => {
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

  if (!open || !coupon) return null;

  const handleDelete = async () => {
    try {
      await deleteCoupon(coupon._id).unwrap();

      console.log("Deleted Successfully");

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-[#1e3a8a]">
            Coupon Actions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            ID:
            <span className="ml-1 font-semibold">{coupon._id}</span>
          </p>

          <p className="text-sm text-gray-600">
            Code:
            <span className="ml-1 font-semibold">{coupon.name}</span>
          </p>

          <Button className="w-full bg-[#1e3a8a] hover:bg-[#1a3275]">
            Edit
          </Button>

          <Button
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponActionDialog;
