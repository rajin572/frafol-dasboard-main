import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const gearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGear: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/marketPlace",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.gear],
    }),
    getAllPendingGear: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/marketPlace/pending`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.gear],
    }),
    updateGearApprovalStatus: builder.mutation({
      query: (req) => ({
        url: `/marketPlace/updateApprovalStatus/${req.params}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.gear],
    }),
    deleteGear: builder.mutation({
      query: (req) => ({
        url: `/marketPlace/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.gear],
    }),
  }),
});

export const {
  useGetAllGearQuery,
  useGetAllPendingGearQuery,
  useUpdateGearApprovalStatusMutation,
  useDeleteGearMutation,
} = gearApi;
