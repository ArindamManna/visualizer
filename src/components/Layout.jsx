import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import GraphList from './Modal/GraphList'
import { useSelector } from 'react-redux'

function Layout({children}) {
    const {isOpengraphListPopup}=useSelector((state)=>{
        const {isOpengraphListPopup}=state.GlobalSlice;
        return {isOpengraphListPopup}
    })
    return (
        <>
            <Navbar />
            <main className='flex h-full pt-16'>
                <Sidebar/>
                <div className=' w-full h-full p-4 relative'>
                    {children}
                    {isOpengraphListPopup && <GraphList/>}
                    
                </div>
            </main>
        </>
    )
}

export default Layout