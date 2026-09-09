import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupon: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),
    addCoupon: builder.mutation({
      query: (req) => ({
        url: `/coupon`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    updateCoupon: builder.mutation({
      query: (req) => ({
        url: `/coupon/update/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    updateStatus: builder.mutation({
      query: (req) => ({
        url: `/coupon/status/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    deleteCoupon: builder.mutation({
      query: (req) => ({
        url: `/coupon/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useGetCouponQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useUpdateStatusMutation,
  useDeleteCouponMutation,
} = couponApi;
