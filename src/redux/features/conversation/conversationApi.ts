import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createConversation: build.mutation({
      query: (req) => ({
        url: `/chat/create`,
        method: "POST",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),
    getConversationList: build.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/chat/my-chat-list`,
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id, page, limit }) => ({
        url: `/message/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetConversationListQuery,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
