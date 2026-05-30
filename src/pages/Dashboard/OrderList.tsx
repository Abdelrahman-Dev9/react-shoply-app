import OrderDetail, { type Order } from "@/components/orderList/OrderDetails";
import {
  useDeliverOrderMutation,
  useGetOrdersQuery,
  usePayOrderMutation,
} from "@/redux/services/ordersApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";

const computeStatus = (isPaid: boolean, isDelivered: boolean): Order["status"] => {
  if (isPaid && isDelivered) return "Completed";
  if (!isPaid && !isDelivered) return "Active";
  return "Pending";
};

const statusClass: Record<string, string> = {
  Active: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
  Pending: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
  Completed: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
};

const OrderList = () => {
  const { data, isLoading, isError } = useGetOrdersQuery({});
  const [payOrder] = usePayOrderMutation();
  const [deliverOrder] = useDeliverOrderMutation();

  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [overrides, setOverrides] = useState<
    Record<string, { isPaid?: boolean; isDelivered?: boolean }>
  >({});

  const orders: Order[] = useMemo(() => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.data?.map((order: any) => {
        const override = overrides[order._id] ?? {};
        const isPaid = override.isPaid ?? order.isPaid ?? false;
        const isDelivered = override.isDelivered ?? order.isDelivered ?? false;

        return {
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          status: computeStatus(isPaid, isDelivered),
          taxPrice: order.taxPrice ?? 0,
          shippingPrice: order.shippingPrice ?? 0,
          totalOrderPrice: order.totalOrderPrice ?? 0,
          paymentMethodType: order.paymentMethodType ?? "cash",
          isPaid,
          paidAt: order.paidAt ?? "",
          isDelivered,
          deliveredAt: order.deliveredAt ?? "",
          cartItems: order.cartItems ?? [],
          customer: {
            image: "",
            name: order.user?.name ?? "Unknown",
            gender: order.user?.gender ?? "Unknown",
            birthday: order.user?.birthday ?? "",
            mobile: order.user?.phone ?? "",
            email: order.user?.email ?? "",
          },
          address: order.shippingAddress?.details ?? "No address",
          shippingPhone: order.shippingAddress?.phone ?? "",
          shippingCity: order.shippingAddress?.city ?? "",
          shippingPostalCode: order.shippingAddress?.postalCode ?? "",
        };
      }) ?? []
    );
  }, [data, overrides]);

  const filtered = useMemo(
    () => orders.filter((o) => o.id.toLowerCase().includes(search.toLowerCase())),
    [orders, search]
  );

  const safeIndex = selectedIndex >= filtered.length ? 0 : selectedIndex;
  const selectedOrder = filtered[safeIndex];

  const handleUpdate = async (
    id: string,
    patch: { isPaid?: boolean; isDelivered?: boolean }
  ) => {
    setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
    try {
      if (patch.isPaid === true) await payOrder(id).unwrap();
      if (patch.isDelivered === true) await deliverOrder(id).unwrap();
    } catch {
      setOverrides((prev) => {
        const current = { ...prev[id] };
        if (patch.isPaid !== undefined) delete current.isPaid;
        if (patch.isDelivered !== undefined) delete current.isDelivered;
        return { ...prev, [id]: current };
      });
    }
  };

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-screen bg-[#eef2fb] p-4 overflow-hidden">
      {/* Left panel */}
      <Card className="shrink-0 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#1e3a8a] text-xl">Order list</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden pb-4">
          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search for code"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="pl-8 rounded-xl border-gray-200 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-gray-200 shrink-0"
            >
              <Filter size={16} />
            </Button>
          </div>

          {/* Order rows */}
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
                    safeIndex === i ? "bg-[#eff3ff]" : "hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        safeIndex === i ? "text-[#1e3a8a]" : "text-gray-800"
                      }`}
                    >
                      ID #{order.id}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">{order.date}</p>
                  </div>
                  <Badge className={`text-xs shrink-0 ${statusClass[order.status]}`}>
                    {order.status}
                  </Badge>
                </button>
              ))}

            {!isLoading && filtered.length === 0 && (
              <p className="mt-8 text-center text-sm text-gray-400">No orders found</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right panel */}
      {selectedOrder ? (
        <OrderDetail
          order={selectedOrder}
          onUpdate={(patch) => handleUpdate(selectedOrder.id, patch)}
        />
      ) : (
        <Card className="flex-1 rounded-2xl flex items-center justify-center text-gray-400 text-sm shadow-sm">
          Select an order
        </Card>
      )}
    </div>
  );
};

export default OrderList;
