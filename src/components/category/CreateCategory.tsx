import React from "react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;

  name: string;
  setName: (v: string) => void;

  image: File | null;
  setImage: (v: File | null) => void;

  handleCreate: () => void;
  creating: boolean;
};

const CreateCategory: React.FC<Props> = ({
  open,
  setOpen,
  name,
  setName,
  setImage,
  handleCreate,
  creating,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
  );
};

export default CreateCategory;
