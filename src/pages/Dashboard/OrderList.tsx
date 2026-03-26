import { Calendar, ChevronDown, Filter, Search } from "lucide-react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type Status = "Active" | "Pending" | "Completed";

interface Order {
  id: string;
  date: string;
  status: Status;
  product: {
    image: string;
    name: string;
    price: number;
    quantity: number;
    priceAfterDiscount: number;
  };
  customer: {
    image: string;
    name: string;
    gender: string;
    birthday: string;
    mobile: string;
    email: string;
  };
  address: string;
  arrivalDate: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const ORDERS: Order[] = [
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "Active",
    product: {
      image:
        "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
      name: "Wanette",
      price: 1300,
      quantity: 3,
      priceAfterDiscount: 1200,
    },
    customer: {
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      name: "Ahmed Ali",
      gender: "Male",
      birthday: "11/30/2024",
      mobile: "+20 1024671212",
      email: "eid46060@gmail.com",
    },
    address: "25 El-Tahrir Street, Downtown, Qasr El Nil, Cairo, 11511, Egypt",
    arrivalDate: "10/30/2024",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "Active",
    product: {
      image:
        "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
      name: "Wanette",
      price: 1300,
      quantity: 2,
      priceAfterDiscount: 1150,
    },
    customer: {
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      name: "Ahmed Ali",
      gender: "Male",
      birthday: "11/30/2024",
      mobile: "+20 1024671212",
      email: "eid46060@gmail.com",
    },
    address: "25 El-Tahrir Street, Downtown, Qasr El Nil, Cairo, 11511, Egypt",
    arrivalDate: "10/30/2024",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "Pending",
    product: {
      image:
        "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
      name: "Wanette",
      price: 1300,
      quantity: 1,
      priceAfterDiscount: 1100,
    },
    customer: {
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      name: "Ahmed Ali",
      gender: "Male",
      birthday: "11/30/2024",
      mobile: "+20 1024671212",
      email: "eid46060@gmail.com",
    },
    address: "25 El-Tahrir Street, Downtown, Qasr El Nil, Cairo, 11511, Egypt",
    arrivalDate: "10/30/2024",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "Completed",
    product: {
      image:
        "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
      name: "Wanette",
      price: 1300,
      quantity: 4,
      priceAfterDiscount: 1250,
    },
    customer: {
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      name: "Ahmed Ali",
      gender: "Male",
      birthday: "11/30/2024",
      mobile: "+20 1024671212",
      email: "eid46060@gmail.com",
    },
    address: "25 El-Tahrir Street, Downtown, Qasr El Nil, Cairo, 11511, Egypt",
    arrivalDate: "10/30/2024",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "Pending",
    product: {
      image:
        "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
      name: "Wanette",
      price: 1300,
      quantity: 2,
      priceAfterDiscount: 1200,
    },
    customer: {
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      name: "Ahmed Ali",
      gender: "Male",
      birthday: "11/30/2024",
      mobile: "+20 1024671212",
      email: "eid46060@gmail.com",
    },
    address: "25 El-Tahrir Street, Downtown, Qasr El Nil, Cairo, 11511, Egypt",
    arrivalDate: "10/30/2024",
  },
];

// ── Status badge ───────────────────────────────────────────────────────────
const statusStyles: Record<Status, string> = {
  Active: "border border-[#1e3a8a] text-[#1e3a8a] p-2",
  Pending: "border border-amber-400 text-amber-500 p-2",
  Completed: "border border-green-500 text-green-600 p-2",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`text-xs font-semibold  rounded-full bg-transparent ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ── Info box ───────────────────────────────────────────────────────────────
function InfoBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-gray-200 rounded-xl py-3 text-sm text-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}

// ── Order detail panel ─────────────────────────────────────────────────────
function OrderDetail({ order }: { order: Order }) {
  const [status, setStatus] = useState<Status>(order.status);

  return (
    <div className="flex-1 bg-white rounded-2xl p-6 overflow-y-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#1e3a8a] font-semibold text-base">
          Order ID: {order.id}
        </h2>
        <StatusBadge status={status} />
      </div>

      {/* Product section */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        {/* Product image */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 flex items-center justify-center w-full sm:w-48 shrink-0 min-h-[140px]">
          <img
            src={order.product.image}
            alt={order.product.name}
            className="w-full max-w-[160px] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/160x100?text=Product";
            }}
          />
        </div>

        {/* Product details */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoBox className="col-span-full">
            <span className="font-semibold">Name:</span> {order.product.name}
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Price:</span> {order.product.price}{" "}
            $
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Quantity:</span>{" "}
            {order.product.quantity}
          </InfoBox>
          <InfoBox className="col-span-full">
            <span className="font-semibold">Price after discount:</span>{" "}
            {order.product.priceAfterDiscount} $
          </InfoBox>
        </div>
      </div>

      {/* Customer section */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        {/* Customer photo */}
        <div className="w-full sm:w-48 shrink-0 rounded-xl overflow-hidden min-h-[160px] bg-gray-100">
          <img
            src={order.customer.image}
            alt={order.customer.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/200x200?text=Customer";
            }}
          />
        </div>

        {/* Customer details */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoBox className="col-span-full">
            <span className="font-semibold">Customer Name :</span>{" "}
            {order.customer.name}
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Gender:</span>{" "}
            {order.customer.gender}
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Birthday:</span>{" "}
            {order.customer.birthday}
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Mobile:</span>{" "}
            {order.customer.mobile}
          </InfoBox>
          <InfoBox>
            <span className="font-semibold">Email:</span> {order.customer.email}
          </InfoBox>
        </div>
      </div>

      {/* Address */}
      <InfoBox>
        <span className="font-semibold">Address:</span> {order.address}
      </InfoBox>

      {/* Arrival + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm text-gray-800">
          <span>
            <span className="font-semibold">Arrival Date :</span>{" "}
            {order.arrivalDate}
          </span>
          <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
            <Calendar size={15} className="text-white" />
          </div>
        </div>

        {/* Status dropdown */}
        <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm text-gray-800">
          <span>
            <span className="font-semibold">Status:</span> {status}
          </span>
          <div className="relative group">
            <button className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
              <ChevronDown size={15} className="text-white" />
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 bottom-10 w-36 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hidden group-focus-within:block z-10">
              {(["Active", "Pending", "Completed"] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#eff3ff] hover:text-[#1e3a8a] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
const OrderList = () => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = ORDERS.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex gap-4 h-screen bg-[#f0f4ff] p-4 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left panel: order list ── */}
      <div className="w-72 shrink-0 bg-white rounded-2xl p-4 flex flex-col gap-4 overflow-hidden">
        <h1 className="text-[#1e3a8a] font-bold text-xl">Order list</h1>

        {/* Search + filter */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
          <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
            <Filter size={16} />
          </button>
        </div>

        {/* Order items */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map((order, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                selectedIndex === i ? "bg-[#eff3ff]" : "hover:bg-gray-50"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-semibold ${
                    selectedIndex === i ? "text-[#1e3a8a]" : "text-gray-800"
                  }`}
                >
                  ID {order.id}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
              </div>
              <StatusBadge status={order.status} />
            </button>
          ))}

          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-8">
              No orders found
            </p>
          )}
        </div>
      </div>

      {/* ── Right panel: order detail ── */}
      {filtered[selectedIndex] ? (
        <OrderDetail key={selectedIndex} order={filtered[selectedIndex]} />
      ) : (
        <div className="flex-1 bg-white rounded-2xl flex items-center justify-center text-gray-400 text-sm">
          Select an order to view details
        </div>
      )}
    </div>
  );
};
export default OrderList;
