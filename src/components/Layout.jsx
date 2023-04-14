import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'

function Layout({children}) {
    return (
        <>
            <Navbar />
            <main className='flex h-full pt-16'>
                <Sidebar/>
                <div className=' w-full h-full p-4'>
                    {children}
                </div>
            </main>
        </>
    )
}

export default Layout