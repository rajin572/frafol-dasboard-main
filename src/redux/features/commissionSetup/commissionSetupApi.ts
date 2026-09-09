import { baseApi } from "../../api/baseApi";

const commissionSetupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommissionSetup: builder.query({
      query: () => ({
        url: `/commissionSetup`,
        method: "GET",
      }),
      providesTags: ["CommissionSetup"],
    }),
    updateCommissionSetup: builder.mutation({
      query: (req) => ({
        url: `/commissionSetup/update`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: ["CommissionSetup"],
    }),
  }),
}); //commissionSetup

export const { useGetCommissionSetupQuery, useUpdateCommissionSetupMutation } =
  commissionSetupApi;
