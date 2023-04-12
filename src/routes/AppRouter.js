import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'

function AppRouter() {
    return (
        <>
            <Routes>
                <Route exact={true} path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default AppRouter