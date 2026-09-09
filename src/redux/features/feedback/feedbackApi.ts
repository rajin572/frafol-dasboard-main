import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/feedback/admin`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.feedback],
    }),
    approveFeedback: builder.mutation({
      query: (req) => ({
        url: `/feedback/verify/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    declineFeedback: builder.mutation({
      query: (req) => ({
        url: `/feedback/verify/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    deleteFeedback: builder.mutation({
      query: (req) => ({
        url: `/feedback/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useApproveFeedbackMutation,
  useDeclineFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
