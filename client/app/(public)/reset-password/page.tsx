"use client"
import { useResetPassMutation } from '@/app/redux/apis/auth.api'
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [password, setpassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [resetPass, { isLoading }] = useResetPassMutation()
    const router = useRouter()
    const params = useSearchParams()
    const token = params.get("token")

    console.log(token)
    const handleResetPass = async () => {
        try {
            if (!token) {
                toast.error("token is required")
                return
            }
            if (password !== cpassword) {
                toast.error("password and confirm password should match")
                return

            }
            await resetPass({ password, token: token as string }).unwrap()
            toast.success("password reset success")
            router.push("/login")
        } catch (error) {
            console.log(error)
            toast.error("unable to process reset password")

        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>

                <h4 className="text-center fw-bold mb-4">Reset Password</h4>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleResetPass();
                    }}
                >
                    {/* New Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="form-control"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="form-control"
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ResetPassword