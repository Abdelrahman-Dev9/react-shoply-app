import circle from "../assets/circle.png";
import greenRight from "../assets/green-right.png";
import orangeClock from "../assets/orange-clock.png";
import shop from "../assets/shop.png";

const StatsGrid = () => {
  const stats = [
    {
      icon: shop,
      label: "Total Shipments",
      value: 120,
      trend: "+10 Items",
      up: true,
    },
    {
      icon: orangeClock,
      label: "Pending",
      value: 10,
      trend: "-1 items",
      up: false,
    },
    { icon: circle, label: "Active", value: 5 },
    { icon: greenRight, label: "Revenue", value: "$8,500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-3xl font-sans">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative bg-white rounded-2xl p-4 border border-gray-200 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <img src={stat.icon} alt={stat.label} className="w-5 h-5" />
          </div>

          <div className="flex items-baseline flex-wrap justify-between gap-1 mt-1">
            <span className="font-extrabold text-xl sm:text-2xl text-gray-900 -tracking-[1px]">
              {stat.value}
            </span>
            {stat.trend && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.up
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stat.trend}
              </span>
            )}
          </div>

          <div className="text-sm sm:text-[15px] text-[#374151] mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
