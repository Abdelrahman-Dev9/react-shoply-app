import { useState } from "react";

const complaintReports = [
  {
    id: 1,
    date: "10/16/2024",
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/40?img=47",
    details: "Delay in course registration",
  },
  {
    id: 2,
    date: "10/23/2024",
    name: "Theresa Cooper",
    avatar: "https://i.pravatar.cc/40?img=5",
    details: "for the additional features",
  },
  {
    id: 3,
    date: "10/28/2024",
    name: "James Wilson",
    avatar: "https://i.pravatar.cc/40?img=12",
    details: "Unable to access course materials",
  },
];

const applicationReports = [
  {
    id: 1,
    date: "10/17/2024",
    name: "Emily Johnson",
    avatar: "https://i.pravatar.cc/40?img=44",
    details: "Application for advanced course enrollment",
  },
  {
    id: 2,
    date: "10/22/2024",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/40?img=11",
    details: "Scholarship application submitted",
  },
  {
    id: 3,
    date: "10/29/2024",
    name: "Nour Khalil",
    avatar: "https://i.pravatar.cc/40?img=20",
    details: "Request for course extension",
  },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<"complaint" | "application">(
    "complaint"
  );

  const data =
    activeTab === "complaint" ? complaintReports : applicationReports;

  const total = complaintReports.length + applicationReports.length;

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 justify-between mx-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports list ({total})
        </h1>

        {/* Tabs */}
        <div className="flex gap-15">
          <button
            onClick={() => setActiveTab("complaint")}
            className={`flex items-center w-[200px] justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === "complaint"
                  ? "bg-indigo-600 text-white shadow"
                  : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
          >
            Complaint
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
              ${
                activeTab === "complaint"
                  ? "bg-white/20 text-white"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {complaintReports.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("application")}
            className={`flex items-center w-[200px] justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === "application"
                  ? "bg-indigo-600 text-white shadow"
                  : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              }`}
          >
            Application
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
              ${
                activeTab === "application"
                  ? "bg-white/20 text-white"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {applicationReports.length}
            </span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="text-left px-6 py-4">
                {activeTab === "complaint"
                  ? "Complaint Date"
                  : "Application Date"}
              </th>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">
                {activeTab === "complaint"
                  ? "Complaint Details"
                  : "Application Details"}
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {row.date}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <span className="font-medium text-gray-900">
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
