import React from 'react'
import PublicNavabar from '../_component/PublicNavabar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <PublicNavabar></PublicNavabar>
        {children}
    </>
}

export default layout