import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/authApi";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
const CategoryPage = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCategoriesQuery({
    keyword: search,
    page,
    limit: 5,
    sort: "-createdAt",
  });

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    await createCategory(formData).unwrap();

    setName("");
    setImage(null);
    setOpen(false);
  };

  const pagination = data?.paginationResult;

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-bold text-blue-900">Categories</h2>

          {/* SEARCH */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2 flex-1">
            <Search size={14} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page on search
              }}
              placeholder="Search category"
              className="flex-1 outline-none text-sm"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-blue-900 text-white px-3 py-2 rounded-xl flex items-center gap-2"
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
                data?.data?.map((cat: any) => (
                  <tr key={cat._id} className="border-t">
                    <td className="p-3">
                      <img
                        src={cat.image}
                        className="w-[80px] h-[80px] object-contain"
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
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={!pagination?.prev}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <p className="text-sm text-gray-600">
            Page {pagination?.currentPage} of {pagination?.numberOfPages}
          </p>

          <button
            disabled={!pagination?.next}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[400px]">
            <h2 className="text-lg font-bold mb-3">Add Category</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-3 py-1 bg-blue-900 text-white rounded"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
