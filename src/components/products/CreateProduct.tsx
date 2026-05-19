import { useAddProductMutation } from "@/redux/services/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createProductSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be greater than 0"),
    quantity: z.number().positive("Quantity must be greater than 0"),
    priceAfterDiscount: z.number().optional(),
    imageCover: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Image is required"),
  })
  .refine(
    (data) =>
      !data.priceAfterDiscount || data.priceAfterDiscount < data.price,
    {
      message: "Discount must be lower than the original price",
      path: ["priceAfterDiscount"],
    }
  );

type CreateProductFormData = z.infer<typeof createProductSchema>;

interface Props {
  onClose: () => void;
}

const CreateProduct = ({ onClose }: Props) => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (values: CreateProductFormData) => {
    const payload = new FormData();
    payload.append("title", values.title);
    payload.append("description", values.description);
    payload.append("category", values.category);
    payload.append("price", String(values.price));
    payload.append("quantity", String(values.quantity));
    if (values.priceAfterDiscount) {
      payload.append("priceAfterDiscount", String(values.priceAfterDiscount));
    }
    payload.append("imageCover", values.imageCover[0]);

    try {
      await addProduct(payload).unwrap();
      onClose();
    } catch (err: any) {
      setError("root", {
        message: err?.data?.message || "Failed to create product",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[90vh] w-[650px] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl space-y-4"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1e3a8a]">Create Product</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm text-gray-600">Title</label>
            <input
              {...register("title")}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.price && (
              <p className="text-xs text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Price After Discount</label>
            <input
              type="number"
              step="0.01"
              {...register("priceAfterDiscount", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.priceAfterDiscount && (
              <p className="text-xs text-red-500">
                {errors.priceAfterDiscount.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Quantity</label>
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Category</label>
            <input
              {...register("category")}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={3}
              {...register("description")}
              className="resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("imageCover")}
            className="rounded-lg border border-gray-300 p-2"
          />
          {errors.imageCover && (
            <p className="text-xs text-red-500">
              {errors.imageCover.message as string}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="text-center text-sm text-red-500">
            {errors.root.message}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-[#1e3a8a] px-5 py-2 text-white hover:bg-blue-900 disabled:opacity-60"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
