import { useMemo } from "react";
import type { Product } from "@/types/product.types";

export const useFilteredProducts = (products: Product[]) => {
  return useMemo(() => {
    return products.filter((p) => p.active !== false);
  }, [products]);
};
