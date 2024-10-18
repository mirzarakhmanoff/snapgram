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
      providesTags: ["User"],
    }),
    getProfile: build.query({
      query: (params) => ({
        url: `/api/user/profile`,
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
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
        body: username,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    unfollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: "POST",
        body: username,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
  }),
});

export const {
  usePostDataMutation,
  useLoginMutation,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetProfileQuery,
} = authApi;
