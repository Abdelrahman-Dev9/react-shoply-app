import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/services/categoryApi";
import type { Category } from "@/types/category.types";
import { Ban, Loader2, Pencil, X } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

const CategoryDetails = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(selectedCategory.name);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const previewImage = imageFile
    ? URL.createObjectURL(imageFile)
    : selectedCategory.image;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      setSelectedCategory(null);
    } catch (err) {
      console.error("Delete category failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile);

      await updateCategory({ id: selectedCategory._id, data: formData }).unwrap();
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Update category failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-5xl rounded-[30px] bg-[#f5f5f5] p-8">
        {/* CLOSE */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
        >
          <X size={16} />
        </button>

        {/* TITLE */}
        <h2 className="mb-12 text-center text-[24px] font-semibold text-[#233B8E]">
          {selectedCategory.name}
        </h2>

        {/* IMAGE PREVIEW */}
        <div className="mb-12 flex min-h-[350px] items-center justify-center rounded-3xl border-2 border-dashed border-gray-400 p-10">
          <img
            src={previewImage}
            alt={selectedCategory.name}
            className="h-[300px] w-[300px] object-contain"
          />
        </div>

        {/* EDIT FIELDS / INFO */}
        {isEditing ? (
          <div className="mb-8 space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-300 p-4 text-sm outline-none focus:border-[#233B8E]"
              placeholder="Category name"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border-2 border-dashed border-gray-300 p-4 text-sm"
            />
          </div>
        ) : (
          <div className="mb-12 rounded-2xl border-2 border-dashed border-gray-400 p-6">
            <p className="text-[16px] font-semibold">
              Category name:{" "}
              <span className="font-semibold text-gray-600">
                {selectedCategory.name}
              </span>
            </p>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-6 md:flex-row">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setName(selectedCategory.name);
                  setImageFile(null);
                }}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-gray-400 px-10 py-5 text-[16px] font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !name.trim()}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#233B8E] px-10 py-5 text-[16px] font-semibold text-white disabled:opacity-60"
              >
                {isUpdating && <Loader2 size={16} className="animate-spin" />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#233B8E] px-10 py-5 text-[16px] font-semibold text-[#233B8E] disabled:opacity-60"
              >
                {isDeleting ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Ban size={13} />
                )}
                {isDeleting ? "Deleting..." : "Delete category"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#233B8E] px-10 py-5 text-[16px] font-semibold text-white"
              >
                <Pencil size={13} />
                Edit category
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
