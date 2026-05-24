import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/services/dashBoardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

const editCouponSchema = z.object({
  name: z.string().min(1, "Name is required"),

  expire: z.string().min(1, "Expire date is required"),

  discount: z
    .number()
    .min(1, "Discount must be greater than 0")
    .refine((val) => !isNaN(val), {
      message: "Discount is required",
    }),
});

type EditCouponValues = z.infer<typeof editCouponSchema>;

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
  const [deleteCoupon, { isLoading: deleteLoading }] =
    useDeleteCouponMutation();

  const [updateCoupon, { isLoading: updateLoading }] =
    useUpdateCouponMutation();

  const form = useForm<EditCouponValues>({
    resolver: zodResolver(editCouponSchema),

    defaultValues: {
      name: "",
      expire: "",
      discount: 0,
    },
  });

  useEffect(() => {
    if (coupon) {
      form.reset({
        name: coupon.name,
        expire: coupon.expire,
        discount: coupon.discount,
      });
    }
  }, [coupon, form]);

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

  const onSubmit = async (data: EditCouponValues) => {
    try {
      await updateCoupon({
        id: coupon._id,
        body: data,
      }).unwrap();

      console.log("Updated Successfully");

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-[#1e3a8a]">
            Edit Coupon
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <Input placeholder="Coupon Name" {...form.register("name")} />

            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* EXPIRE */}
          <div>
            <Input placeholder="Expire Date" {...form.register("expire")} />

            {form.formState.errors.expire && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.expire.message}
              </p>
            )}
          </div>

          {/* DISCOUNT */}
          <div>
            <Input
              type="number"
              placeholder="Discount"
              {...form.register("discount", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.discount && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.discount.message}
              </p>
            )}
          </div>

          {/* UPDATE BUTTON */}
          <Button
            type="submit"
            disabled={updateLoading}
            className="w-full bg-[#1e3a8a] hover:bg-[#1a3275]"
          >
            {updateLoading ? "Updating..." : "Update Coupon"}
          </Button>

          {/* DELETE BUTTON */}
          <Button
            type="button"
            disabled={deleteLoading}
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {deleteLoading ? "Deleting..." : "Delete Coupon"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponActionDialog;
