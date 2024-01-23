// export interface ApiResponse<T> {
//   statusCode: number;
//   data: Data<T>;
//   error: boolean;
//   message: string;
// }

export interface ApiResponse<R> {
  content: R[];
  pagination: PaginationResponse;
}

export interface PaginationResponse {
  perPage: number;
  currentPage: number;
  totalPages: number;
  totalRows: number;
}

export interface QueryParams {
  [key: string]: string;
}
