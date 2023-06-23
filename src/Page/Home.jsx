import React, { Children, useEffect } from 'react'
import GrafEdit from '../components/GrafEdit'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
// import Signup from './Signup';
import { updateGlobalState } from '../Redux/GlobalSlice';
import { ApiHelperFunction } from '../Api/ApiHelperfunction';
import Login from './Login';

function Home() {
    const { token } = useSelector((state) => {
        const { token } = state.GlobalSlice;
        return { token }
    })
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
            {token ? <Layout> <GrafEdit /></Layout> : <Login />}
        </>
    )
}

export default Home