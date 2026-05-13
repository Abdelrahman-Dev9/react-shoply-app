import { useGetUsersQuery } from "@/redux/services/authApi";
import { Ban, Loader2, Pencil, Search } from "lucide-react";
import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type UserStatus = "Active" | "inactive";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
}

// ── Info Box ───────────────────────────────────────────────────────────────
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800">
      {children}
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────
function Avatar({ src, name }: { src?: string; name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#dbeafe] flex items-center justify-center">
      {src ? (
        <img src={src} className="w-full h-full object-cover" />
      ) : (
        <span className="text-xs font-bold text-[#1e3a8a]">{initials}</span>
      )}
    </div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: UserStatus }) {
  const isActive = status === "Active";

  return (
    <div
      className={`text-xs px-3 py-1 rounded-full border w-fit ${
        isActive
          ? "border-green-500 text-green-600 bg-green-50"
          : "border-red-400 text-red-500 bg-red-50"
      }`}
    >
      {status}
    </div>
  );
}

// ── User Modal ─────────────────────────────────────────────────────────────
function UserDetailModal({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>

        <InfoBox>{user.email}</InfoBox>
        <InfoBox>{user.phone}</InfoBox>

        <div className="flex gap-2 mt-4">
          <button className="text-red-500 flex items-center gap-1">
            <Ban size={14} /> Block
          </button>
          <button className="text-blue-600 flex items-center gap-1">
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ✅ RTK QUERY
  const { data, isLoading, error } = useGetUsersQuery({});

  // ── MAP BACKEND → UI ─────────────────────────────────────────────────────
  const users: User[] = useMemo(() => {
    return (
      data?.allUsers?.map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        avatar: u.profileImage,
        status: u.active ? "Active" : "inactive",
      })) || []
    );
  }, [data]);

  // ── FILTER ───────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  if (error) {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-bold text-xl">Users ({users.length})</h1>

          <div className="flex gap-3">
            <div className="flex items-center border px-3 py-2 rounded-lg">
              <Search size={14} />
              <input
                className="ml-2 outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-10">
            <Loader2 className="animate-spin" />
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              {/* HEADER */}
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="p-3">User</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-10 text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="border-b hover:bg-gray-50 cursor-pointer transition"
                    >
                      {/* USER */}
                      <td className="p-3 flex items-center gap-3">
                        <Avatar src={user.avatar} name={user.name} />
                        <span className="font-medium">{user.name}</span>
                      </td>

                      {/* PHONE */}
                      <td className="p-3 text-gray-600">{user.phone}</td>

                      {/* EMAIL */}
                      <td className="p-3 text-gray-600">{user.email}</td>

                      {/* STATUS */}
                      <td className="p-3">
                        <StatusBadge status={user.status} />
                      </td>
                    </tr>
                  ))
                )}
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

export default UsersPage;
