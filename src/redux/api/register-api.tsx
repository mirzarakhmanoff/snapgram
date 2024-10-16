import { api } from "./index";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    postData: build.mutation({
      query: (data: object) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: build.query({
      query: (params) => ({
        url: `/api/user/all`,
        method: "GET",
        params,
      }),
    }),
    login: build.mutation({
      query: (data: object) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { usePostDataMutation, useLoginMutation, useGetUserQuery } =
  authApi;
