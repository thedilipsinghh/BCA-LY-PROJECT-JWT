import Link from "next/link"
import React from "react"

const Home = () => {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center">

            <div className="container text-center">

                {/* Hero */}
                <h1 className="display-4 fw-bold mb-3">
                    Authentication System
                </h1>

                <p className="lead text-muted mb-4">
                    Secure login, OTP verification, password reset and admin dashboard.
                    Built with Next.js + Bootstrap.
                </p>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mb-5">
                    <Link href="/register" className="btn btn-primary btn-lg px-4">
                        Create Account
                    </Link>

                    <Link href="/login" className="btn btn-outline-dark btn-lg px-4">
                        Login
                    </Link>
                </div>

                {/* Feature cards */}
                <div className="row g-4 mt-4">

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100 p-3">
                            <h5 className="fw-bold">Secure Auth</h5>
                            <p className="text-muted small">
                                Email & password authentication with protected routes.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100 p-3">
                            <h5 className="fw-bold">OTP Login</h5>
                            <p className="text-muted small">
                                Login quickly using one-time password verification.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100 p-3">
                            <h5 className="fw-bold">Admin Panel</h5>
                            <p className="text-muted small">
                                Manage users and control access easily.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home