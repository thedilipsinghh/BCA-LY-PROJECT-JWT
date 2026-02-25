"use client"

import { useSignupMutation } from "@/app/redux/apis/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { toast } from "react-toastify"

const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    mobile: z.string().min(10, "Invalid mobile"),
    password: z.string().min(6, "Minimum 6 characters")
})

type UserType = z.infer<typeof userSchema>

export default function Register() {
    const [signup] = useSignupMutation()
    const [loading, setLoading] = useState(false)

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<UserType>({
        resolver: zodResolver(userSchema)
    })

    const handleRegister = async (data: UserType) => {
        try {
            setLoading(true)
            await signup(data).unwrap()
            reset()
            toast.success("Registered successfully")
        } catch (err) {
            console.error(err)
            toast.error("Registration failed due to already email mobile exist")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>

                <h3 className="text-center mb-4 fw-bold">Create Account</h3>

                <form onSubmit={handleSubmit(handleRegister)}>

                    {/* Name */}
                    <div className="mb-3">
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Full Name"
                            className="form-control"
                        />
                        {errors.name && (
                            <small className="text-danger">{errors.name.message}</small>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Email"
                            className="form-control"
                        />
                        {errors.email && (
                            <small className="text-danger">{errors.email.message}</small>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="mb-3">
                        <input
                            {...register("mobile")}
                            type="tel"
                            placeholder="Mobile Number"
                            className="form-control"
                        />
                        {errors.mobile && (
                            <small className="text-danger">{errors.mobile.message}</small>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            className="form-control"
                        />
                        {errors.password && (
                            <small className="text-danger">{errors.password.message}</small>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="btn btn-primary w-100"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>

                </form>
            </div>
        </div>
    )
}