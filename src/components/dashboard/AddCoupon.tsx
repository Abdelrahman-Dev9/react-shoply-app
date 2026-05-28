import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateCouponMutation } from "@/redux/services/dashBoardApi";
import { Calendar, ChevronUp, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const couponSchema = z.object({
  name: z.string().min(3, "Coupon name is required"),
  startDate: z.string().min(1, "Start date is required"),
  expire: z.string().min(1, "End date is required"),
  discount: z.number().min(1, "Discount is required"),
});

type CouponForm = z.infer<typeof couponSchema>;

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddCouponDialog = ({ open, setOpen }: Props) => {
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();

  const [tags, setTags] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [specificMode, setSpecificMode] = useState(true);

  const form = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      name: "",
      startDate: "",
      expire: "",
      discount: undefined,
    },
  });

  const handleAddTag = () => {
    const val = tagInputValue.trim();
    if (val) {
      setTags((prev) => [...prev, val]);
      setTagInputValue("");
    }
    setShowTagInput(false);
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    form.reset();
    setTags([]);
    setShowTagInput(false);
    setTagInputValue("");
  };

  const onSubmit = async (values: CouponForm) => {
    try {
      await createCoupon({
        name: values.name,
        expire: values.expire,
        discount: values.discount,
        sendTo: tags,
      }).unwrap();

      handleReset();
      setOpen(false);
    } catch (error) {
      console.log("Create coupon failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] w-full rounded-[24px] p-10 gap-0 [&>button]:hidden">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute left-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
        >
          ✕
        </button>

        <DialogHeader className="mb-7">
          <DialogTitle className="text-center text-xl font-bold text-[#1e3a8a]">
            Add new promocode
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* START + END DATE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-[14px] border border-gray-200 px-5 py-4">
              <label className="text-sm font-semibold text-[#1e3a8a] whitespace-nowrap shrink-0">
                Start date:
              </label>
              <input
                type="date"
                className="w-full min-w-0 border-none bg-transparent text-sm text-gray-500 outline-none"
                {...form.register("startDate")}
              />
            </div>

            <div className="flex items-center gap-3 rounded-[14px] border border-gray-200 px-5 py-4">
              <label className="text-sm font-semibold text-[#1e3a8a] whitespace-nowrap shrink-0">
                End date:
              </label>
              <input
                type="date"
                className="w-full min-w-0 border-none bg-transparent text-sm text-gray-500 outline-none"
                {...form.register("expire")}
              />
            </div>
          </div>

          {(form.formState.errors.startDate ||
            form.formState.errors.expire) && (
            <div className="grid grid-cols-2 gap-4 -mt-2">
              <p className="text-xs text-red-500 pl-1">
                {form.formState.errors.startDate?.message}
              </p>
              <p className="text-xs text-red-500 pl-1">
                {form.formState.errors.expire?.message}
              </p>
            </div>
          )}

          {/* CODE */}
          <div className="flex items-center gap-3 rounded-[14px] border border-gray-200 px-5 py-4">
            <label className="text-sm font-semibold text-[#1e3a8a] whitespace-nowrap shrink-0">
              Code :
            </label>
            <input
              placeholder="Abb75VNd"
              className="w-full border-none bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
              {...form.register("name")}
            />
          </div>

          {form.formState.errors.name && (
            <p className="text-xs text-red-500 -mt-2 pl-1">
              {form.formState.errors.name.message}
            </p>
          )}

          {/* DISCOUNT */}
          <div className="flex items-center gap-3 rounded-[14px] border border-gray-200 px-5 py-4">
            <label className="text-sm font-semibold text-[#1e3a8a] whitespace-nowrap shrink-0">
              Discount amount:
            </label>
            <input
              type="number"
              placeholder="EX: 100 %"
              className="w-full border-none bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
              {...form.register("discount", { valueAsNumber: true })}
            />
          </div>

          {form.formState.errors.discount && (
            <p className="text-xs text-red-500 -mt-2 pl-1">
              {form.formState.errors.discount.message}
            </p>
          )}

          {/* SEND TO */}
          <div className="flex flex-wrap items-center gap-2 rounded-[14px] border border-gray-200 px-5 py-4 min-h-[60px]">
            <span className="text-sm font-semibold text-[#1e3a8a] shrink-0">
              Send to:
            </span>

            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#1e3a8a]"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(i)}
                  className="ml-1 text-[#1e3a8a] hover:text-red-500 leading-none"
                >
                  ×
                </button>
              </span>
            ))}

            {showTagInput ? (
              <input
                autoFocus
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                  if (e.key === "Escape") {
                    setShowTagInput(false);
                    setTagInputValue("");
                  }
                }}
                onBlur={handleAddTag}
                placeholder="Doctor name or ID"
                className="rounded-full border border-blue-300 px-3 py-1 text-xs outline-none w-36 placeholder:text-gray-400"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowTagInput(true)}
                className="rounded-full border border-dashed border-blue-300 px-3 py-1 text-xs text-gray-500 hover:border-blue-400 hover:text-gray-600 transition-colors"
              >
                Add new name
              </button>
            )}

            <button
              type="button"
              onClick={() => setSpecificMode((v) => !v)}
              className="ml-auto flex items-center gap-1 rounded-full bg-[#1e3a8a] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#1a3275] transition-colors shrink-0"
            >
              Specific name
              <ChevronUp
                className={`h-3 w-3 transition-transform ${
                  specificMode ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reset all
            </button>

            <button
              type="submit"
              disabled={isCreating}
              className="rounded-xl bg-[#1e3a8a] px-14 py-3.5 text-sm font-semibold text-white hover:bg-[#1a3275] disabled:opacity-60 transition-colors"
            >
              {isCreating ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCouponDialog;
