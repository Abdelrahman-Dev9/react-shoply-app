export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface PaginationResult {
  currentPage: number;
  numberOfPages: number;
  prev?: number;
  next?: number;
}

export interface CategoriesResponse {
  data: Category[];
  results: number;
  paginationResult: PaginationResult;
}
