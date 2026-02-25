"use client"
import Link from "next/link"
import React, { useReducer } from "react"
import { useSignoutMutation } from "../redux/apis/auth.api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAppSelector } from "../redux/store"

const AdminNavbar = () => {
    const router = useRouter()
    const [signout] = useSignoutMutation()
    const { admin } = useAppSelector(state => state.auth)
    const handlelogout = async () => {
        try {
            await signout().unwrap()
            router.refresh()
            toast.success("logout success")
        } catch (error) {
            console.log(error)
            toast.error("logout fail")

        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid px-4">

                {/* Brand */}
                <Link className="navbar-brand fw-bold fs-5" href="/admin">
                    Admin<span className="text-primary">Panel</span>
                </Link>

                {/* Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="adminNav">

                    {/* Left menu */}
                    <ul className="navbar-nav me-auto ms-3">

                        <li className="nav-item">
                            <Link className="nav-link" href="/admin">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/admin/users">
                                Users
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/admin/settings">
                                Settings
                            </Link>
                        </li>

                    </ul>

                    {/* Right profile dropdown */}
                    <div className="dropdown">

                        <button
                            className="btn btn-outline-light dropdown-toggle px-3"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            👤 {admin && admin.result.name}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end shadow">

                            <li>
                                <Link className="dropdown-item" href="/admin/profile">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <Link className="dropdown-item" href="/admin/setting">
                                    Settings
                                </Link>
                            </li>

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <button onClick={handlelogout} className="dropdown-item text-danger fw-semibold">
                                    Logout
                                </button>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar