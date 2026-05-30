import circle from "@/assets/circle.png";
import orangeClock from "@/assets/orange-clock.png";
import shop from "@/assets/shop.png";
import { useGetOrdersStatsQuery } from "@/redux/services/dashBoardApi";
import { Loader2 } from "lucide-react";

const StatsGrid = () => {
  const { data, isLoading } = useGetOrdersStatsQuery({});

  const stats = [
    {
      icon: shop,
      label: "Total Orders",
      value: data?.data.totalOrders,
    },
    {
      icon: orangeClock,
      label: "Completed Orders",
      value: data?.data.completedOrders,
    },
    {
      icon: circle,
      label: "Active Orders",
      value: data?.data.activeOrders,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[150px]"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="h-[36px] flex items-center">
              {isLoading ? (
                <Loader2 className="w-7 h-7 animate-spin text-[#1e3a8a] " />
              ) : (
                <h2 className="text-3xl font-extrabold text-gray-900 leading-none">
                  {stat.value ?? 0}
                </h2>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
