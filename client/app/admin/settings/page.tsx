"use client"
import { useGetSettingsQuery, useUpdateSettingMutation } from '@/app/redux/apis/admin.api'
import React from 'react'
import { toast } from 'react-toastify'
const setting = () => {
    const { data } = useGetSettingsQuery()
    const [updateSetting] = useUpdateSettingMutation()
    const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const { checked, name } = e.target
        try {
            if (data) {
                await updateSetting({ ...data.result, [name]: checked }).unwrap()
                toast.success("Setting Update success")
            }
        } catch (error) {
            console.log(error)
            toast.error("unable to update setting")

        }
    }

    return <>
        {
            data && <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header">
                                Notification Setting
                            </div>
                            <div className="card-body">
                                <div className="form-check form-switch">
                                    <input name='email' onChange={handleUpdate} checked={data.result.email as boolean} type="checkbox" className='form-check form-switch' id='email' />
                                    <label className='form-check-label' htmlFor="email"> Email</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input name='sms' onChange={handleUpdate} checked={data.result.sms as boolean} type="checkbox" className='form-check form-switch' id='sms' />
                                    <label className='form-check-label' htmlFor="sms"> sms</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input name='whatsapp' onChange={handleUpdate} checked={data.result.whatsapp as boolean} type="checkbox" className='form-check form-switch' id='whatsapp' />
                                    <label className='form-check-label' htmlFor="whatsapp"> whatsapp</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}

export default setting