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

const Login = () => {
    const router = useRouter()

    const [mode, setMode] = useState<"email" | "otp" | "forget">("email")
    const [otpStep, setOtpStep] = useState(false)
    const [username, setUsername] = useState("")

    const [signin, { isLoading: signing }] = useSigninMutation()
    const [forgetPass, { isLoading: forgetting }] = useForgetPassMutation()
    const [sendOTP, { isLoading: sendingOtp }] = useSendOTPMutation()
    const [verifyOTP, { isLoading: verifying }] = useVerifyOTPMutation()

    const { register, handleSubmit, reset } = useForm()

    /* ---------------- EMAIL LOGIN ---------------- */
    const handleEmailLogin = async (data: any) => {
        try {
            await signin(data).unwrap()
            toast.success("Login success")
            router.push("/admin")
            reset()
        } catch {
            toast.error("Invalid credentials")
        }
    }

    /* ---------------- OTP LOGIN ---------------- */
    const handleOtpLogin = async (data: any) => {
        try {
            if (!otpStep) {
                setUsername(data.username)
                await sendOTP({ username: data.username }).unwrap()
                toast.success("OTP sent")
                setOtpStep(true)
                reset()
                return
            }

            await verifyOTP({ username, otp: data.otp }).unwrap()
            toast.success("OTP verified")
            router.push("/admin")
            reset()
        } catch {
            toast.error("OTP failed")
        }
    }

    /* ---------------- FORGET ---------------- */
    const handleForget = async () => {
        try {
            await forgetPass({ username }).unwrap()
            toast.success("Reset link sent")
        } catch {
            toast.error("Failed")
        }
    }

    /* ======================================================= */

    return (
        <div style={styles.bg}>

            {/* glow blobs */}
            <div style={{ ...styles.blob, ...styles.blob1 }} />
            <div style={{ ...styles.blob, ...styles.blob2 }} />

            <div style={styles.card}>

                {/* HEADER */}
                <div className="text-center mb-4">
                    <h3 className="fw-bold mb-1">Welcome Back</h3>
                    <small className="text-muted">
                        {mode === "email" && "Login with email"}
                        {mode === "otp" && "Login with OTP"}
                        {mode === "forget" && "Reset password"}
                    </small>
                </div>

                {/* ================= EMAIL ================= */}
                {mode === "email" && (
                    <form onSubmit={handleSubmit(handleEmailLogin)}>

                        <input
                            {...register("email")}
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email address"
                        />

                        <input
                            {...register("password")}
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                        />

                        <button
                            className="btn btn-primary w-100 mb-3"
                            disabled={signing}
                        >
                            {signing ? "Signing..." : "Login"}
                        </button>

                        <div className="d-flex gap-2 mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-50"
                                onClick={() => setMode("otp")}
                            >
                                OTP Login
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-danger w-50"
                                onClick={() => setMode("forget")}
                            >
                                Forgot?
                            </button>
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark w-100"
                            onClick={() => router.push("/register")}
                        >
                            Create Account
                        </button>
                    </form>
                )}

                {/* ================= OTP ================= */}
                {mode === "otp" && (
                    <form onSubmit={handleSubmit(handleOtpLogin)}>

                        {!otpStep && (
                            <input
                                {...register("username")}
                                className="form-control mb-3"
                                placeholder="Email or Mobile"
                            />
                        )}

                        {otpStep && (
                            <input
                                {...register("otp")}
                                className="form-control mb-3"
                                placeholder="Enter OTP"
                            />
                        )}

                        <button className="btn btn-primary w-100 mb-3">
                            {!otpStep ? "Send OTP" : "Verify OTP"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100"
                            onClick={() => {
                                setMode("email")
                                setOtpStep(false)
                                reset()
                            }}
                        >
                            Back
                        </button>
                    </form>
                )}

                {/* ================= FORGET ================= */}
                {mode === "forget" && (
                    <>
                        <input
                            className="form-control mb-3"
                            placeholder="Email or Mobile"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleForget}
                        >
                            Send Reset Link
                        </button>

                        <button
                            className="btn btn-outline-secondary w-100"
                            onClick={() => setMode("email")}
                        >
                            Back
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Login


/* ================= STYLES ================= */

const styles = {
    bg: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative" as const,
        overflow: "hidden",
        background: "linear-gradient(#2A7B9B,#C7EBD0,#CFCFCF)"
    },

    card: {
        width: "100%",
        maxWidth: 420,
        padding: 30,
        borderRadius: 20,
        backdropFilter: "blur(14px)",
        background: "rgba(207,207,207,100)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.45)"
    },

    blob: {
        position: "absolute" as const,
        borderRadius: "50%",
        filter: "blur(100px)",
        opacity: 0.6
    },

    blob1: {
        width: 350,
        height: 350,
        background: "#3b82f6",
        top: -80,
        left: -80
    },

    blob2: {
        width: 300,
        height: 300,
        background: "#9333ea",
        bottom: -80,
        right: -80
    }
}