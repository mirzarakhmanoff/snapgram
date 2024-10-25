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
    getSinglePost: build.query({
      query: ({ username, id }) => ({
        url: `api/post/${username}/${id}`,
        method: "GET",
      }),
    }),
    getPostComments: build.query({
      query: ({ id }) => ({
        url: `api/comment/post/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useToggleLikeMutation,
  usePostCommentMutation,
  useGetSinglePostQuery,
  useGetPostCommentsQuery,
} = productApi;
