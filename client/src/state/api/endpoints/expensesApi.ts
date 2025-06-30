import { ExpenseByCategorySummary } from "../../models/expense";
import { baseApi } from "../baseApi";

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetExpensesByCategoryQuery } = expensesApi;
