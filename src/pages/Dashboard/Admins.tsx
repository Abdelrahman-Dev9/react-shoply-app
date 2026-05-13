import { useGetAdminsQuery } from "@/redux/services/authApi";
import { Ban, Loader2, Pencil, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type UserStatus = "Active" | "inactive";

interface Admin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  status?: UserStatus;
}

// ── Info box ───────────────────────────────────────────────────────────────
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

// ── Add Modal (unchanged logic) ────────────────────────────────────────────
function AddAdminModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <div className="flex justify-between">
          <h2 className="font-bold">Add Admin</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User Modal ─────────────────────────────────────────────────────────────
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

        <InfoBox>{user.email}</InfoBox>
        <InfoBox>{user.phone}</InfoBox>

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

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const AdminsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Admin | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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
            onClick={() => setShowAdd(true)}
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
                    <Avatar src={admin.profileImage} name={admin.name} />
                    {admin.name}
                  </td>

                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>Admin</td>
                  <td>
                    <StatusBadge status={admin.status || "Active"} />
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

      {showAdd && <AddAdminModal onClose={() => setShowAdd(false)} />}
    </div>
  );
};

export default AdminsPage;
