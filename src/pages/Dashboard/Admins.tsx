import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetAdminsQuery } from "@/redux/services/authApi";
import { Ban, Loader2, Pencil, Plus } from "lucide-react";
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
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>

        <Input value={user.email} readOnly />
        <Input value={user.phone} readOnly />

        <div className="flex gap-2 mt-4">
          <button className="text-red-500 flex gap-1 items-center">
            <Ban size={14} /> Block
          </button>
          <button className="text-blue-600 flex gap-1 items-center">
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);

  // ✅ RTK QUERY
  const { data, isLoading, error } = useGetAdminsQuery({});

  // ✅ SAFE DATA
  const admins: Admin[] = useMemo(() => {
    return (
      data?.allAdmins?.map((admin: Admin) => ({
        ...admin,
        status: "Active",
      })) || []
    );
  }, [data]);

  // ✅ FILTER
  const filtered = useMemo(() => {
    return admins.filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.phone.includes(search) ||
        a.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [admins, search]);

  if (error) {
    return <div className="p-6 text-red-500">Failed to load admins</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="font-bold text-xl">Admins ({admins.length})</h1>

          <input
            className="border px-3 py-2 rounded-lg"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            // onClick={() => setShowAdd(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* TABLE */}
        {isLoading ? (
          <div className="flex gap-2 items-center p-10 justify-center">
            <Loader2 className="animate-spin" />
            Loading...
          </div>
        ) : (
          <table className="w-full">
            <tbody>
              {filtered.map((admin) => (
                <tr
                  key={admin._id}
                  onClick={() => setSelectedUser(admin)}
                  className="border-t cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3 flex items-center gap-3">
                    {/* <Avatar src={admin.profileImage} name={admin.name} /> */}
                    <Avatar>
                      <AvatarImage src={admin.profileImage} />
                      <AvatarFallback>{admin.name}</AvatarFallback>
                    </Avatar>
                    {admin.name}
                  </td>

                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>Admin</td>
                  <td>
                    {/* <StatusBadge status={admin.status || "Active"} /> */}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODALS */}
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
