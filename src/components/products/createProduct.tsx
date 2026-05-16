import CurrentProductsTable from "@/components/products/CurrentProductsTable";
import SearchBar from "@/components/products/SearchBar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "@/redux/services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

/* -------------------- TYPE (IMPORTANT FIX) -------------------- */
type ProductForm = {
  title: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  priceAfterDiscount?: number;
  imageCover: FileList;
};

/* -------------------- ZOD SCHEMA -------------------- */
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),

  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().positive("Quantity must be greater than 0"),

  priceAfterDiscount: z.number().optional(),

  imageCover: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required"),
});

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword: search,
    sort: "-createdAt",
  });

  const [addProduct, { isLoading: isCreating }] = useAddProductMutation();

  const products = data?.data || [];
  const filteredProducts = useFilteredProducts(products, search);

  /* -------------------- FORM -------------------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values: ProductForm) => {
    const image = values.imageCover[0];

    // discount validation
    if (
      values.priceAfterDiscount &&
      values.priceAfterDiscount >= values.price
    ) {
      alert("Discount must be lower than price");
      return;
    }

    const payload = new FormData();

    payload.append("title", values.title);
    payload.append("description", values.description);
    payload.append("category", values.category);
    payload.append("price", String(values.price));
    payload.append("quantity", String(values.quantity));

    if (values.priceAfterDiscount) {
      payload.append("priceAfterDiscount", String(values.priceAfterDiscount));
    }

    payload.append("imageCover", image);

    try {
      await addProduct(payload).unwrap();
      setOpen(false);
      reset();
    } catch (err) {
      console.log("CREATE PRODUCT ERROR:", err);
    }
  };

  /* -------------------- LOADING STATES -------------------- */
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl">
            Current products ({filteredProducts.length})
          </h2>

          <SearchBar value={search} onChange={setSearch} />

          <button
            onClick={() => setOpen(true)}
            className="ml-auto flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl"
          >
            <Plus size={15} />
            Add product
          </button>
        </div>

        <CurrentProductsTable products={filteredProducts} />
      </div>

      {/* -------------------- MODAL -------------------- */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-[650px] rounded-2xl shadow-xl p-6 space-y-4"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a8a]">
                Create Product
              </h2>

              <button type="button" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-4">
              {/* TITLE */}
              <div className="col-span-2">
                <input
                  placeholder="Title"
                  {...register("title")}
                  className="border p-2 rounded w-full"
                />
                <p className="text-red-500 text-sm">{errors.title?.message}</p>
              </div>

              {/* PRICE */}
              <div>
                <input
                  type="number"
                  placeholder="Price"
                  {...register("price", { valueAsNumber: true })}
                  className="border p-2 rounded w-full"
                />
                <p className="text-red-500 text-sm">{errors.price?.message}</p>
              </div>

              {/* DISCOUNT */}
              <div>
                <input
                  type="number"
                  placeholder="Discount"
                  {...register("priceAfterDiscount", {
                    valueAsNumber: true,
                  })}
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* QUANTITY */}
              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  {...register("quantity", { valueAsNumber: true })}
                  className="border p-2 rounded w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.quantity?.message}
                </p>
              </div>

              {/* CATEGORY */}
              <div>
                <input
                  placeholder="Category"
                  {...register("category")}
                  className="border p-2 rounded w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.category?.message}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="col-span-2">
                <textarea
                  placeholder="Description"
                  {...register("description")}
                  className="border p-2 rounded w-full"
                />
                <p className="text-red-500 text-sm">
                  {errors.description?.message}
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <input type="file" accept="image/*" {...register("imageCover")} />
              <p className="text-red-500 text-sm">
                {errors.imageCover?.message as string}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded"
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
