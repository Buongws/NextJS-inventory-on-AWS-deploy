import { baseApi } from "./baseApi";

// Export tất cả các hooks từ các API endpoints
export { useGetDashboardMetricsQuery } from "./endpoints/dashboardApi";

export {
  useGetProductsQuery,
  useCreateProductMutation,
} from "./endpoints/productsApi";

export { useGetUsersQuery } from "./endpoints/usersApi";

export { useGetExpensesByCategoryQuery } from "./endpoints/expensesApi";

export { baseApi };
