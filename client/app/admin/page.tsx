import React from "react"

const Dashboard = () => {
    return (
        <div className="bg-light min-vh-100 p-4">

            <div className="container">

                {/* Header */}
                <div className="mb-4">
                    <h2 className="fw-bold">Dashboard</h2>
                    <p className="text-muted mb-0">
                        Welcome back. Manage your account from here.
                    </p>
                </div>

                {/* Stats */}
                <div className="row g-4 mb-4">

                    <div className="col-md-4">
                        <div className="card shadow-sm text-center p-4">
                            <h6 className="text-muted">Total Users</h6>
                            <h3 className="fw-bold text-primary">124</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm text-center p-4">
                            <h6 className="text-muted">Active Sessions</h6>
                            <h3 className="fw-bold text-success">18</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm text-center p-4">
                            <h6 className="text-muted">Pending Requests</h6>
                            <h3 className="fw-bold text-danger">3</h3>
                        </div>
                    </div>

                </div>

                {/* Quick actions */}
                <div className="card shadow-sm p-4">
                    <h5 className="mb-3 fw-semibold">Quick Actions</h5>

                    <div className="d-flex flex-wrap gap-3">
                        <button className="btn btn-primary">Add User</button>
                        <button className="btn btn-outline-secondary">View Users</button>
                        <button className="btn btn-outline-danger">Logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard