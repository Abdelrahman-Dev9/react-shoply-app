import OrderDetail, { type Order } from "@/components/orderList/OrderDetails";
import { useGetOrdersQuery } from "@/redux/services/ordersApi";
import { Filter, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";

const OrderList = () => {
  const { data, isLoading, isError } = useGetOrdersQuery({});
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const orders: Order[] = useMemo(() => {
    return (
      data?.data?.map((order: any) => ({
        id: order._id,

        date: new Date(order.createdAt).toLocaleDateString(),

        status: order.isDelivered
          ? "Completed"
          : order.isPaid
          ? "Active"
          : "Pending",

        product: {
          image: order.cartItems?.[0]?.product?.imageCover || "",
          name: order.cartItems?.[0]?.product?.title || "Unknown Product",
          price: order.cartItems?.[0]?.price || 0,
          quantity: order.cartItems?.[0]?.quantity || 0,
          priceAfterDiscount: order.totalOrderPrice || 0,
        },

        customer: {
          image: "",
          name: order.user?.name || "Unknown",
          gender: order.user?.gender || "Unknown",
          birthday: order.user?.birthday || "",
          mobile: order.user?.phone || "",
          email: order.user?.email || "",
        },

        address: order.shippingAddress?.details || "No address",

        arrivalDate: order.createdAt,
      })) || []
    );
  }, [data]);

  const filtered = useMemo(() => {
    return orders.filter((o) =>
      o.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const safeSelectedIndex =
    selectedIndex >= filtered.length ? 0 : selectedIndex;

  const selectedOrder = filtered[safeSelectedIndex];

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-screen bg-[#f0f4ff] p-4 overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-72 shrink-0 bg-white rounded-2xl p-4 flex flex-col gap-4 overflow-hidden">
        <h1 className="text-[#1e3a8a] font-bold text-xl">Order list</h1>

        {/* Search */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />

            <input
              type="text"
              placeholder="Search for code"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          <button className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
            <Filter size={16} />
          </button>
        </div>

        {/* Orders */}
        <div className="relative flex-1 overflow-y-auto space-y-2 pr-1">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
            </div>
          )}

          {!isLoading &&
            filtered.map((order, i) => (
              <button
                key={order.id}
                onClick={() => setSelectedIndex(i)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                  safeSelectedIndex === i ? "bg-[#eff3ff]" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      safeSelectedIndex === i
                        ? "text-[#1e3a8a]"
                        : "text-gray-800"
                    }`}
                  >
                    ID {order.id}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">{order.date}</p>
                </div>
              </button>
            ))}

          {!isLoading && filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-gray-400">
              No orders found
            </p>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {selectedOrder ? (
        <OrderDetail order={selectedOrder} />
      ) : (
        <div className="flex-1 bg-white rounded-2xl flex items-center justify-center text-gray-400 text-sm">
          Select an order
        </div>
      )}
    </div>
  );
};

export default OrderList;
