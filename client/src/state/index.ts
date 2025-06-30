// Export tất cả các API hooks
export {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
  baseApi,
} from "./api";

// Export global slice
export { setIsSidebarCollapsed, setIsDarkMode } from "./slices/globalSlice";

// Export reducer
import globalReducer from "./slices/globalSlice";
export { globalReducer };
