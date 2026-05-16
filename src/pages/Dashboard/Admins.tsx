import type { Admin } from "@/components/admins/adminsDetails";
import UserDetailModal from "@/components/admins/adminsDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  useAddAdminMutation,
  useGetAdminsQuery,
} from "@/redux/services/authApi";
import { Loader2, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [serverError, setServerError] = useState("");

  // ✅ FIX: form state (was missing in usage)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // API
  const [addAdmin, { isLoading: addingAdmin }] = useAddAdminMutation();
  const { data, isLoading, error } = useGetAdminsQuery(undefined);

  // ADMINS
  const admins: Admin[] = useMemo(() => {
    return (
      data?.allAdmins?.map((admin: Admin) => ({
        ...admin,
        status: admin.status || "Active",
      })) || []
    );
  }, [data]);

  // FILTER ADMINS
  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const searchValue = search.toLowerCase();

      return (
        admin?.name?.toLowerCase().includes(searchValue) ||
        admin?.email?.toLowerCase().includes(searchValue) ||
        admin?.phone?.includes(search)
      );
    });
  }, [admins, search]);

  // ADD ADMIN
  const handleAddAdmin = async (formData: any) => {
    try {
      setServerError("");

      await addAdmin({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
      }).unwrap();

      setOpenAddModal(false);

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (err: any) {
      console.log(err);

      setServerError(
        err?.data?.message ||
          err?.data?.errors?.[0]?.msg ||
          "Failed to add admin"
      );
    }
  };

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

          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-800"
          >
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
                    <td className="flex items-center gap-3 p-4">
                      <Avatar>
                        <AvatarImage src={admin.profileImage || ""} />
                        <AvatarFallback>
                          {admin?.name
                            ?.split(" ")
                            ?.map((n) => n[0])
                            ?.join("")
                            ?.slice(0, 2)
                            ?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">{admin.name}</span>
                    </td>

                    <td>{admin.phone}</td>
                    <td>{admin.email}</td>
                    <td>Admin</td>

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

      {/* ADD ADMIN MODAL */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add Admin</h2>

              <button
                onClick={() => {
                  setOpenAddModal(false);
                  setServerError("");
                }}
              >
                <X />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-4">
              {/* NAME */}
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />

              {/* EMAIL */}
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />

              {/* PASSWORD */}
              <Input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />

              {/* PHONE */}
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />

              {/* ERROR */}
              {serverError && (
                <p className="text-sm text-red-500">{serverError}</p>
              )}

              {/* BUTTON */}
              <button
                onClick={() => handleAddAdmin(formData)}
                disabled={
                  addingAdmin ||
                  !formData.name ||
                  !formData.email ||
                  !formData.password ||
                  !formData.phone
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 py-3 text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {addingAdmin ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Adding...
                  </>
                ) : (
                  "Add Admin"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER DETAILS */}
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
