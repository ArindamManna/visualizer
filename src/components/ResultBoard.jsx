import React, { useEffect, useState } from 'react'
import graphStatic from '../assets/static'
import { useLocation } from 'react-router-dom';

function ResultBoard({ stack }) {
    const location = useLocation()
    const { pastStack, fetureStack, currentStatus, visited_edge, source } = stack ? stack : {};
    let visited_till_now;
    if (Object.keys(currentStatus)?.length == 0) {
        visited_till_now = pastStack?.[pastStack?.length - 1]?.visited;
    } else {
        visited_till_now = currentStatus?.visited;
    }

    const { distances, minDistancePaths } = pastStack?.[pastStack?.length - 1] ? pastStack[pastStack?.length - 1] : {}
    const [currentAlgo, setCurrentAlgo] = useState("")
    useEffect(() => {
        if (location?.pathname == "/bfs") {
            setCurrentAlgo("bfs")
        } else if (location?.pathname == "/dfs") {
            setCurrentAlgo("dfs")
        } else if (location?.pathname == "/dijkstra") {
            setCurrentAlgo("dijkstra")
        }
    }, [location])


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