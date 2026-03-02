import { SETTING, SETTING_RESPONSE } from "@/app/types/Admin"
import { APP_URL } from "@/constant/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "admiApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/admin`,
        credentials: "include"
    }),
    tagTypes: ["tagName"],
    endpoints: (builder) => {
        return {
            getSettings: builder.query<SETTING_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/setting",
                        method: "GET"
                    }
                },
                providesTags: ["tagName"]
            }),
            UpdateSetting: builder.mutation<void, SETTING>({
                query: settingData => {
                    return {
                        url: "/setting/" + settingData._id,
                        method: "PUT",
                        body: settingData
                    }
                },
                invalidatesTags: ["tagName"]
            }),

        }
    }
})

export const { useGetSettingsQuery, useUpdateSettingMutation } = adminApi
