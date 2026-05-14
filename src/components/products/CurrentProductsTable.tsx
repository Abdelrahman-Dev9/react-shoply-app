import type { Product } from "@/types/product.types";
import ProductRow from "./ProductRow";

interface Props {
  products: Product[];
}

const CurrentProductsTable = ({ products }: Props) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Product</th>
            <th className="text-left px-4 py-3 font-semibold">Image</th>
            <th className="text-left px-4 py-3 font-semibold">Category</th>
            <th className="text-left px-4 py-3 font-semibold">Quantity</th>
            <th className="text-left px-4 py-3 font-semibold">Discount</th>
            <th className="text-left px-4 py-3 font-semibold">Price</th>
            <th className="text-left px-4 py-3 font-semibold">Rating</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-slate-50 transition-colors"
            >
              <ProductRow product={product} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentProductsTable;
