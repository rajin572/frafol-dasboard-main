import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const refundManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Photography & Videography cancelled orders for refund
    getCancelledEventOrders: builder.query({
      query: ({ page, limit, searchTerm, paymentStatus }) => ({
        url: `/event-order`,
        method: "GET",
        params: {
          status: "cancelled",
          page,
          limit,
          searchTerm,
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      }),
      providesTags: [tagTypes.refundManagement],
    }),

    // General refund query
    getRefundManagement: builder.query({
      query: ({ page, limit, searchTerm, type, refundStatus, paymentStatus }) => ({
        url: `/users/refund-orders`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          type,
          ...(refundStatus ? { refundStatus } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      }),
      providesTags: [tagTypes.refundManagement],
    }),

    everOrderMakeRefund: builder.mutation({
      query: (req) => ({
        url: `/event-order/complete-refund/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.refundManagement],
    }),

    gearOrderMakeRefund: builder.mutation({
      query: (req) => ({
        url: `/gear-order/complete-refund/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.refundManagement],
    }),

    workshopOrderMakeRefund: builder.mutation({
      query: (req) => ({
        url: `/workshopParticipant/complete-refund/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.refundManagement],
    }),
  }),
});

export const {
  useGetCancelledEventOrdersQuery,
  useGetRefundManagementQuery,
  useEverOrderMakeRefundMutation,
  useGearOrderMakeRefundMutation,
  useWorkshopOrderMakeRefundMutation,
} = refundManagementApi;
