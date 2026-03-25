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
      up: true,
    },
    {
      icon: circle,
      label: "Active",
      value: 5,
    },
    {
      icon: greenRight,
      label: "Revenue",
      value: "$8,500",
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4 p-8 rounded-3xl font-sans">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative bg-white rounded-2xl p-5 border border-gray-200 cursor-pointer flex-1 min-w-[200px]"
        >
          {/* Glow Circle */}
          <div className="absolute -top-7 -right-7 w-24 h-24 rounded-full filter blur-2xl opacity-60 transition-opacity hover:opacity-100"></div>

          {/* Icon */}
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 ease-in-out hover:rotate-[-8deg] hover:scale-115 `}
          >
            {typeof stat.icon === "string" ? (
              <img src={stat.icon} alt={stat.label} className="w-5 h-5" />
            ) : (
              stat.icon
            )}
          </div>

          {/* Value and Trend */}
          <div className="flex items-baseline flex-wrap justify-between mt-1">
            <span className="font-syne font-extrabold text-2xl text-gray-900 -tracking-[1px]">
              {stat.value}
            </span>
            <span
              className={`ml-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                stat.up
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {stat.trend}
            </span>
          </div>

          {/* Label */}
          <div className="text-[17px] text-[#374151] mt-1 tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
