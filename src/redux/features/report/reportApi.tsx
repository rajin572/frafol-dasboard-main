import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";
// import { tagTypes } from "../../tagTypes";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: "/report",
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: [tagTypes.report],
    }),
  }),
});

export const { useGetAllReportsQuery } = reportApi;
