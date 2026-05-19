import { useDeleteAdminMutation, useEditAdminMutation } from "@/redux/services/adminApi";
import type { Admin } from "@/types/admin.types";
import { Ban, Loader2, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface Props {
  admin: Admin;
  onClose: () => void;
}

const AdminDetailModal = ({ admin, onClose }: Props) => {
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [editAdmin, { isLoading: isUpdating }] = useEditAdminMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(admin.name);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleDelete = async () => {
    try {
      await deleteAdmin(admin._id).unwrap();
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profileImage) formData.append("profileImage", profileImage);

      await editAdmin({ id: admin._id, data: formData }).unwrap();
      setIsEditing(false);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Admin" : admin.name}
          </h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : admin.profileImage ||
                    `https://ui-avatars.com/api/?name=${admin.name}`
              }
              alt={admin.name}
              className="h-24 w-24 rounded-full border object-cover"
            />
          </div>

          {isEditing ? (
            <>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin name"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) setProfileImage(e.target.files[0]);
                }}
                className="w-full rounded-lg border p-2"
              />
            </>
          ) : (
            <>
              <Input value={admin.email} readOnly />
              <Input value={admin.phone} readOnly />
            </>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex items-center gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {isUpdating && <Loader2 size={16} className="animate-spin" />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-500 hover:text-black"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Ban size={14} />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
              >
                <Pencil size={14} />
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDetailModal;
