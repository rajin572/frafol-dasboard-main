import { baseApi } from "../../api/baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribe: builder.query({
      query: ({ page, limit }) => ({
        url: `/subscribe`,
        method: "GET",
        params: { page, limit },
      }),
    }),
    sendEmail: builder.mutation({
      query: (req) => ({
        url: `/subscribe/send-email`,
        method: "POST",
        body: req.body,
      }),
    }),
  }),
});

export const { useGetSubscribeQuery, useSendEmailMutation } = subscribeApi;
