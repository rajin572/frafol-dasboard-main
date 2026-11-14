import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const refundManagementApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Photography & Videography orders that need a refund.
    // GET /event-order/refund-management?page&limit&paymentStatus=unpaid|paid&searchTerm
    //   paymentStatus=unpaid -> refund still pending, paymentStatus=paid -> already refunded.
    //   searchTerm matches the order number or the client name.
    // Response: { data: { meta: { page, limit, total, totalPage }, result: [...] } }
    getCancelledEventOrders: builder.query({
      query: ({ page, limit, searchTerm, paymentStatus }) => ({
        url: `/event-order/refund-management`,
        method: "GET",
        params: {
          page,
          limit,
          ...(searchTerm ? { searchTerm } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      }),
      providesTags: [tagTypes.refundManagement],
    }),

    // Gear orders that need a refund. Same query params and response shape as above;
    // searchTerm matches the order number or the item name.
    // GET /gear-order/refund-management
    getCancelledGearOrders: builder.query({
      query: ({ page, limit, searchTerm, paymentStatus }) => ({
        url: `/gear-order/refund-management`,
        method: "GET",
        params: {
          page,
          limit,
          ...(searchTerm ? { searchTerm } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      }),
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
