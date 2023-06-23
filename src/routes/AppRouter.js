import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import Algo from '../Page/Algo'
import NotFoundPage from '../Page/NotFoundPage'
import Signup from '../Page/Signup'
import { useSelector } from 'react-redux'

function AppRouter() {
    const { token } = useSelector((state) => {
        const { token } = state.GlobalSlice;
        return { token }
    })
    return (
        <>
            <Routes>
                {!token && <Route exact={true} path="/signup" element={<Signup />} />}
                <Route exact={true} path="/" element={<Home />} />

                <Route exact={true} path="/bfs" element={<Algo />} />
                <Route exact={true} path="/dfs" element={<Algo />} />
                <Route exact={true} path="/prim" element={<Algo />} />
                <Route exact={true} path="/kruskal" element={<Algo />} />
                <Route exact={true} path="/floyd" element={<Algo />} />
                <Route exact={true} path="/dijkstra" element={<Algo />} />
                <Route exact={true} path="/*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default AppRouter