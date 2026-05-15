import { X, Ban, Pencil } from "lucide-react";
import { Input } from "../ui/input";

export type UserStatus = "Active" | "inactive";

export interface Admin {
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
  user: Admin;
  onClose: () => void;
}) => {
  const handleDelete = async () => {
    // try {
    //   await deleteAdmin(user._id).unwrap();
    //   onClose();
    // } catch (err) {
    //   console.error("Failed to delete admin", err);
    // }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{user.name}</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <Input value={user.email} readOnly />
          <Input value={user.phone} readOnly />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDelete}
            // disabled={isLoading}
            className="text-red-500 flex gap-1 items-center text-sm font-medium"
          >
            <Ban size={14} />
            {/* {isLoading ? "Deleting..." : "Delete"} */}
          </button>

          <button className="text-blue-600 flex gap-1 items-center text-sm font-medium">
            <Pencil size={14} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
