import { LOGIN_RESPONSE, OTP, RESET_PASS, User } from "@/app/types/User"
import { APP_URL } from "@/constant/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/auth`,
        credentials: "include"
    })
    ,
    tagTypes: [],
    endpoints: (builder) => {
        return {
            signup: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            signin: builder.mutation<LOGIN_RESPONSE, User>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            signout: builder.mutation<void, void>({
                query: userData => {
                    return {
                        url: "/signout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                }
            }),

            sendOTP: builder.mutation<void, OTP>({
                query: userData => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                        body: userData
                    }
                },
            }),

            verifyOTP: builder.mutation<void, OTP>({
                query: userData => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            forgetPass: builder.mutation<void, OTP>({
                query: userData => {
                    return {
                        url: "/forget-password",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            resetPass: builder.mutation<void, RESET_PASS>({
                query: userData => {
                    return {
                        url: "/reset-password",
                        method: "POST",
                        body: userData,
                        params: { token: userData.token }

                    }
                },
            }),

        }
    }
})

export const { useSigninMutation, useSignoutMutation, useSignupMutation, useSendOTPMutation, useVerifyOTPMutation, useResetPassMutation, useForgetPassMutation } = authApi
