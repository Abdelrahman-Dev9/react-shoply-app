import type { Admin } from "@/components/admins/adminsDetails";
import UserDetailModal from "@/components/admins/adminsDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetAdminsQuery } from "@/redux/services/authApi";
import { Loader2, Plus } from "lucide-react";
import { useMemo, useState } from "react";

const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);

  const { data, isLoading, error } = useGetAdminsQuery({});

  const admins: Admin[] = useMemo(() => {
    return (
      data?.allAdmins?.map((admin: Admin) => ({
        ...admin,
        status: admin.status || "Active",
      })) || []
    );
  }, [data]);

  const filteredAdmins = useMemo(() => {
    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.phone.includes(search)
    );
  }, [admins, search]);

  if (error) {
    return <div className="p-6 text-red-500">Failed to load admins</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold">Admins ({admins.length})</h1>

          <Input
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <button className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-800">
            <Plus size={16} />
            Add Admin
          </button>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-20">
            <Loader2 className="animate-spin" />
            <span>Loading admins...</span>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No admins found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr
                    key={admin._id}
                    onClick={() => setSelectedUser(admin)}
                    className="cursor-pointer border-t transition hover:bg-gray-50"
                  >
                    {/* USER */}
                    <td className="flex items-center gap-3 p-4">
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

                    {/* PHONE */}
                    <td>{admin.phone}</td>

                    {/* EMAIL */}
                    <td>{admin.email}</td>

                    {/* ROLE */}
                    <td>Admin</td>

                    {/* STATUS */}
                    <td>
                      <Badge
                        className={`hover:bg-transparent ${
                          admin.status === "Active"
                            ? "border-green-200 bg-green-100 text-green-700"
                            : "border-red-200 bg-red-100 text-red-700"
                        }`}
                      >
                        {admin.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
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
