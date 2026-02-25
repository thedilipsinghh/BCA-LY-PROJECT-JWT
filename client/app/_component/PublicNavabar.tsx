import Link from "next/link"
import React from "react"

const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold fs-4" href="/">
                    Auth<span className="text-primary">System</span>
                </Link>

                {/* Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="nav">

                    {/* left space push */}
                    <ul className="navbar-nav ms-auto align-items-center gap-3">

                        <li className="nav-item">
                            <Link className="nav-link" href="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/register">
                                Register
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="btn btn-primary px-4" href="/login">
                                Login
                            </Link>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default PublicNavbar