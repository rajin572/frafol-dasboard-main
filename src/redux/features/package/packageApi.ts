import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const gearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackage: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/package",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.package],
    }),
    getAllPendingPackage: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/package/pending`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.package],
    }),
    updatePackageApprovalStatus: builder.mutation({
      query: (req) => ({
        url: `/package/updateApprovalStatus/${req.params}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.package],
    }),
    deletePackage: builder.mutation({
      query: (req) => ({
        url: `/package/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.package],
    }),
  }),
});

export const {
  useGetAllPackageQuery,
  useGetAllPendingPackageQuery,
  useUpdatePackageApprovalStatusMutation,
  useDeletePackageMutation,
} = gearApi;
