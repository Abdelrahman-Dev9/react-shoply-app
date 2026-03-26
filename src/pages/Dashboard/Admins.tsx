import { useState } from "react";
import { Ban, Pencil, Plus, RotateCcw, Search, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type UserStatus = "Active" | "inactive";

interface User {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  completedOrders: number;
  status: UserStatus;
  fullName: string;
  birthday: string;
  gender: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const INITIAL_ADMINS: User[] = [
  {
    id: 1,
    name: "Darlene Robertson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "(+966) 123 45678910",
    email: "jane.smith@example.com",
    completedOrders: 3,
    status: "Active",
    fullName: "Darlene Ann Robertson",
    birthday: "10/30/2024",
    gender: "Female",
  },
  {
    id: 2,
    name: "Theresa Cooper",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    phone: "(+966) 123 45678910",
    email: "emma.jones@example.com",
    completedOrders: 5,
    status: "inactive",
    fullName: "Theresa Marie Cooper",
    birthday: "05/14/1990",
    gender: "Female",
  },
  {
    id: 3,
    name: "Geraldine Phillips",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    phone: "(+966) 123 45678910",
    email: "oliver.wilson@example.com",
    completedOrders: 1,
    status: "inactive",
    fullName: "Geraldine Sue Phillips",
    birthday: "03/22/1985",
    gender: "Female",
  },
  {
    id: 4,
    name: "Samantha Howard",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    phone: "(+966) 123 45678910",
    email: "liam.brown@example.com",
    completedOrders: 2,
    status: "Active",
    fullName: "Samantha Rose Howard",
    birthday: "07/09/1993",
    gender: "Female",
  },
  {
    id: 5,
    name: "Marcus Bennett",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "(+966) 123 45678910",
    email: "marcus.b@example.com",
    completedOrders: 7,
    status: "Active",
    fullName: "Marcus James Bennett",
    birthday: "11/30/1988",
    gender: "Male",
  },
];

// ── Info box ───────────────────────────────────────────────────────────────
function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800">
      {children}
    </div>
  );
}

// ── Add new admin modal ────────────────────────────────────────────────────
function AddAdminModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (user: User) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const setField = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleReset = () =>
    setForm({ name: "", phone: "", email: "", password: "" });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 90
      )}.jpg`,
      phone: form.phone || "(+966) 000 00000000",
      email: form.email,
      completedOrders: 0,
      status: "Active",
      fullName: form.name,
      birthday: "—",
      gender: "—",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X size={14} className="text-white" />
        </button>

        {/* Title */}
        <h2 className="text-center text-[#1e3a8a] font-bold text-xl mb-6 underline underline-offset-4">
          Add new admin
        </h2>

        {/* Fields */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Admin name */}
          <div className="border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span className="font-semibold shrink-0">Admin name:</span>
              <input
                value={form.name}
                onChange={setField("name")}
                placeholder="Mostafa Mohamed"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Admin phone */}
          <div className="border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span className="font-semibold shrink-0">Admin phone:</span>
              <input
                value={form.phone}
                onChange={setField("phone")}
                placeholder="Ex: +20 12345678"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span className="font-semibold shrink-0">Email:</span>
              <input
                value={form.email}
                onChange={setField("email")}
                placeholder="Ex: Admin@mail.com"
                type="email"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="border border-gray-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span className="font-semibold shrink-0">Password:</span>
              <input
                value={form.password}
                onChange={setField("password")}
                placeholder="············"
                type="password"
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 border border-[#1e3a8a] text-[#1e3a8a] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#eff3ff] transition-colors"
          >
            <RotateCcw size={14} />
            Reset all
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[#1e3a8a] text-white text-sm font-bold px-10 py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User detail modal ──────────────────────────────────────────────────────
function UserDetailModal({
  user,
  onClose,
  onBlock,
}: {
  user: User;
  onClose: () => void;
  onBlock: (id: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X size={14} className="text-white" />
        </button>

        {/* Title */}
        <h2 className="text-center text-[#1e3a8a] font-bold text-xl mb-6">
          {user.name}
        </h2>

        {/* Photo + right fields */}
        <div className="flex gap-4 mb-4">
          <div className="w-44 shrink-0 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center min-h-[160px]">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/160x160?text=User";
              }}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <InfoBox>
              <span className="font-semibold">User phone:</span> {user.phone}
            </InfoBox>
            <InfoBox>
              <span className="font-semibold">Birthday date:</span>{" "}
              {user.birthday}
            </InfoBox>
            <InfoBox>
              <span className="font-semibold">Gender:</span> {user.gender}
            </InfoBox>
          </div>
        </div>

        <InfoBox>
          <span className="font-semibold">Full Name:</span>{" "}
          <span className="text-[#1e3a8a] font-medium">{user.fullName}</span>
        </InfoBox>

        <div className="mt-3">
          <InfoBox>
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-[#1e3a8a] font-medium">{user.email}</span>
          </InfoBox>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => {
              onBlock(user.id);
              onClose();
            }}
            className="flex items-center gap-2 border border-[#1e3a8a] text-[#1e3a8a] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#eff3ff] transition-colors"
          >
            <Ban size={15} />
            Block user
          </button>
          <button className="flex items-center gap-2 bg-[#1e3a8a] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors">
            <Pencil size={15} />
            Edit user
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({
  status,
  onClick,
}: {
  status: UserStatus;
  onClick: (e: React.MouseEvent) => void;
}) {
  const isActive = status === "Active";
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-colors ${
        isActive
          ? "border-green-500 text-green-600 hover:bg-green-50"
          : "border-red-400 text-red-500 hover:bg-red-50"
      }`}
    >
      {status}
    </button>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────
function Avatar({ src, name }: { src: string; name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-green-200 flex items-center justify-center">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-xs font-semibold text-green-700">${initials}</span>`;
          }
        }}
      />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AdminsPage() {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState<User[]>(INITIAL_ADMINS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = admins.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  const toggleStatus = (id: number) => {
    setAdmins((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "inactive" : "Active" }
          : u
      )
    );
  };

  const blockUser = (id: number) => {
    setAdmins((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "inactive" } : u))
    );
  };

  const addAdmin = (user: User) => {
    setAdmins((prev) => [...prev, user]);
  };

  return (
    <div
      className="flex flex-col p-4 md:p-6 bg-[#f0f4ff] min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <h1 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Admins ( {admins.length} )
          </h1>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white flex-1">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1e3a8a] text-white text-sm font-semibold rounded-lg hover:bg-[#1e40af] transition-colors whitespace-nowrap"
          >
            <Plus size={15} />
            Add new admin
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-gray-700 text-[13px]">
                <th className="text-left pb-3 font-semibold">Customer name</th>
                <th className="text-left pb-3 font-semibold">Phone number</th>
                <th className="text-left pb-3 font-semibold">E-mail</th>
                <th className="text-left pb-3 font-semibold">
                  Completed orders
                </th>
                <th className="text-left pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-10">
                    No admins found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <>
                    <tr key={`div-${user.id}`}>
                      <td colSpan={5} className="p-0">
                        <hr className="border-gray-100" />
                      </td>
                    </tr>
                    <tr
                      key={`row-${user.id}`}
                      onClick={() => setSelectedUser(user)}
                      className="hover:bg-[#f5f7ff] transition-colors cursor-pointer"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatar} name={user.name} />
                          <span className="text-gray-800 font-medium">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{user.phone}</td>
                      <td className="py-4 text-gray-600">{user.email}</td>
                      <td className="py-4 text-gray-600">
                        {user.completedOrders === 1
                          ? "1 order"
                          : `${user.completedOrders} orders`}
                      </td>
                      <td className="py-4">
                        <StatusBadge
                          status={user.status}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(user.id);
                          }}
                        />
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User detail modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onBlock={blockUser}
        />
      )}

      {/* Add new admin modal */}
      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onAdd={addAdmin}
        />
      )}
    </div>
  );
}
