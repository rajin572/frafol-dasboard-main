import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypeOfUsers: builder.query({
      query: ({ searchTerm }) => ({
        url: `/chat/all-users?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    getAllUsersOverview: builder.query({
      query: () => "/users/stats",
      providesTags: [tagTypes.users],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit, searchTerm, type }) => ({
        url: `/users/all-users?page=${page}&limit=${limit}&searchTerm=${searchTerm}&type=${type}`,
        method: "GET",
      }),
      providesTags: [tagTypes.users],
    }),
    getAllPendingProfessionals: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/pending-professionals`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.users],
    }),
    approveProfessional: builder.mutation({
      query: (req) => ({
        url: `/users/verified/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.users],
    }),
    declineProfessional: builder.mutation({
      query: (req) => ({
        url: `/users/declined/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    blockAndUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/block/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.users],
    }),
    getDeleteAccountRequests: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/delete-account-requests`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.deleteAccountRequest],
    }),
    approveDeleteAccountRequest: builder.mutation({
      query: (req) => ({
        url: `/users/delete-account-requests/${req.params}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.deleteAccountRequest],
    }),
    rejectDeleteAccountRequest: builder.mutation({
      query: (req) => ({
        url: `/users/delete-account-requests/${req.params}/reject`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.deleteAccountRequest],
    }),
  }),
});

export const {
  useGetAllTypeOfUsersQuery,
  useGetAllUsersOverviewQuery,
  useGetAllUsersQuery,
  useGetAllPendingProfessionalsQuery,
  useApproveProfessionalMutation,
  useDeclineProfessionalMutation,
  useBlockAndUnblockUserMutation,
  useGetDeleteAccountRequestsQuery,
  useApproveDeleteAccountRequestMutation,
  useRejectDeleteAccountRequestMutation,
} = UsersApi;
