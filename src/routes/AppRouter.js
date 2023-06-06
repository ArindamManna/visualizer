import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import BFS from '../Page/BFS'

function AppRouter() {
    return (
        <>
            <Routes>
                <Route exact={true} path="/" element={<Home />} />
                <Route exact={true} path="/bfs" element={<BFS />} />
            </Routes>
        </>
    )
}

export default AppRouter