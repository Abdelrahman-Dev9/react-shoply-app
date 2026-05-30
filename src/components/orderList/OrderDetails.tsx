import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Types ───────────────────────────────────────

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

// ─── Helpers ───────────────────────────────────────

const computeStatus = (paid: boolean, delivered: boolean): Order["status"] => {
  if (paid && delivered) return "Completed";
  if (!paid && !delivered) return "Active";
  return "Pending";
};

const statusClass: Record<string, string> = {
  Active: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  Pending: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  Completed: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
};

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

// ─── Small UI pieces ───────────────────────────────────────

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm border border-gray-200 rounded-xl px-4 py-3">
    <span className="font-semibold text-gray-800 shrink-0">{label}:</span>
    <span className="text-gray-600 truncate">{value}</span>
  </div>
);

const DateField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center justify-between text-sm border border-gray-200 rounded-xl px-4 py-3">
    <div>
      <span className="font-semibold text-gray-800">{label}: </span>
      <span className="text-gray-600">{formatDate(value)}</span>
    </div>
    <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center shrink-0">
      <CalendarDays size={15} className="text-white" />
    </div>
  </div>
);

const ToggleDropdown = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="border border-gray-200 rounded-xl px-4 py-3 text-sm flex justify-between items-center">
    <span>
      <span className="font-semibold text-gray-800">{label}: </span>
      <span className={value ? "text-green-600" : "text-red-500"}>
        {value ? "True" : "False"}
      </span>
    </span>
    {!value && (
      <Button
        size="sm"
        onClick={() => onChange(true)}
        className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 h-7 text-xs px-3"
      >
        Mark True
      </Button>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────

const OrderDetail = ({
  order,
  onUpdate,
}: {
  order: Order;
  onUpdate: (data: Partial<Order>) => void;
}) => {
  const status = computeStatus(order.isPaid, order.isDelivered);

  return (
    <Card className="flex-1 overflow-y-auto rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#1e3a8a] text-base font-semibold">
            Order ID: #{order.id}
          </CardTitle>
          <Badge className={statusClass[status]}>{status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Prices */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tax Price" value={`${order.taxPrice} $`} />
          <Field label="Shipping" value={`${order.shippingPrice} $`} />
          <Field label="Total" value={`${order.totalOrderPrice} $`} />
          <Field
            label="Payment"
            value={
              <span className="capitalize">{order.paymentMethodType}</span>
            }
          />
        </div>

        {/* Paid / Delivered */}
        <div className="grid grid-cols-2 gap-3">
          <ToggleDropdown
            label="Paid"
            value={order.isPaid}
            onChange={(v) => onUpdate({ isPaid: v })}
          />
          <DateField label="Paid At" value={order.paidAt} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ToggleDropdown
            label="Delivered"
            value={order.isDelivered}
            onChange={(v) => onUpdate({ isDelivered: v })}
          />
          <DateField label="Delivered At" value={order.deliveredAt} />
        </div>

        {/* Address */}
        <Field label="Address" value={order.address} />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Phone" value={order.shippingPhone} />
          <Field label="City" value={order.shippingCity} />
          <Field label="Postal" value={order.shippingPostalCode} />
        </div>

        {/* Customer */}
        <Card className="rounded-2xl shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#1e3a8a] text-sm">
              Customer Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar className="w-36 h-36  shrink-0">
                <AvatarImage
                  src={order.customer.image}
                  className="object-cover"
                />
                <AvatarFallback className=" text-3xl text-gray-300 bg-gray-100">
                  {order.customer.name?.[0] || "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <Field label="Name" value={order.customer.name} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Gender" value={order.customer.gender} />
                  <Field
                    label="Birthday"
                    value={formatDate(order.customer.birthday)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Mobile" value={order.customer.mobile || "—"} />
                  <Field label="Email" value={order.customer.email || "—"} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        {order.cartItems.map((item, i) => (
          <Card key={item._id} className="rounded-2xl shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#1e3a8a] text-sm">
                Product {i + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-36 h-36 border rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  {item.product.imageCover ? (
                    <img
                      src={item.product.imageCover}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Field label="Name" value={item.product.title} />
                  <Field label="Category" value={item.product.category} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Price" value={`${item.price} $`} />
                    <Field label="Qty" value={item.quantity} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderDetail;
