import { Plus, Search } from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    subject:
      "Please note that the Wanette car will no longer be available after October 30, 2024.",
    sendBy: "Ahmed Mohamed",
    sendTo: "(+20) 123 45678910",
    sendAt: "10/30/2024",
  },
  {
    id: 2,
    subject: "System maintenance scheduled for next Friday. Expect downtime.",
    sendBy: "Admin",
    sendTo: "(+20) 987 65432100",
    sendAt: "10/25/2024",
  },
  {
    id: 3,
    subject: "New features have been added to your dashboard.",
    sendBy: "Support Team",
    sendTo: "(+20) 111 22233344",
    sendAt: "10/20/2024",
  },
];

export default function NotificationPage() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // ── Filtered Data ─────────────────────────────────────────
  const filteredNotifications = notifications.filter((n) =>
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Notifications
          </h2>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white flex-1">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700"
            />
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-800 transition text-white px-4 py-2 rounded-xl text-sm">
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-700 text-sm">
                <th className="text-left pb-3 pl-2 font-semibold">Subject</th>
                <th className="text-left pb-3 font-semibold">Send by</th>
                <th className="text-left pb-3 font-semibold">Send to</th>
                <th className="text-left pb-3 font-semibold">Send at</th>
              </tr>
            </thead>

            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => {
                  const isActive = n.id === activeId;

                  return (
                    <tr
                      key={n.id}
                      onClick={() => setActiveId(n.id)}
                      className={`border-t cursor-pointer transition
                        ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}`}
                    >
                      <td className="py-3 pr-3">{n.subject}</td>
                      <td className="py-3">{n.sendBy}</td>
                      <td className="py-3">{n.sendTo}</td>
                      <td className="py-3">{n.sendAt}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
