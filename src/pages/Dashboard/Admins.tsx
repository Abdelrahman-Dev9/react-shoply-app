import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetAdminsQuery } from "@/redux/services/authApi";
import { Ban, Loader2, Pencil, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

type UserStatus = "Active" | "inactive";

interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status?: UserStatus;
}

function UserDetailModal({
  user,
  onClose,
}: {
  user: Admin;
  onClose: () => void;
}) {
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
          <button className="text-red-500 flex gap-1 items-center text-sm font-medium">
            <Ban size={14} />
            Block
          </button>

          <button className="text-blue-600 flex gap-1 items-center text-sm font-medium">
            <Pencil size={14} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminsPage = () => {
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);

  // RTK Query
  const { data, isLoading, error } = useGetAdminsQuery({});
  console.log(data);

  // Safe Data
  const admins: Admin[] = useMemo(() => {
    return (
      data?.allAdmins?.map((admin: Admin) => ({
        ...admin,
        status: admin.status || "Active",
      })) || []
    );
  }, [data]);

  // Filtered Data
  const filteredAdmins = useMemo(() => {
    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.phone.includes(search) ||
        admin.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [admins, search]);

  // Error State
  if (error) {
    return <div className="p-6 text-red-500">Failed to load admins</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="font-bold text-2xl">Admins ({admins.length})</h1>

          <Input
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Loading */}

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16">
            <Loader2 className="animate-spin" />
            <span>Loading admins...</span>
          </div>
        ) : (
          <table className="w-full">
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr
                  key={admin._id}
                  onClick={() => {
                    setSelectedUser(admin);
                  }}
                  className="border-t cursor-pointer hover:bg-gray-50 transition"
                >
                  {/* User */}

                  <td className="p-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={admin.profileImage} />

                      <AvatarFallback>
                        {admin.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="font-medium">{admin.name}</span>
                  </td>

                  {/* Phone */}

                  <td>{admin.phone}</td>

                  {/* Email */}

                  <td>{admin.email}</td>

                  {/* Role */}

                  <td>Admin</td>

                  {/* Status */}

                  <td>
                    <Badge
                      className={`hover:bg-transparent ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {admin.status || "Active"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default AdminsPage;
