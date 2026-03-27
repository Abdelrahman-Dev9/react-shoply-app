import { Plus, Search } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    subject:
      "Please note that the Wanette car will no longer be available after October 30, 2024.",
    sendBy: "Ahmed Mohamed",
    sendTo: "(+20) 123 45678910",
    sendAt: "2024-10-30",
  },
  {
    id: 2,
    subject: "System maintenance scheduled for next Friday. Expect downtime.",
    sendBy: "Admin",
    sendTo: "(+20) 987 65432100",
    sendAt: "2024-10-25",
  },
  {
    id: 3,
    subject: "New features have been added to your dashboard.",
    sendBy: "Support Team",
    sendTo: "(+20) 111 22233344",
    sendAt: "2024-10-20",
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    sendBy: "",
    sendTo: "",
    sendAt: "",
  });

  const createNotification = () => {
    if (!form.subject.trim()) return;

    const newNotification = {
      id: Date.now(),
      subject: form.subject,
      sendBy: form.sendBy || "Admin",
      sendTo: form.sendTo || "All",
      sendAt: form.sendAt || new Date().toISOString().split("T")[0],
    };

    setNotifications((prev) => [newNotification, ...prev]);

    setForm({
      subject: "",
      sendBy: "",
      sendTo: "",
      sendAt: "",
    });

    setShowModal(false);
  };

  const filteredNotifications = notifications.filter((n) =>
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Notifications ({notifications.length})
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
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-800 transition text-white px-4 py-2 rounded-xl text-sm"
          >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Notification</h3>

            <div className="space-y-3">
              <textarea
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm"
              />

              <input
                placeholder="Send by"
                value={form.sendBy}
                onChange={(e) => setForm({ ...form, sendBy: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm"
              />

              <input
                placeholder="Send to"
                value={form.sendTo}
                onChange={(e) => setForm({ ...form, sendTo: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm"
              />

              <input
                type="date"
                value={form.sendAt}
                onChange={(e) => setForm({ ...form, sendAt: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createNotification}
                className="px-4 py-2 text-sm bg-[#1e3a8a] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
