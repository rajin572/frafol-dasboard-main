import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const deliveryManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryManagement: builder.query({
      query: ({ page, limit, searchTerm, type, paymentStatus }) => ({
        url: `/users/delivery-orders`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          type,
          ...(paymentStatus ? { paymentStatus } : {}),
        },
      }),
      providesTags: [tagTypes.deliveryManagement],
    }),
    everOrderMakePayment: builder.mutation({
      query: (req) => ({
        url: `/event-order/complete-payment/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.deliveryManagement],
    }),
    gearOrderMakePayment: builder.mutation({
      query: (req) => ({
        url: `/gear-order/complete-payment/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.deliveryManagement],
    }),
    workshopOrderMakePayment: builder.mutation({
      query: (req) => ({
        url: `/workshopParticipant/complete-instructor-payment/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.deliveryManagement],
    }),
    // updateCommissionSetup: builder.mutation({
    //   query: (req) => ({
    //     url: `/commissionSetup/update`,
    //     method: "PATCH",
    //     body: req.body, // Passing the body from the request
    //   }),
    //   invalidatesTags: ["CommissionSetup"],
    // }),
  }),
}); //commissionSetup

export const {
  useGetDeliveryManagementQuery,
  useEverOrderMakePaymentMutation,
  useGearOrderMakePaymentMutation,
  useWorkshopOrderMakePaymentMutation,
} = deliveryManagementApi;
