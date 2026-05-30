import AddAdmin from "@/components/admins/AddAdmin";
import AdminDetailModal from "@/components/admins/AdminDetailModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/ui/StatusBadge";
import { useGetAdminsQuery } from "@/redux/services/adminApi";
import type { Admin } from "@/types/admin.types";
import { Loader2, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading, error } = useGetAdminsQuery(undefined);

  const admins: Admin[] = useMemo(() => {
    return (
      data?.allAdmins?.map((admin: Admin) => ({
        ...admin,
        status: admin.status ?? "Active",
      })) || []
    );
  }, [data]);

  const filteredAdmins = useMemo(() => {
    const q = search.toLowerCase();
    return admins.filter(
      (admin) =>
        admin.name?.toLowerCase().includes(q) ||
        admin.email?.toLowerCase().includes(q) ||
        admin.phone?.includes(search)
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

          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Search admins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-800"
          >
            <Plus size={16} />
            Add Admin
          </button>
        </div>

        {/* TABLE */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-20">
            <Loader2 className="animate-spin text-[#1e3a8a] h-8 w-8" />
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No admins found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="p-4 font-medium">Admin</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr
                    key={admin._id}
                    onClick={() => setSelectedAdmin(admin)}
                    className="cursor-pointer border-t transition hover:bg-gray-50"
                  >
                    <td className="flex items-center gap-3 p-4">
                      <Avatar>
                        <AvatarImage src={admin.profileImage || ""} />
                        <AvatarFallback>
                          {admin.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{admin.name}</span>
                    </td>
                    <td>{admin.phone}</td>
                    <td>{admin.email}</td>
                    <td>Admin</td>
                    <td>
                      <StatusBadge status={admin.status ?? "Active"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {openAddModal && <AddAdmin onClose={() => setOpenAddModal(false)} />}

      {selectedAdmin && (
        <AdminDetailModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}
    </div>
  );
};

export default AdminsPage;
