import { Ban, Pencil, X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useEditUserMutation } from "@/redux/services/authApi";

export type UserStatus = "Active" | "inactive";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status?: UserStatus;
}

const UserDetailModal = ({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editUser, { isLoading }] = useEditUserMutation();

  const [formData, setFormData] = useState({
    name: user.name,
    profileImage: user.profileImage || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);

      if (imageFile) {
        data.append("profileImage", imageFile);
      }

      await editUser({
        id: user._id,
        formData: data,
      }).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={formData.profileImage} />

              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-lg font-bold">{formData.name}</h2>

              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>

            <Input
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Profile Image
            </label>

            {isEditing ? (
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            ) : (
              <Input disabled value={formData.profileImage || ""} />
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>

            <Input disabled value={user.phone} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>

            <Input disabled value={user.email} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="destructive">
            <Ban size={16} />
            Delete
          </Button>

          {isEditing ? (
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
