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
import { Calendar, Pencil, Ban } from "lucide-react";

const editCouponSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().optional(),
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
      startDate: "",
      expire: "",
      discount: 0,
    },
  });

  useEffect(() => {
    if (coupon) {
      form.reset({
        name: coupon.name,
        startDate: "",
        expire: coupon.expire,
        discount: coupon.discount,
      });
    }
  }, [coupon, form]);

  if (!open || !coupon) return null;

  const handleDelete = async () => {
    try {
      await deleteCoupon(coupon._id).unwrap();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: EditCouponValues) => {
    try {
      await updateCoupon({
        id: coupon._id,
        body: {
          name: data.name,
          expire: data.expire,
          discount: data.discount,
        },
      }).unwrap();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[640px] rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#1e3a8a]">
            Edit promocode
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* NAME */}
          <div>
            <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
              <span className="font-semibold text-[#1e3a8a] whitespace-nowrap">
                Name:
              </span>
              <Input
                placeholder="Coupon name"
                {...form.register("name")}
                className="border-0 p-0 focus-visible:ring-0 shadow-none h-auto"
              />
            </div>
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            {/* START DATE */}
            <div>
              <div className="flex items-center justify-between border rounded-xl px-4 py-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold whitespace-nowrap">
                    Start date:
                  </span>
                  <Input
                    type="date"
                    {...form.register("startDate")}
                    className="border-0 p-0 focus-visible:ring-0 shadow-none h-auto w-full"
                  />
                </div>
                <Calendar className="text-[#1e3a8a] w-5 h-5 flex-shrink-0" />
              </div>
            </div>

            {/* END DATE */}
            <div>
              <div className="flex items-center justify-between border rounded-xl px-4 py-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold whitespace-nowrap">
                    End date:
                  </span>
                  <Input
                    type="date"
                    {...form.register("expire")}
                    className="border-0 p-0 focus-visible:ring-0 shadow-none h-auto w-full"
                  />
                </div>
                <Calendar className="text-[#1e3a8a] w-5 h-5 flex-shrink-0" />
              </div>
              {form.formState.errors.expire && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.expire.message}
                </p>
              )}
            </div>
          </div>

          {/* DISCOUNT */}
          <div>
            <div className="flex items-center border rounded-xl px-4 py-3 gap-2">
              <span className="font-semibold whitespace-nowrap">
                Discount amount:
              </span>
              <Input
                type="number"
                placeholder="EX: 100 %"
                {...form.register("discount", { valueAsNumber: true })}
                className="border-0 p-0 focus-visible:ring-0 shadow-none h-auto"
              />
            </div>
            {form.formState.errors.discount && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.discount.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={deleteLoading}
              onClick={handleDelete}
              className="rounded-2xl border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5 py-6 text-base"
            >
              <Ban className="w-4 h-4 mr-2" />
              {deleteLoading ? "Deleting..." : "Delete promocode"}
            </Button>

            <Button
              type="submit"
              disabled={updateLoading}
              className="rounded-2xl bg-[#1e3a8a] hover:bg-[#1a3275] text-white py-6 text-base"
            >
              <Pencil className="w-4 h-4 mr-2" />
              {updateLoading ? "Updating..." : "Edit promocode"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponActionDialog;
