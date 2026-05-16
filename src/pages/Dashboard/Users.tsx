import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AddUser from "@/components/users/AddUser";
import UserDetailModal from "@/components/users/UserDetailModal";
import { useGetUsersQuery } from "@/redux/services/authApi";
import { Loader2, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type UserStatus = "Active" | "inactive";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status: UserStatus;
}

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ADD USER MODAL
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading, error } = useGetUsersQuery({});

  // MAP BACKEND DATA
  const users: User[] = useMemo(() => {
    return (
      data?.allUsers?.map((user: any) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        status: user.active ? "Active" : "inactive",
      })) || []
    );
  }, [data]);

  // FILTER USERS
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );
  }, [users, search]);

  if (error) {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold">Users ({filteredUsers.length})</h1>

          {/* SEARCH */}
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* ADD USER BUTTON */}
          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-800"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-20">
            <Loader2 className="animate-spin" />
            <span>Loading users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* TABLE HEAD */}
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="cursor-pointer border-b transition hover:bg-gray-50"
                  >
                    {/* USER */}
                    <td className="flex items-center gap-3 p-4">
                      <Avatar>
                        <AvatarImage src={user.profileImage} />

                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">{user.name}</span>
                    </td>

                    {/* PHONE */}
                    <td className="p-4 text-gray-600">{user.phone}</td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-600">{user.email}</td>

                    {/* ROLE */}
                    <td className="p-4">User</td>

                    {/* STATUS */}
                    <td className="p-4">
                      <Badge
                        className={`hover:bg-transparent ${
                          user.status === "Active"
                            ? "border-green-200 bg-green-100 text-green-700"
                            : "border-red-200 bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* ADD USER MODAL */}
      {openAddModal && <AddUser onClose={() => setOpenAddModal(false)} />}
    </div>
  );
};

export default UsersPage;
