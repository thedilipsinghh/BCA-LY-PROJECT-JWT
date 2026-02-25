import React from 'react'
import AdminNavbar from '../_component/AdminNavbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <AdminNavbar></AdminNavbar>
        {children}
    </>
}

export default layout 