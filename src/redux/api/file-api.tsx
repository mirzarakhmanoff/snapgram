import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFIle: build.mutation({
      query: (body) => ({
        url: "/api/upload/files",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    getPosts: build.query({
      query: (params) => {
        return {
          url: `/api/user/feed`,
          params,
        };
      },
      providesTags: [],
    }),
  }),
});

export const {
  useUploadFIleMutation,
  useCreatePostMutation,
  useGetPostsQuery,
} = productApi;
