import type { Product } from "@/types/product.types";
import StarRating from "./StarRating";

interface Props {
  product: Product;
}

const ProductRow = ({ product }: Props) => {
  return (
    <>
      <td className="px-4 py-3 font-medium text-gray-900">{product.title}</td>

      <td className="px-4 py-3">
        {product.imageCover ? (
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-12 h-12 rounded object-cover bg-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
      </td>

      <td className="px-4 py-3 text-gray-700">{product.category}</td>

      <td className="py-3 text-center">
        <span className="inline-block py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
          {product.quantity ?? "-"}
        </span>
      </td>

      <td className="px-4 py-3 text-gray-900 font-medium">
        {product.priceAfterDiscount ? `SR ${product.priceAfterDiscount}` : "-"}
      </td>

      <td className="px-4 py-3 text-gray-900 font-medium">
        SR {product.price}
      </td>

      <td className="px-4 py-3">
        <StarRating rating={product.ratingsAverage} />
      </td>
    </>
  );
};

export default ProductRow;
