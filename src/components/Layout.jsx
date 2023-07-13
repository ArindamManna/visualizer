import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import GraphList from './Modal/GraphList'
import { useDispatch, useSelector } from 'react-redux'
import { ApiHelperFunction } from '../Api/ApiHelperfunction'
import { updateGlobalState } from '../Redux/GlobalSlice'

function Layout({children}) {
    const {isOpengraphListPopup,token}=useSelector((state)=>{
        const {isOpengraphListPopup,token}=state.GlobalSlice;
        return {isOpengraphListPopup,token}
    })



    // const { token } = useSelector((state) => {
    //     const { token } = state.GlobalSlice;
    //     return { token }
    // })
    const dispatch =useDispatch()


    useEffect(()=>{
        if (token) {
            ApiHelperFunction({ urlPath: "user", method: "get" }).then((res)=>{
                if (res?.email) {
                    dispatch(updateGlobalState({
                        name:res?.name,
                        email:res?.email,
                        savedGraphList:res?.graphList
                    }))
                }
                
            })
        }
    },[token])
    return (
        <>
            <Navbar />
            <main className='flex h-full pt-16'>
                <Sidebar/>
                <div className=' w-full h-full p-4 relative flex flex-col gap-4'>
                    {children}
                    {isOpengraphListPopup && <GraphList/>}
                    
                </div>
            </main>
        </>
    )
}

export default Layout