import { Product, NewProduct } from "../../models/product";
import { baseApi } from "../baseApi";

// Định nghĩa interface cho response pagination
export interface PaginatedProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Định nghĩa interface cho query params
export interface ProductsQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      PaginatedProductsResponse,
      ProductsQueryParams | void
    >({
      query: (params = {}) => ({
        url: "/products",
        params: {
          search: params?.search,
          page: params?.page || 1,
          limit: params?.limit || 10,
        },
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
