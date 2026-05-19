import CurrentProductsTable from "@/components/products/CurrentProductsTable";
import CreateProduct from "@/components/products/CreateProduct";
import SearchBar from "@/components/products/SearchBar";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword: search,
    sort: "-createdAt",
  });

  const filteredProducts = useFilteredProducts(data?.data ?? []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2">
        <Loader2 className="animate-spin text-[#1e3a8a]" />
        <span>Loading products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">Failed to load products. Please try again.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] p-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="text-xl font-bold text-[#1e3a8a]">
            Current products ({filteredProducts.length})
          </h2>

          <SearchBar value={search} onChange={setSearch} />

          <button
            onClick={() => setOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-4 py-2 text-white"
          >
            <Plus size={15} />
            Add product
          </button>
        </div>

        <CurrentProductsTable products={filteredProducts} />
      </div>

      {open && <CreateProduct onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ProductsPage;
