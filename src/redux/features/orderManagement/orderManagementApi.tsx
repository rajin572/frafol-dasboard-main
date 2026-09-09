import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderStates: builder.query({
      query: () => ({
        url: "/users/order-stats",
        method: "GET",
      }),
      providesTags: [tagTypes.orderManagement],
    }),
    getAllOrderManagement: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/event-order",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.orderManagement],
    }),
    getAllGearOrderManagement: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/gear-order",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.orderManagement],
    }),
    cancelOrder: builder.mutation({
      query: (req) => ({
        url: `/event-order/admin/cancel/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.orderManagement],
    }),
    cancelGearOrder: builder.mutation({
      query: (req) => ({
        url: `/gear-order/cancel/${req?.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.orderManagement],
    }),
  }),
});

export const {
  useGetOrderStatesQuery,
  useGetAllOrderManagementQuery,
  useGetAllGearOrderManagementQuery,
  useCancelOrderMutation,
  useCancelGearOrderMutation,
} = orderManagementApi;
