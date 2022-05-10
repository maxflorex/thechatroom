import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// DEFINE A SERVICE USER A BASE URL

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://thechatroombymax.herokuapp.com'
    }),

    endpoints: (builder) => ({
        // CREATING THE USER
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: "POST",
                body: user,
            }),
        }),

        // LOGIN
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: "POST",
                body: user,
            }),
        }),
        // LOGOUT
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/logout',
                method: "Delete",
                body: payload,
            }),
        }),
        // SEND MESSAGE
        sendMessage: builder.mutation({
            query: (message) => ({
                url: '/contact',
                method: 'POST',
                body: message,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useSendMessageMutation } = appApi;
export default appApi;