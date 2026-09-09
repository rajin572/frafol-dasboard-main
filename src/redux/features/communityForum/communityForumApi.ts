import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const communityForumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunity: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/community/admin`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.community, tagTypes?.interactionManagement],
    }),
    deleteCommunity: builder.mutation({
      query: (req) => ({
        url: `/community/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.community, tagTypes?.interactionManagement],
    }),
  }),
});

export const { useGetCommunityQuery, useDeleteCommunityMutation } =
  communityForumApi;
