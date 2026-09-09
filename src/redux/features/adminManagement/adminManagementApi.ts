import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const adminManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/users/admins`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.adminManagement],
    }),
    addAdmin: builder.mutation({
      query: (req) => ({
        url: `/users/admin`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.adminManagement],
    }),
    editAdmin: builder.mutation({
      query: (req) => ({
        url: `/users/admin/update/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.adminManagement],
    }),
    deleteAdmin: builder.mutation({
      query: (req) => ({
        url: `/users/admin/${req.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.adminManagement],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useAddAdminMutation,
  useEditAdminMutation,
  useDeleteAdminMutation,
} = adminManagementApi;
