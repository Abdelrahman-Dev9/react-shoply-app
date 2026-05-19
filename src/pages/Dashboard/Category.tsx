import CategoryDetails from "@/components/category/CategoryDetails";
import CreateCategory from "@/components/category/CreateCategory";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import type { Category } from "@/types/category.types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const CategoryPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { data, isLoading } = useGetCategoriesQuery({
    keyword: search,
    page,
    limit: 5,
    sort: "-createdAt",
  });

  const pagination = data?.paginationResult;

  return (
    <div className="min-h-screen bg-[#f0f4ff] p-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        {/* HEADER */}
        <div className="mb-5 flex items-center gap-3">
          <h2 className="text-xl font-bold text-blue-900">Categories</h2>

          <div className="flex flex-1 items-center gap-2 rounded-xl border px-3 py-2">
            <Search size={14} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search category"
              className="flex-1 text-sm outline-none"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-900 px-3 py-2 text-white"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-4">Loading...</td>
                </tr>
              ) : (
                data?.data?.map((cat: Category) => (
                  <tr
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat)}
                    className="cursor-pointer border-t transition hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-[80px] w-[80px] object-contain"
                      />
                    </td>
                    <td className="p-3 font-medium">{cat.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-4 flex items-center justify-between">
          <button
            disabled={!pagination?.prev}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>

          <p className="text-sm text-gray-600">
            Page {pagination?.currentPage} of {pagination?.numberOfPages}
          </p>

          <button
            disabled={!pagination?.next}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <CreateCategory open={open} onClose={() => setOpen(false)} />

      {selectedCategory && (
        <CategoryDetails
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
};

export default CategoryPage;
