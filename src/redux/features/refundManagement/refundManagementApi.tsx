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

    // Event order refund payment (same endpoint as delivery management)
    everOrderMakePayment: builder.mutation({
      query: (req) => ({
        url: `/event-order/complete-payment/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [
        tagTypes.refundManagement,
        tagTypes.deliveryManagement,
        tagTypes.orderManagement,
      ],
    }),

    // Gear order refund payment (same endpoint as delivery management)
    gearOrderMakePayment: builder.mutation({
      query: (req) => ({
        url: `/gear-order/complete-payment/${req.params}`,
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
  useEverOrderMakePaymentMutation,
  useGearOrderMakePaymentMutation,
} = refundManagementApi;
