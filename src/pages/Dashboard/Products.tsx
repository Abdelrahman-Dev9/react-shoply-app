import CurrentProductsTable from "@/components/products/CurrentProductsTable";
import SearchBar from "@/components/products/SearchBar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "@/redux/services/authApi";
import { Plus } from "lucide-react";
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const category = form.get("category") as string;

    const price = Number(form.get("price") || 0);
    const quantity = Number(form.get("quantity") || 0);
    const discountRaw = form.get("priceAfterDiscount");

    const image = form.get("imageCover");

    // ✅ FILE VALIDATION
    if (!(image instanceof File)) {
      alert("Please upload an image");
      return;
    }

    // ✅ BASIC VALIDATION
    if (!title || !price || !quantity || !description || !category) {
      alert("Please fill all required fields");
      return;
    }

    if (price <= 0 || quantity <= 0) {
      alert("Price and quantity must be greater than 0");
      return;
    }

    const payload = new FormData();

    payload.append("title", title);
    payload.append("price", String(price));
    payload.append("quantity", String(quantity));
    payload.append("description", description);
    payload.append("category", category);

    // ✅ DISCOUNT HANDLING
    if (discountRaw) {
      const discount = Number(discountRaw);

      if (!isNaN(discount) && discount >= price) {
        alert("Discount price must be lower than price");
        return;
      }

      payload.append("priceAfterDiscount", String(discount));
    }

    payload.append("imageCover", image);

    try {
      await addProduct(payload).unwrap();
      setOpen(false);
      e.currentTarget.reset();
    } catch (err: any) {
      console.log("FULL ERROR:", err?.data || err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

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

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-[650px] rounded-2xl shadow-xl p-6 space-y-5"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a8a]">
                Create Product
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-4">
              {/* TITLE */}
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm text-gray-600">Title</label>
                <input
                  name="title"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* PRICE */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Price</label>
                <input
                  name="price"
                  type="number"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* PRICE AFTER DISCOUNT */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">
                  Price After Discount
                </label>
                <input
                  name="priceAfterDiscount"
                  type="number"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* QUANTITY */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* CATEGORY */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Category</label>
                <input
                  name="category"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Image</label>
              <input
                name="imageCover"
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className="px-5 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-blue-900"
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
