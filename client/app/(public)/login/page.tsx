"use client"

import {
    useForgetPassMutation,
    useSendOTPMutation,
    useSigninMutation,
    useVerifyOTPMutation
} from "@/app/redux/apis/auth.api"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { any } from "zod"
import { APP_URL } from "@/constant/config"

const Login = () => {
    const router = useRouter()

    const [mode, setMode] = useState("email") // "email" | "otp"
    const [username, setUsername] = useState("")

    const [signin] = useSigninMutation()
    const [forgetPass] = useForgetPassMutation()
    const [sendOTP, { isSuccess, isLoading }] = useSendOTPMutation()
    const [verifyOTP] = useVerifyOTPMutation()

    const { register, handleSubmit, reset } = useForm()

    // -----------------------
    // Email Login
    // -----------------------
    const handleEmailLogin = async (data: any) => {
        try {
            await signin(data).unwrap()
            toast.success("Login success")
            router.push("/admin")
            reset()
        } catch {
            toast.error("Invalid cred entials")
        }
    }

    // -----------------------
    // OTP Login
    // -----------------------
    const handleOtpLogin = async (data: any) => {
        try {
            if (isSuccess) {
                await verifyOTP(data).unwrap()
                toast.success("OTP verified")
                router.push("/admin")
            } else {
                await sendOTP(data).unwrap()
                toast.success("OTP sent")
            }
            reset()
        } catch {
            toast.error("OTP failed")
        }
    }

    // -----------------------
    // Forget password
    // -----------------------
    const handleForget = async () => {
        try {
            await forgetPass({ username }).unwrap()
            toast.success("Reset link sent")
        } catch {
            toast.error("Failed")
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">

            <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>

                <h4 className="text-center fw-bold mb-4">
                    {mode === "email" ? "Login" : "Login with OTP"}
                </h4>

                {/* ---------------- EMAIL LOGIN ---------------- */}
                {mode === "email" && (
                    <form onSubmit={handleSubmit(handleEmailLogin)}>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                        />

                        <input
                            {...register("password")}
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                        />

                        <button className="btn btn-primary w-100 mb-3">
                            Login
                        </button>

                        <div className="d-flex justify-content-between mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setMode("otp")}
                            >
                                Use OTP
                            </button>

                            <button
                                type="button"
                                className="btn btn-link btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#forgetModal"
                            >
                                Forgot?
                            </button>
                        </div>

                        {/* ── Google OAuth ── */}
                        <div className="text-center text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                            or
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                            onClick={() => { window.location.href = `${APP_URL}/api/auth/google` }}
                        >
                            {/* Google "G" SVG icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
                                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.2 33.2 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6.1-6.1C34.4 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" />
                                <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3 0 5.7 1.1 7.8 2.9l6.1-6.1C34.4 6.2 29.5 4 24 4 16.1 4 9.3 8.5 6.3 14.7z" />
                                <path fill="#FBBC05" d="M24 44c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.5 35.6 26.9 36.5 24 36.5c-5.6 0-10.3-3.8-11.8-9l-7 5.4C8.5 39.4 15.7 44 24 44z" />
                                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.8 2.2-2.2 4.1-4.1 5.5l6.5 5.3C41.8 36.4 44.5 30.7 44.5 24c0-1.3-.1-2.7-.2-4z" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>
                )}

                {/* ---------------- OTP LOGIN ---------------- */}
                {mode === "otp" && (
                    <form onSubmit={handleSubmit(handleOtpLogin)}>

                        {isSuccess ? (
                            <input
                                {...register("otp")}
                                className="form-control mb-3"
                                placeholder="Enter OTP"
                            />
                        ) : (
                            <input
                                {...register("username")}
                                className="form-control mb-3"
                                placeholder="Email or Mobile"
                            />
                        )}

                        <button disabled={isLoading} className="btn btn-primary w-100 mb-3">
                            {isSuccess ? "Verify OTP" : "Send OTP"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100"
                            onClick={() => setMode("email")}
                        >
                            Back to Email Login
                        </button>
                    </form>
                )}
            </div>

            {/* --------------- Forget Modal --------------- */}
            <div className="modal fade" id="forgetModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">

                        <h5 className="text-center mb-3">Reset Password</h5>

                        <input
                            className="form-control mb-3"
                            placeholder="Email or mobile"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100"
                            onClick={handleForget}
                            data-bs-dismiss="modal"
                        >
                            Send Link
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login