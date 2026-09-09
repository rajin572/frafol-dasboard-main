import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const interactionManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInteractionMessages: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/message/pending?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.interactionManagement],
    }),
    getInteractionCommunityForum: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/community/pending?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.interactionManagement],
    }),
    approveMessage: builder.mutation({
      query: (req) => ({
        url: `/message/approve/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.interactionManagement],
    }),
    declineMessage: builder.mutation({
      query: (req) => ({
        url: `/message/reject/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.interactionManagement],
    }),
    approveCommunityForum: builder.mutation({
      query: (req) => ({
        url: `/community/approve/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.interactionManagement],
    }),
    declineCommunityForum: builder.mutation({
      query: (req) => ({
        url: `/community/reject/${req.params}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.interactionManagement],
    }),
    // addCategory: builder.mutation({
    //   query: (req) => ({
    //     url: `/category/add`,
    //     method: "POST",
    //     body: req.body, // Passing the body from the request
    //   }),
    //   invalidatesTags: [tagTypes.category],
    // }),
    // updateCategory: builder.mutation({
    //   query: (req) => ({
    //     url: `/category/update/${req.params.id}`,
    //     method: "PATCH",
    //     body: req.body, // Passing the body from the request
    //   }),
    //   invalidatesTags: [tagTypes.category],
    // }),
    // deleteCategory: builder.mutation({
    //   query: (req) => ({
    //     url: `/category/${req.params.id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.category],
    // }),
  }),
});

export const {
  useGetInteractionMessagesQuery,
  useGetInteractionCommunityForumQuery,
  useApproveMessageMutation,
  useDeclineMessageMutation,
  useApproveCommunityForumMutation,
  useDeclineCommunityForumMutation,
  //   useAddCategoryMutation,
  //   useUpdateCategoryMutation,
  //   useDeleteCategoryMutation,
} = interactionManagementApi;
