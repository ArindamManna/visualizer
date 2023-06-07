import React, { useEffect, useState } from 'react'
import graphStatic from '../assets/static'
import { useLocation } from 'react-router-dom';

function ResultBoard({ stack }) {
    const location = useLocation()
    const { pastStack, fetureStack, currentStatus, visited_edge } = stack ? stack : {};
    const [currentAlgo,setCurrentAlgo]=useState("")
    useEffect(()=>{
        if (location?.pathname=="/bfs") {
            setCurrentAlgo("bfs")
        }else if (location?.pathname=="/dfs") {
            setCurrentAlgo("dfs")
        }
    },[location])


    const { title, description, algo, timeCom, timeComDes } = graphStatic?.[currentAlgo]?graphStatic?.[currentAlgo]:{};
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
                            (currentAlgo=="bfs" || currentAlgo=="dfs") &&
                            <p className='mb-1'>
                                <span className='font-bold'>
                                    Output:
                                </span>
                                <span className='text-blue-400'>
                                    {" "} {currentStatus?.visited?.map((vertex, i, arr) => {
                                        return `${vertex}${i == arr.length - 1 ? "" : ","} `
                                    })}
                                </span>
                            </p>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultBoard