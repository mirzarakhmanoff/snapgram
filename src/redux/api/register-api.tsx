import { api } from "./index";

export const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    postData: build.mutation({
      query: (data: object) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { usePostDataMutation } = registerApi;
