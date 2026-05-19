export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: string;
  quantity?: number;
  priceAfterDiscount?: number;
  price: number;
  ratingsAverage?: number;
  active?: boolean;
}

export interface ProductsResponse {
  data: Product[];
  results: number;
}
