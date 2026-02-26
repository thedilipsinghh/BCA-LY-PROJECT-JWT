"use client"

import { useResetPassMutation } from '@/app/redux/apis/auth.api'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    const [resetPass, { isLoading }] = useResetPassMutation()

    const router = useRouter()
    const params = useSearchParams()
    const token = params.get("token")

    const handleResetPass = async () => {
        try {
            if (!token) return toast.error("token is required")
            if (password !== cpassword) return toast.error("password mismatch")

            await resetPass({ password, token }).unwrap()

            toast.success("password reset success")
            router.push("/login")
        } catch {
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
                            onChange={(e) => setPassword(e.target.value)}
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