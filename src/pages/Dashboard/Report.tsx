import type { Complaint } from "@/redux/services/complainApi";
import { useGetComplaintsQuery } from "@/redux/services/complainApi";
import type { Report } from "@/redux/services/reportApi";
import { useGetReportQuery } from "@/redux/services/reportApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<"complaint" | "application">(
    "complaint"
  );

  const { data: reportsData, isLoading: reportsLoading } = useGetReportQuery();

  const { data: complaintData, isLoading: complaintLoading } =
    useGetComplaintsQuery();

  const Reports = reportsData?.data?.reports ?? [];
  const Complaints = complaintData?.data ?? [];

  const data: (Report | Complaint)[] =
    activeTab === "complaint" ? Complaints : Reports;

  const total = Reports.length + Complaints.length;

  const isLoading = reportsLoading || complaintLoading;

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 justify-between mx-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Reports list ({total})
        </h1>

        {/* Tabs */}
        <div className="flex gap-15">
          {/* Complaint Tab */}
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
              {Complaints.length}
            </span>
          </button>

          {/* Application Tab */}
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
              {Reports.length}
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="text-left px-6 py-4">
                {activeTab === "complaint"
                  ? "Complaint Date"
                  : "Application Date"}
              </th>

              <th className="text-left px-6 py-4">Customer Name</th>

              <th className="text-left px-6 py-4">
                {activeTab === "complaint"
                  ? "Complaint Details"
                  : "Application Details"}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="relative py-16">
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin " />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.user.profileImage}
                        alt={row.user.name}
                        className="w-9 h-9 rounded-full object-cover border"
                      />

                      <span className="font-medium text-gray-900">
                        {row.user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {"title" in row ? row.title : row.subject}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
