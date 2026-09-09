import { baseApi } from "../../api/baseApi";
// import { tagTypes } from "../../tagTypes";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: "/users/admin/dashboard-stats",
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getMonthlyEarningStats: builder.query({
      query: ({ year }) => {
        return {
          url: `/users/monthly-commission-statistics?year=${year}`,
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getOrderStats: builder.query({
      query: ({ type }) => {
        return {
          url: `/users/orders/stats?type=${type}`,
          method: "GET",
        };
      },
      //   providesTags: [tagTypes.],
    }),
    getAllNotifications: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/notifications/my-notifications`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetMonthlyEarningStatsQuery,
  useGetOrderStatsQuery,
  useGetAllNotificationsQuery,
} = overviewApi;
