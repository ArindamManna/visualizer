import React, { useEffect, useState } from 'react'
import graphStatic from '../assets/static'
import { useLocation } from 'react-router-dom';

function ResultBoard({ stack }) {
    const location = useLocation()
    const { pastStack, fetureStack, currentStatus, visited_edge, source } = stack ? stack : {};

    let visited_till_now;
    let key;
    let currentEdgeIndex;
    if (Object.keys(currentStatus)?.length == 0) {
        visited_till_now = pastStack?.[pastStack?.length - 1]?.visited;
        key = pastStack?.[pastStack?.length - 1]?.key;
        currentEdgeIndex = pastStack?.[pastStack?.length - 1]?.currentEdgeIndex;
    } else {
        visited_till_now = currentStatus?.visited;
        key = currentStatus?.key;
        currentEdgeIndex = currentStatus?.currentEdgeIndex;
    }


    const { distances, minDistancePaths } = pastStack?.[pastStack?.length - 1] ? pastStack[pastStack?.length - 1] : {}
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
        setMinSpanningTreeWeight(Infinity)
    }, [location])

    const [minSpanningTreeWeight, setMinSpanningTreeWeight] = useState(Infinity)
    useEffect(() => {
        if (currentAlgo == "prim" && Array.isArray(visited_till_now) && Array.isArray(key)) {
            // debugger
            let weight = 0;
            visited_till_now?.forEach((vertex, i) => {
                weight += Number(key[vertex])
            })
            setMinSpanningTreeWeight(weight)
        }
    }, [visited_till_now, key])
    useEffect(() => {
        if (currentAlgo == "kruskal" && currentEdgeIndex != null && currentEdgeIndex != undefined && Array.isArray(visited_edge)) {
            let weight = 0;
            visited_edge.forEach(([x, y, z], i) => {
                if (i <= currentEdgeIndex) {
                    weight += Number(z)
                }
            });
            setMinSpanningTreeWeight(weight)
        }
    }, [currentEdgeIndex])


    const { title, description, algo, timeCom, timeComDes } = graphStatic?.[currentAlgo] ? graphStatic?.[currentAlgo] : {};
    return (
        <>
            <div className='h-1/2 w-full p-4 flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative overflow-hidden'>
                <h3 className='text-center font-bold underline text-blue-400'>{title}</h3>
                <div className='mt-4 flex w-full h-full border-gray-400 text-gray-500 text-sm overflow-hidden'>
                    <div className='w-1/2 border-r border-gray-400 h-full overflow-auto pr-4'>
                        <p className='mb-1'>
                            <span className='font-bold'>
                                Description:
                            </span>
                            {" "} {description}
                        </p>
                        <p >
                            <span className='font-bold'>
                                Time Complexity:
                            </span>
                            {" "} {timeCom}
                        </p>
                        <p className='mb-1'>
                            {timeComDes}
                        </p>

                        <p className='text-center  font-bold underline'>Algorithm</p>
                        {
                            algo?.map((step, i) => {
                                return <p>
                                    <span className='font-bold'>
                                        Step {i + 1}:
                                    </span>
                                    {" "} {step}
                                </p>
                            })
                        }
                    </div>
                    <div className='w-1/2 h-full overflow-auto pl-4'>
                        {
                            // prim
                            (currentAlgo == "kruskal") &&
                            <>


                                <p className='mb-1'>
                                    <span className='font-bold'>
                                        Min Spanning Tree:
                                    </span>
                                    <span className='text-blue-400'>
                                        {currentEdgeIndex != null && currentEdgeIndex != undefined && visited_edge?.map(([x, y], i) => {
                                            if (i <= currentEdgeIndex) {
                                                return `${x}, ${y} | `;
                                            }
                                            return;
                                        })}
                                        {/* {" "} {visited_till_now?.map((vertex, i, arr) => {
                                            return `${vertex}${i == arr.length - 1 ? "" : ","} `
                                        })} */}
                                    </span>
                                </p>
                                <p className='mb-1'>
                                    <span className='font-bold'>
                                        Total Weight:
                                    </span>
                                    <span className='text-blue-400'>
                                        {" "} {minSpanningTreeWeight}
                                    </span>
                                </p>
                            </>
                        }
                        {
                            // prim
                            (currentAlgo == "prim") &&
                            <>


                                <p className='mb-1'>
                                    <span className='font-bold'>
                                        Min Spanning Tree:
                                    </span>
                                    <span className='text-blue-400'>
                                        {" "} {visited_till_now?.map((vertex, i, arr) => {
                                            return `${vertex}${i == arr.length - 1 ? "" : ","} `
                                        })}
                                    </span>
                                </p>
                                <p className='mb-1'>
                                    <span className='font-bold'>
                                        Total Weight:
                                    </span>
                                    <span className='text-blue-400'>
                                        {" "} {minSpanningTreeWeight}
                                    </span>
                                </p>
                            </>
                        }
                        {
                            // bfs or dfs
                            (currentAlgo == "bfs" || currentAlgo == "dfs") &&
                            <p className='mb-1'>
                                <span className='font-bold'>
                                    Output:
                                </span>
                                <span className='text-blue-400'>
                                    {" "} {visited_till_now?.map((vertex, i, arr) => {
                                        return `${vertex}${i == arr.length - 1 ? "" : ","} `
                                    })}
                                </span>
                            </p>
                        }
                        {
                            (currentAlgo == "dijkstra") &&
                            <div className='w-full '>
                                <p className='mb-1'>
                                    <span className='font-bold'>
                                        Source:
                                    </span>
                                    <span className='text-blue-400'>
                                        {" "}{source}
                                    </span>
                                </p>
                                <div className='w-full'>

                                    <div className='flex w-full border rounded '>
                                        <div className='w-2/12 border-r p-2 flex items-center justify-center'>
                                            Vertex
                                        </div>
                                        <div className='w-3/12 border-r p-2 flex items-center justify-center'>
                                            Min Distance
                                        </div>
                                        <div className='w-7/12 p-2 flex items-center justify-center'>
                                            Path
                                        </div>
                                    </div>

                                    {distances?.map((dis, i) => {
                                        return <div key={i} className='flex w-full border rounded '>
                                            <div className='w-2/12 border-r p-2 flex items-center justify-center'>
                                                {i}
                                            </div>
                                            <div className='w-3/12 border-r p-2 flex items-center justify-center'>
                                                {dis}
                                            </div>
                                            <div className='w-7/12 p-2 flex items-center justify-center'>
                                                {source} {minDistancePaths?.[i]?.map(([u, v]) => {
                                                    return `, ${v}`
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultBoard