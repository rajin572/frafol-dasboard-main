import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const townApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTown: builder.query({
      query: ({ searchTerm }) => ({
        url: `/town`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: [tagTypes.town],
    }),
    addTown: builder.mutation({
      query: (req) => ({
        url: `/town/create`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.town],
    }),
    updateTown: builder.mutation({
      query: (req) => ({
        url: `/town/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.town],
    }),
    deleteTown: builder.mutation({
      query: (req) => ({
        url: `/town/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.town],
    }),
  }),
});

export const {
  useGetTownQuery,
  useAddTownMutation,
  useUpdateTownMutation,
  useDeleteTownMutation,
} = townApi;
