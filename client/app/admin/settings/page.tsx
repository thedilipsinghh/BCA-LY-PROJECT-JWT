// "use client"
// import { useGetSettingsQuery, useUpdateSettingMutation } from '@/app/redux/apis/admin.api'
// import React from 'react'
// import { toast } from 'react-toastify'
// const setting = () => {
//     const { data } = useGetSettingsQuery()
//     const [updateSetting] = useUpdateSettingMutation()
//     const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
//         const { checked, name } = e.target
//         try {
//             if (data) {
//                 await updateSetting({ ...data.result, [name]: checked }).unwrap()
//                 toast.success("Setting Update success")
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error("unable to update setting")

//         }
//     }

//     return <>
//         {
//             data && <div className="container">
//                 <div className="row">
//                     <div className="col-sm-6 offset-sm-3">
//                         <div className="card">
//                             <div className="card-header">
//                                 Notification Setting
//                             </div>
//                             <div className="card-body">
//                                 <div className="form-check form-switch">
//                                     <input name='email' onChange={handleUpdate} checked={data.result.email as boolean} type="checkbox" className='form-check form-switch' id='email' />
//                                     <label className='form-check-label' htmlFor="email"> Email</label>
//                                 </div>
//                                 <div className="form-check form-switch">
//                                     <input name='sms' onChange={handleUpdate} checked={data.result.sms as boolean} type="checkbox" className='form-check form-switch' id='sms' />
//                                     <label className='form-check-label' htmlFor="sms"> sms</label>
//                                 </div>
//                                 <div className="form-check form-switch">
//                                     <input name='whatsapp' onChange={handleUpdate} checked={data.result.whatsapp as boolean} type="checkbox" className='form-check form-switch' id='whatsapp' />
//                                     <label className='form-check-label' htmlFor="whatsapp"> whatsapp</label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         }
//     </>
// }

// export default setting

"use client"

import React, { useEffect, useState } from "react"
import {
    useGetSettingsQuery,
    useUpdateSettingMutation,
} from "@/app/redux/apis/admin.api"
import { toast } from "react-toastify"

type Setting = {
    _id: string
    email: boolean
    sms: boolean
    whatsapp: boolean
}

const SettingsPage = () => {
    const { data, isLoading, isError } = useGetSettingsQuery()
    const [updateSetting, { isLoading: saving }] = useUpdateSettingMutation()

    const [localSettings, setLocalSettings] = useState<Setting | null>(null)

    useEffect(() => {
        if (data?.result) {
            setLocalSettings(data.result as Setting)
        }
    }, [data])

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading settings</p>
    if (!localSettings) return null

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target

        setLocalSettings(prev => ({
            ...prev!,
            [name]: checked,
        }))
    }

    const handleSave = async () => {
        try {
            await updateSetting(localSettings).unwrap()
            toast.success("Updated")
        } catch {
            toast.error("Failed")
        }
    }

    return (
        <div className="container py-5 col-md-5">

            <div className="card shadow-lg p-4">

                <h5 className="mb-4">🔔 Notification Settings</h5>

                {["email", "sms", "whatsapp"].map(key => (
                    <div
                        key={key}
                        className="d-flex justify-content-between align-items-center mb-3"
                    >
                        <span className="text-capitalize">{key}</span>

                        <input
                            type="checkbox"
                            name={key}
                            checked={localSettings[key as keyof Setting] as boolean}
                            onChange={handleToggle}
                        />
                    </div>
                ))}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn btn-primary mt-3"
                >
                    {saving ? "Saving..." : "Save"}
                </button>

            </div>
        </div>
    )
}

export default SettingsPage