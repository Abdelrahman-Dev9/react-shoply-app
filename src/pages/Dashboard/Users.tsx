import { Ban, Pencil, Search, X } from "lucide-react";
import { useState } from "react";

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
const USERS: User[] = [
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
  {
    id: 6,
    name: "Olivia Turner",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    phone: "(+966) 123 45678910",
    email: "olivia.t@example.com",
    completedOrders: 0,
    status: "inactive",
    fullName: "Olivia Grace Turner",
    birthday: "02/17/1997",
    gender: "Female",
  },
  {
    id: 7,
    name: "James Carter",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    phone: "(+966) 123 45678910",
    email: "james.c@example.com",
    completedOrders: 12,
    status: "Active",
    fullName: "James Robert Carter",
    birthday: "08/04/1982",
    gender: "Male",
  },
  {
    id: 8,
    name: "Natalie Brooks",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    phone: "(+966) 123 45678910",
    email: "natalie.b@example.com",
    completedOrders: 4,
    status: "Active",
    fullName: "Natalie Claire Brooks",
    birthday: "12/25/1995",
    gender: "Female",
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
          {/* Photo */}
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

          {/* Right fields */}
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

        {/* Full name */}
        <InfoBox>
          <span className="font-semibold">Full Name:</span>{" "}
          <span className="text-[#1e3a8a] font-medium">{user.fullName}</span>
        </InfoBox>

        {/* Email */}
        <div className="mt-3">
          <InfoBox>
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-[#1e3a8a] font-medium">{user.email}</span>
          </InfoBox>
        </div>

        {/* Footer buttons */}
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
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  const toggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "inactive" : "Active" }
          : u
      )
    );
  };

  const blockUser = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "inactive" } : u))
    );
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
            Users ( {users.length} )
          </h1>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white flex-1 max-w-2xl">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
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
                    No users found
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
                      {/* Name + avatar */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatar} name={user.name} />
                          <span className="text-gray-800 font-medium">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 text-gray-600">{user.phone}</td>

                      {/* Email */}
                      <td className="py-4 text-gray-600">{user.email}</td>

                      {/* Completed orders */}
                      <td className="py-4 text-gray-600">
                        {user.completedOrders === 1
                          ? "1 order"
                          : `${user.completedOrders} orders`}
                      </td>

                      {/* Status — stopPropagation so badge click doesn't open modal */}
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
    </div>
  );
}
