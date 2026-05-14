import { useMemo } from "react";

export const useFilteredProducts = (products: any[], search: string) => {
  return useMemo(() => {
    return products.filter(
      (p) =>
        p.active !== false &&
        p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);
};
