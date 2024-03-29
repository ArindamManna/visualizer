import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Vertex({ data, EdgeCreateEnd, EdgeCreateStart, deleteVertex, stack }) {
    const location = useLocation()
    const [currentAlgo, setCurrentAlgo] = useState("")
    useEffect(() => {
        if (location?.pathname == "/bfs") {
            setCurrentAlgo("bfs")
        } else if (location?.pathname == "/dfs") {
            setCurrentAlgo("dfs")
        } else if (location.pathname == "/prim") {
            setCurrentAlgo("prim")
        } else if (location.pathname == "/kruskal") {
            setCurrentAlgo("kruskal")
        } else if (location?.pathname == "/dijkstra") {
            setCurrentAlgo("dijkstra")
        }
    }, [location])
    const { x, y, value, index } = data;
    const { pastStack, fetureStack, currentStatus, visited_edge } = stack ? stack : {};
    let currentEdgeIndex; 
    if (currentStatus) {
        currentEdgeIndex=currentStatus?.currentEdgeIndex;
    }else if (pastStack?.[pastStack?.length - 1]) {
        currentEdgeIndex=pastStack?.[pastStack?.length - 1]?.currentEdgeIndex;
    }
    //  = currentStatus ? currentStatus : pastStack?.[pastStack?.length - 1]
    let visited_till_now;
    //  = currentStatus;
    let currentEdge;
    //  = visited_edge?.[currentStatus?.visited?.length - 1]
    if (currentStatus && Object.keys(currentStatus)?.length == 0) {
        visited_till_now = pastStack?.[pastStack?.length - 1]?.visited;
        // currentEdge = visited_edge?.[pastStack?.[pastStack?.length-1]?.visited?.length - 1]
    } else {
        visited_till_now = currentStatus?.visited;
        currentEdge = visited_edge?.[currentStatus?.visited?.length - 1]
    }
    if (currentAlgo == "kruskal") {
        currentEdge = visited_edge?.[currentEdgeIndex]
    }

    return (
        <div onDoubleClick={(e) => {

            deleteVertex?.({ index })
        }} className={`z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border-2 
        ${currentEdge?.[1]   == index && currentAlgo != "kruskal" ? "border-red-500 text-red-400" :
        // ${visited_till_now?.[visited_till_now?.length - 1] == index && currentAlgo != "kruskal" ? "border-red-500 text-red-400" :
                visited_till_now == undefined ? "border-gray-400 text-gray-400" :
                    visited_till_now?.indexOf(`${index}`) == -1 ? "border-gray-400 text-gray-400" :
                        ((currentEdge?.[0] == index) || (currentAlgo == "kruskal" && currentEdge?.[1] == index)) ? "border-yellow-400 text-yellow-400" :
                            "border-blue-500 text-blue-500"}  bg-white  hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2`}
            style={{
                // }} className='z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border border-gray-400 bg-blue-500 animate-ping text-gray-400 hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2' style={{
                top: `${y}px`,
                left: `${x}px`
            }} onMouseDown={(event) => {
                EdgeCreateStart?.({ event, index, point: data })
            }} id={`vertex_${index}`} vertexpoint={`${x}_${y}`} >
            {index}
            {((currentEdge?.[0] == index) || (currentAlgo == "kruskal" && currentEdge?.[1] == index)) &&
                <span className='absolute h-full w-full top-0 left-0 z-40 bg-yellow-300 animate-ping rounded-full'></span>
            }
            {(currentEdge?.[1]  == index && currentAlgo != "kruskal" ) &&
            // {(visited_till_now?.[visited_till_now?.length - 1] == index && currentAlgo != "kruskal" ) &&
                <span className='absolute h-full w-full top-0 left-0 z-40 bg-red-500 animate-ping rounded-full'></span>
            }

        </div>
    )
}

export default Vertex