import { User } from "../../models/user";
import { baseApi } from "../baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery } = usersApi;
