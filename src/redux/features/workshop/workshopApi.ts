import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const gearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWorkshop: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/workshop/admin",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.workshop],
    }),
    getAllPendingWorkshop: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/workshop/pending`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.workshop],
    }),
    updateWorkshopApprovalStatus: builder.mutation({
      query: (req) => ({
        url: `/workshop/updateApprovalStatus/${req.params}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.workshop],
    }),
    deleteWorkshop: builder.mutation({
      query: (req) => ({
        url: `/workshop/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.workshop],
    }),
    getWorkshopParticipants: builder.query({
      query: (workshopId: string) => ({
        url: `/workshop/participants/${workshopId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workshop],
    }),
  }),
});

export const {
  useGetAllWorkshopQuery,
  useGetAllPendingWorkshopQuery,
  useUpdateWorkshopApprovalStatusMutation,
  useDeleteWorkshopMutation,
  useGetWorkshopParticipantsQuery,
} = gearApi;
