import { useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  RotateCcw,
  Search,
  Upload,
  X,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  quantity?: number;
  priceAfterDiscount?: string;
  price: string;
  rating: number;
  blocked?: boolean;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const INITIAL_CURRENT: Product[] = [
  {
    id: 1,
    name: "Wanette",
    image:
      "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
    category: "Cars",
    quantity: 3,
    priceAfterDiscount: "SR 100",
    price: "SR 100",
    rating: 5,
  },
  {
    id: 2,
    name: "Traila",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Iveco_Stralis_Hi-Way_AS440S46T%2FXP_truck_%282013%29.jpg/320px-Iveco_Stralis_Hi-Way_AS440S46T%2FXP_truck_%282013%29.jpg",
    category: "Cars",
    quantity: 5,
    priceAfterDiscount: "SR 120",
    price: "SR 120",
    rating: 3.5,
  },
  {
    id: 3,
    name: "Lorry",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/2019_Hino_500_Series_1124_4x2_lorry_%28Malaysia%29%2C_front_8.21.58_PM.jpg/320px-2019_Hino_500_Series_1124_4x2_lorry_%28Malaysia%29%2C_front_8.21.58_PM.jpg",
    category: "Cars",
    quantity: 18,
    priceAfterDiscount: "SR 340",
    price: "SR 340",
    rating: 2.5,
  },
];

const INITIAL_BLOCKED: Product[] = [
  {
    id: 4,
    name: "Wanette",
    image:
      "https://www.mitsubishi-motors.com/en/products/l200/features/_jcr_content/par/top_image/image.img.jpg/1580968703671.jpg",
    category: "Cars",
    price: "SR 100",
    rating: 5,
    blocked: true,
  },
  {
    id: 5,
    name: "Traila",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Iveco_Stralis_Hi-Way_AS440S46T%2FXP_truck_%282013%29.jpg/320px-Iveco_Stralis_Hi-Way_AS440S46T%2FXP_truck_%282013%29.jpg",
    category: "Cars",
    price: "SR 120",
    rating: 3.5,
    blocked: true,
  },
];

const CATEGORIES = [
  "All Categories",
  "Cars",
  "Beauty & Personal Care",
  "Electronics",
  "Clothing",
  "Furniture",
];

// ── Star rating ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        const gradId = `half-${star}-${rating}`;
        return (
          <svg key={star} width="18" height="18" viewBox="0 0 24 24">
            {half && (
              <defs>
                <linearGradient id={gradId}>
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
            )}
            <path
              fill={half ? `url(#${gradId})` : filled ? "#f59e0b" : "#e5e7eb"}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      })}
    </div>
  );
}

// ── Search bar ─────────────────────────────────────────────────────────────
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white flex-1 max-w-md">
      <Search size={14} className="text-gray-400 shrink-0" />
      <input
        type="text"
        placeholder="Search for product name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}

// ── Current products table ─────────────────────────────────────────────────
function CurrentProductsTable({
  products,
  search,
}: {
  products: Product[];
  search: string;
}) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="text-gray-700 text-[13px]">
            <th className="text-left pb-3 pl-4 font-semibold">Product name</th>
            <th className="text-left pb-3 font-semibold">Product image</th>
            <th className="text-left pb-3 font-semibold">Category</th>
            <th className="text-left pb-3 font-semibold">Quantity</th>
            <th className="text-left pb-3 font-semibold">
              Price after discount
            </th>
            <th className="text-left pb-3 font-semibold">Price</th>
            <th className="text-left pb-3 font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-8">
                No products found
              </td>
            </tr>
          ) : (
            filtered.map((p) => (
              <>
                <tr key={`div-${p.id}`}>
                  <td colSpan={7} className="p-0">
                    <hr className="border-gray-200" />
                  </td>
                </tr>
                <tr
                  key={`row-${p.id}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-4 text-gray-700">{p.name}</td>
                  <td className="py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-14 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/80x56?text=img";
                      }}
                    />
                  </td>
                  <td className="py-4 text-gray-700">{p.category}</td>
                  <td className="py-4 text-gray-700">{p.quantity}</td>
                  <td className="py-4 text-gray-700">{p.priceAfterDiscount}</td>
                  <td className="py-4 text-gray-700">{p.price}</td>
                  <td className="py-4">
                    <StarRating rating={p.rating} />
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Blocked products table ─────────────────────────────────────────────────
function BlockedProductsTable({
  products,
  search,
}: {
  products: Product[];
  search: string;
}) {
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="text-gray-700 text-[13px]">
            <th className="text-left pb-3 pl-4 font-semibold">Product name</th>
            <th className="text-left pb-3 font-semibold">Product image</th>
            <th className="text-left pb-3 font-semibold">Category</th>
            <th className="text-left pb-3 font-semibold">Price</th>
            <th className="text-left pb-3 font-semibold">Rating</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-8">
                No blocked products found
              </td>
            </tr>
          ) : (
            filtered.map((p) => (
              <>
                <tr key={`div-${p.id}`}>
                  <td colSpan={5} className="p-0">
                    <hr className="border-gray-200" />
                  </td>
                </tr>
                <tr
                  key={`row-${p.id}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-4 text-gray-700">{p.name}</td>
                  <td className="py-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-14 object-contain opacity-50 grayscale"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/80x56?text=img";
                      }}
                    />
                  </td>
                  <td className="py-4 text-gray-700">{p.category}</td>
                  <td className="py-4 text-gray-700">{p.price}</td>
                  <td className="py-4">
                    <StarRating rating={p.rating} />
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Add product modal ──────────────────────────────────────────────────────
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (product: Product) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    priceAfterDiscount: "",
    description: "",
    category: "Beauty & Personal Care",
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setForm({
      name: "",
      price: "",
      quantity: "",
      priceAfterDiscount: "",
      description: "",
      category: "Beauty & Personal Care",
    });
    setPreview(null);
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      image: preview ?? "",
      category: form.category === "All Categories" ? "General" : form.category,
      quantity: Number(form.quantity) || 0,
      priceAfterDiscount: form.priceAfterDiscount
        ? `SR ${form.priceAfterDiscount}`
        : "SR 0",
      price: form.price ? `SR ${form.price}` : "SR 0",
      rating: 0,
    });
    onClose();
  };

  const setField =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X size={14} className="text-white" />
        </button>

        {/* Title */}
        <h2 className="text-center text-[#1e3a8a] font-bold text-xl mb-6">
          Add new product
        </h2>

        {/* Image + fields row */}
        <div className="flex gap-4 mb-4">
          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-40 shrink-0 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 py-6 hover:border-[#1e3a8a] transition-colors overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload size={22} className="text-[#1e3a8a]" />
                </div>
                <span className="text-xs text-[#1e3a8a] font-medium text-center px-2">
                  Upload product image
                </span>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />

          {/* Right fields */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Name */}
            <div className="border border-gray-200 rounded-xl px-4 py-2.5">
              <input
                value={form.name}
                onChange={setField("name")}
                placeholder="Enter product name here"
                className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>

            {/* Price + Quantity */}
            <div className="flex gap-3">
              <div className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5">
                <input
                  value={form.price}
                  onChange={setField("price")}
                  placeholder="$[00.00]"
                  className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>
              <div className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5">
                <input
                  value={form.quantity}
                  onChange={setField("quantity")}
                  placeholder="Enter quantity"
                  className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
              </div>
            </div>

            {/* Price after discount */}
            <div className="border border-gray-200 rounded-xl px-4 py-2.5">
              <input
                value={form.priceAfterDiscount}
                onChange={setField("priceAfterDiscount")}
                placeholder="$[00.00]"
                className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border border-gray-200 rounded-xl px-4 py-3 mb-4">
          <textarea
            value={form.description}
            onChange={setField("description")}
            placeholder="Write a brief summary of the product in 1–2 sentences"
            rows={2}
            className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 resize-none bg-transparent"
          />
        </div>

        {/* Category */}
        <div className="border border-gray-200 rounded-xl px-4 py-3 mb-6 flex items-center justify-between relative">
          <span className="text-sm text-gray-700">
            <span className="font-semibold">Category:</span> {form.category}
          </span>
          <button
            type="button"
            onClick={() => setCategoryOpen((v) => !v)}
            className="flex items-center gap-1.5 bg-[#1e3a8a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1e40af] transition-colors"
          >
            All Categories
            <ChevronDown
              size={12}
              className={`transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryOpen && (
            <div className="absolute right-4 top-12 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setForm((f) => ({ ...f, category: cat }));
                    setCategoryOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#eff3ff] hover:text-[#1e3a8a] ${
                    form.category === cat
                      ? "text-[#1e3a8a] font-semibold bg-[#eff3ff]"
                      : "text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 border border-[#1e3a8a] text-[#1e3a8a] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#eff3ff] transition-colors"
          >
            <RotateCcw size={14} />
            Reset all
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-[#1e3a8a] text-white text-sm font-bold px-10 py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [blockedSearch, setBlockedSearch] = useState("");
  const [blockedCollapsed, setBlockedCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProducts, setCurrentProducts] =
    useState<Product[]>(INITIAL_CURRENT);
  const [blockedProducts, setBlockedProducts] =
    useState<Product[]>(INITIAL_BLOCKED);

  const handleActiveAll = () => {
    setCurrentProducts((prev) => [
      ...prev,
      ...blockedProducts.map((p) => ({ ...p, blocked: false })),
    ]);
    setBlockedProducts([]);
  };

  const handleAddProduct = (product: Product) => {
    setCurrentProducts((prev) => [...prev, product]);
  };

  return (
    <div
      className="flex flex-col gap-5 p-4 md:p-6 bg-[#f0f4ff] min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Current products ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Current products ({currentProducts.length})
          </h2>
          <SearchBar value={currentSearch} onChange={setCurrentSearch} />
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#1e3a8a] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors whitespace-nowrap"
            >
              <Plus size={15} />
              Add new product
            </button>
            <button className="w-10 h-10 bg-[#1e3a8a] text-white rounded-xl flex items-center justify-center hover:bg-[#1e40af] transition-colors shrink-0">
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <CurrentProductsTable
          products={currentProducts}
          search={currentSearch}
        />
      </div>

      {/* ── Blocked products ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <h2 className="text-[#1e3a8a] font-bold text-xl whitespace-nowrap">
            Blocked products ({blockedProducts.length})
          </h2>
          <SearchBar value={blockedSearch} onChange={setBlockedSearch} />
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleActiveAll}
              className="bg-[#1e3a8a] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1e40af] transition-colors whitespace-nowrap"
            >
              Active all
            </button>
            <button
              onClick={() => setBlockedCollapsed((v) => !v)}
              className="w-10 h-10 bg-[#1e3a8a] text-white rounded-xl flex items-center justify-center hover:bg-[#1e40af] transition-colors shrink-0"
            >
              {blockedCollapsed ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </button>
          </div>
        </div>

        {!blockedCollapsed && (
          <BlockedProductsTable
            products={blockedProducts}
            search={blockedSearch}
          />
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
}
