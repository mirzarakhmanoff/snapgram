import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    toggleLike: build.mutation({
      query: (params) => ({
        url: `api/post/${params}/like`,
        method: "POST",
      }),
      invalidatesTags: [],
    }),
    postComment: build.mutation({
      query: ({ id, body }) => ({
        url: `api/comment/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useToggleLikeMutation, usePostCommentMutation } = productApi;
