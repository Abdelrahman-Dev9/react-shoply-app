import { useCreateCategoryMutation } from "@/redux/services/categoryApi";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateCategory = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  if (!open) return null;

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      await createCategory(formData).unwrap();

      setName("");
      setImage(null);
      onClose();
    } catch (err) {
      console.error("Create category failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[400px] rounded-xl bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Add Category</h2>
          <button type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <input
          className="mb-3 w-full rounded border p-2"
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
            type="button"
            onClick={onClose}
            className="rounded border px-3 py-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={isLoading || !name}
            className="rounded bg-blue-900 px-3 py-1 text-white disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
