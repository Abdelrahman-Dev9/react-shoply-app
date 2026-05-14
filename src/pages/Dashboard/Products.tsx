import { Plus } from "lucide-react";
import { useState } from "react";

import { useGetProductsQuery } from "@/redux/services/authApi";

import CurrentProductsTable from "@/components/products/CurrentProductsTable";
import SearchBar from "@/components/products/SearchBar";

import { useFilteredProducts } from "@/hooks/useFilteredProducts";

const ProductsPage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword: search,
    sort: "-createdAt",
  });

  const products = data?.data || [];

  const filteredProducts = useFilteredProducts(products, search);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl">
            Current products ({filteredProducts.length})
          </h2>

          <SearchBar value={search} onChange={setSearch} />

          <button className="ml-auto flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl">
            <Plus size={15} />
            Add product
          </button>
        </div>

        <CurrentProductsTable products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
