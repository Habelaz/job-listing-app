import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const opportunityApi = createApi({
  reducerPath: "opportunityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    getAllJobs: builder.query({
      query: () => ({
        url: "opportunities/search",
      }),
    }),
    // signIn: builder.mutation({
    //   query: (body) => ({
    //     url: "/login",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "verify-email",
        method: "POST",
        body,
      }),
    }),
    getBookmarks: builder.query({
        query:({token}) => ({
            url:"bookmarks",
            headers:{
              Authorization :`Bearer ${token}` 
            }
        })
    }),
    createBookmark: builder.mutation({
      query: ({ eventId, token }) => ({
        url: `bookmarks/${eventId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: {},
      }),
    }),
    unbookmark: builder.mutation({
      query: ({ eventId, token }) => ({
        url: `bookmarks/${eventId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }),
    }),
    
  }),
});

export const {
  useRegisterUserMutation,
  useGetAllJobsQuery,
//   useSignInMutation,
  useVerifyEmailMutation,
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useUnbookmarkMutation,
} = opportunityApi;
