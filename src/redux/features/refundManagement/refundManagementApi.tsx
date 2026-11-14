import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const refundManagementApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Photography & Videography cancelled orders for refund
    getCancelledEventOrders: builder.query({
      query: ({ page, limit, searchTerm, searchTerms, paymentStatus }) => {
        const querySearch = searchTerms || searchTerm;
        return {
          url: `/event-order`,
          method: "GET",
          params: {
            status: "cancelled",
            page,
            limit,
            ...(querySearch ? { searchTerms: querySearch } : {}),
            ...(paymentStatus ? { paymentStatus } : {}),
          },
        };
      },
      providesTags: [tagTypes.refundManagement],
    }),

    // Gear cancelled orders for refund
    getCancelledGearOrders: builder.query({
      query: ({ page, limit, searchTerm, searchTerms, paymentStatus }) => {
        const querySearch = searchTerms || searchTerm;
        return {
          url: `/gear-order`,
          method: "GET",
          params: {
            orderStatus: "cancelled",
            page,
            limit,
            ...(querySearch ? { searchTerms: querySearch } : {}),
            ...(paymentStatus ? { paymentStatus } : {}),
          },
        };
      },
      providesTags: [tagTypes.refundManagement],
    }),

    // Event order refund. req.params is the eventOrderId.
    // (Own endpoint: it used to share /complete-payment with delivery management.)
    eventOrderCompleteRefund: builder.mutation({
      query: (req) => ({
        url: `/event-order/complete-refund/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        tagTypes.refundManagement,
        tagTypes.deliveryManagement,
        tagTypes.orderManagement,
      ],
    }),

    // Gear order refund. req.params is the gearOrderId.
    gearOrderCompleteRefund: builder.mutation({
      query: (req) => ({
        url: `/gear-order/complete-refund/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        tagTypes.refundManagement,
        tagTypes.deliveryManagement,
        tagTypes.orderManagement,
      ],
    }),
  }),
});

export const {
  useGetCancelledEventOrdersQuery,
  useGetCancelledGearOrdersQuery,
  useEventOrderCompleteRefundMutation,
  useGearOrderCompleteRefundMutation,
} = refundManagementApi;
