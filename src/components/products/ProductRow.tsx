import { memo } from "react";
import type { Product } from "@/types/product.types";
import StarRating from "./StarRating";

interface Props {
  product: Product;
}

const ProductRow = memo(({ product }: Props) => {
  return (
    <>
      <td className="px-4 py-3 font-medium text-gray-900">{product.title}</td>

      <td className="px-4 py-3">
        {product.imageCover ? (
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-12 w-12 rounded bg-gray-100 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200 text-xs text-gray-400">
            No image
          </div>
        )}
      </td>

      <td className="px-4 py-3 text-gray-700">{product.category}</td>

      <td className="px-4 py-3 text-center">
        <span className="inline-block rounded bg-blue-100 py-1 px-2 text-sm font-medium text-blue-800">
          {product.quantity ?? "-"}
        </span>
      </td>

      <td className="px-4 py-3 font-medium text-gray-900">
        {product.priceAfterDiscount ? `EG ${product.priceAfterDiscount}` : "-"}
      </td>

      <td className="px-4 py-3 font-medium text-gray-900">
        EG {product.price}
      </td>

      <td className="px-4 py-3">
        <StarRating rating={product.ratingsAverage} />
      </td>
    </>
  );
});

ProductRow.displayName = "ProductRow";

export default ProductRow;
