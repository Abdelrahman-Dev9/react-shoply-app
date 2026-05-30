import { CalendarDays, ChevronDown } from "lucide-react";

export type CartItem = {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: string;
  };
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  status: "Active" | "Completed" | "Pending";
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  cartItems: CartItem[];
  customer: {
    image: string;
    name: string;
    gender: string;
    birthday: string;
    mobile: string;
    email: string;
  };
  address: string;
  shippingPhone: string;
  shippingCity: string;
  shippingPostalCode: string;
};

// ─── Reusable sub-components ────────────────────────────────────────────────

const InfoBox = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}) => (
  <div
    className={`border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-1 text-sm ${className}`}
  >
    <span className="font-semibold text-gray-800 shrink-0">{label}:</span>
    <span className="text-gray-700 truncate">{value}</span>
  </div>
);

const BoolBox = ({ label, value }: { label: string; value: boolean }) => (
  <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
    <span>
      <span className="font-semibold text-gray-800">{label}: </span>
      <span className="text-[#1e3a8a] font-semibold">
        {value ? "True" : "False"}
      </span>
    </span>
    <button className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center shrink-0">
      <ChevronDown size={16} className="text-white" />
    </button>
  </div>
);

const DateBox = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
    <span>
      <span className="font-semibold text-gray-800">{label}: </span>
      <span className="text-gray-700">
        {value
          ? new Date(value).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
          : " "}
      </span>
    </span>
    <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center shrink-0">
      <CalendarDays size={15} className="text-white" />
    </div>
  </div>
);

const getStatusStyle = (status: string) => {
  if (status === "Completed") return "border border-green-500 text-green-600";
  if (status === "Active") return "border border-[#1e3a8a] text-[#1e3a8a]";
  return "border border-gray-400 text-gray-600";
};

// ─── Main component ──────────────────────────────────────────────────────────

const OrderDetail = ({ order }: { order: Order }) => {
  return (
    <div className="flex-1 bg-white rounded-2xl overflow-y-auto shadow-sm">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#1e3a8a] font-semibold text-base">
            Order ID: #{order.id}
          </h2>
          <span
            className={`text-sm px-5 py-1.5 rounded-full bg-white font-medium ${getStatusStyle(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        {/* Tax Price / Shipping Price */}
        <div className="grid grid-cols-2 gap-3">
          <InfoBox label="Tax Price" value={`${order.taxPrice} $`} />
          <InfoBox label="Shipping Price" value={`${order.shippingPrice} $`} />
        </div>

        {/* Total Order Price / Payment Method */}
        <div className="grid grid-cols-2 gap-3">
          <InfoBox
            label="Total Order Price"
            value={`${order.totalOrderPrice} $`}
          />
          <InfoBox
            label="Payment Method Type"
            value={
              <span className="capitalize">{order.paymentMethodType}</span>
            }
          />
        </div>

        {/* Paid + Paid At */}
        <div className="grid grid-cols-2 gap-3">
          <BoolBox label="Paid" value={order.isPaid} />
          <DateBox label="Paid At" value={order.paidAt} />
        </div>

        {/* Delivered + Delivered At */}
        <div className="grid grid-cols-2 gap-3">
          <BoolBox label="Delivered" value={order.isDelivered} />
          <DateBox label="Delivered At" value={order.deliveredAt} />
        </div>

        {/* Address */}
        <InfoBox label="Address" value={order.address} />

        {/* Shipping details */}
        <div className="grid grid-cols-3 gap-3">
          <InfoBox label="Phone" value={order.shippingPhone} />
          <InfoBox label="City" value={order.shippingCity} />
          <InfoBox label="Postal Code" value={order.shippingPostalCode} />
        </div>

        {/* Customer Data */}
        <div className="border border-gray-200 rounded-2xl p-4">
          <h3 className="text-[#1e3a8a] font-semibold text-sm mb-3">
            Customer Data
          </h3>
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="w-36 h-36 shrink-0 border border-gray-200 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {order.customer.image ? (
                <img
                  src={order.customer.image}
                  alt={order.customer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-300">
                  {order.customer.name?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-2">
              <InfoBox label="Customer Name" value={order.customer.name} />
              <div className="grid grid-cols-2 gap-2">
                <InfoBox
                  label="Gender"
                  value={
                    <span className="capitalize">{order.customer.gender}</span>
                  }
                />
                <InfoBox
                  label="Birthday"
                  value={
                    order.customer.birthday
                      ? new Date(order.customer.birthday).toLocaleDateString(
                          "en-US",
                          {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )
                      : " "
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InfoBox label="Mobile" value={order.customer.mobile || " "} />
                <InfoBox label="Email" value={order.customer.email || " "} />
              </div>
            </div>
          </div>
        </div>

        {/* Products   one card per cart item */}
        {order.cartItems.map((item, idx) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-2xl p-4"
          >
            <h3 className="text-[#1e3a8a] font-semibold text-sm mb-3">
              Product {idx + 1}
            </h3>
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-36 h-36 shrink-0 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                {item.product?.imageCover ? (
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-2">
                <InfoBox
                  label="Name"
                  value={item.product?.title || "Unknown"}
                />
                <InfoBox
                  label="Category name"
                  value={
                    <span className="capitalize">
                      {item.product?.category || " "}
                    </span>
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <InfoBox label="Price" value={`${item.price} $`} />
                  <InfoBox label="Quantity" value={item.quantity} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
