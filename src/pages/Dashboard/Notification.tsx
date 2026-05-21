import {
  useGetNotificationsQuery,
  useSendNotificationMutation,
} from "@/redux/services/notificationApi";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Notification = {
  _id: string;
  subject: string;
  sendTo: string[];
  createdAt: string;
  user?: {
    name?: string;
  };
};

const NotificationPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: notificationsData, isLoading } = useGetNotificationsQuery({});

  const [sendNotification, { isLoading: isSending }] =
    useSendNotificationMutation();

  const [form, setForm] = useState({
    subject: "",
    sendTo: "",
  });

  const notifications: Notification[] = notificationsData?.data || [];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) =>
      notification.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [notifications, search]);

  const createNotification = async () => {
    if (!form.subject.trim()) return;

    try {
      const sendToIds = form.sendTo
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      await sendNotification({
        subject: form.subject,
        sendTo: sendToIds,
      }).unwrap();

      setForm({
        subject: "",
        sendTo: "",
      });

      setShowModal(false);
    } catch (error) {
      console.log("Failed to send notification:", error);
    }
  };

  return (
    <div className="p-6 bg-[#f0f4ff] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Notifications ({filteredNotifications.length})
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
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filteredNotifications.length > 0 ? (
                filteredNotifications.map((n: Notification) => {
                  const isActive = n._id === activeId;

                  return (
                    <tr
                      key={n._id}
                      onClick={() => setActiveId(n._id)}
                      className={`border-t cursor-pointer transition ${
                        isActive ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                    >
                      <td className="py-3 pr-3">{n.subject}</td>

                      <td className="py-3">{n.user?.name || "Admin"}</td>

                      <td className="py-3">
                        {Array.isArray(n.sendTo)
                          ? n.sendTo.join(", ")
                          : n.sendTo}
                      </td>

                      <td className="py-3">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </td>
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Notification</h3>

            <div className="space-y-3">
              <textarea
                placeholder="Subject"
                value={form.subject}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subject: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2 text-sm min-h-[100px]"
              />

              <input
                type="text"
                placeholder="Send to IDs separated by commas"
                value={form.sendTo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    sendTo: e.target.value,
                  })
                }
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
                disabled={isSending}
                className="px-4 py-2 text-sm bg-[#1e3a8a] text-white rounded-lg disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
