import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const susbcriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/subscription",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.subscription],
    }),
    updateSubscription: builder.mutation({
      query: (req) => ({
        url: `/subscription/update/${req.params}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
});

export const { useGetAllSubscriptionQuery, useUpdateSubscriptionMutation } =
  susbcriptionApi;
