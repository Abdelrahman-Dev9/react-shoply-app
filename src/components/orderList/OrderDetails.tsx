import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

// ── Types ───────────────────────────────────────
export type Status = "Active" | "Pending" | "Completed";

export type Order = {
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
};

// ── Status Styles ───────────────────────────────
const orderStatusStyles: Record<Status, string> = {
  Active: "border border-[#1e3a8a] text-[#1e3a8a] bg-[#eff3ff] px-3 py-1",
  Pending: "border border-amber-400 text-amber-500 bg-amber-50 px-3 py-1",
  Completed: "border border-green-500 text-green-600 bg-green-50 px-3 py-1",
};

// ── Status Badge ────────────────────────────────
export function OrderStatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`rounded-full text-xs font-semibold ${orderStatusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ── InfoBox ─────────────────────────────────────
function InfoBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}

// ── Order Detail ────────────────────────────────
export default function OrderDetail({ order }: { order: Order }) {
  const [status, setStatus] = useState<Status>(order.status);

  return (
    <div className="flex-1 bg-white rounded-2xl p-6 overflow-y-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#1e3a8a] font-semibold text-lg">
          Order ID: {order.id}
        </h2>

        <OrderStatusBadge status={status} />
      </div>

      {/* Product */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 flex items-center justify-center w-full sm:w-48 shrink-0 min-h-[160px]">
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

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoBox className="sm:col-span-2">
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

          <InfoBox className="sm:col-span-2">
            <span className="font-semibold">After Discount:</span>{" "}
            {order.product.priceAfterDiscount} $
          </InfoBox>
        </div>
      </div>

      {/* Customer */}
      <div className="border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48 shrink-0 rounded-xl overflow-hidden min-h-[180px] bg-gray-100">
          <img
            src={
              order.customer.image ||
              "https://placehold.co/200x200?text=Customer"
            }
            alt={order.customer.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoBox className="sm:col-span-2">
            <span className="font-semibold">Customer Name:</span>{" "}
            {order.customer.name}
          </InfoBox>

          <InfoBox>
            <span className="font-semibold">Gender:</span>{" "}
            {order.customer.gender}
          </InfoBox>

          <InfoBox>
            <span className="font-semibold">Birthday:</span>{" "}
            {order.customer.birthday
              ? new Date(order.customer.birthday).toLocaleDateString()
              : "N/A"}
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

      {/* Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-800">
            <span className="font-semibold">Arrival:</span>{" "}
            {new Date(order.arrivalDate).toLocaleDateString()}
          </span>

          <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
            <Calendar size={15} className="text-white" />
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-800">
            <span className="font-semibold">Status:</span> {status}
          </span>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="appearance-none bg-[#1e3a8a] text-white rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
