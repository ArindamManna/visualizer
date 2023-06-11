import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import Algo from '../Page/Algo'
import NotFoundPage from '../Page/NotFoundPage'

function AppRouter() {
    return (
        <>
            <Routes>
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