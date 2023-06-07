import React from 'react'

function Vertex({ data, EdgeCreateEnd, EdgeCreateStart, deleteVertex, stack }) {
    const { x, y, value, index } = data;
    const { pastStack, fetureStack, currentStatus, visited_edge } = stack ? stack : {};
    let current_vertex = currentStatus;
    let currentEdge = visited_edge?.[currentStatus?.visited?.length - 1]

    return (
        <div onDoubleClick={(e) => {

            deleteVertex?.({ index })
        }} className={`z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border-2 ${current_vertex?.visited?.[current_vertex?.visited?.length - 1] == index ? "border-red-500 text-red-400" : current_vertex?.visited == undefined ? "border-gray-400 text-gray-400" : current_vertex?.visited?.indexOf(`${index}`) == -1 ? "border-gray-400 text-gray-400" : currentEdge?.[0] == index ? "border-yellow-400 text-yellow-400" : "border-blue-500 text-blue-500"}  bg-white  hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2`} style={{
            // }} className='z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border border-gray-400 bg-blue-500 animate-ping text-gray-400 hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2' style={{
            top: `${y}px`,
            left: `${x}px`
        }} onMouseDown={(event) => {
            EdgeCreateStart?.({ event, index, point: data })
        }} id={`vertex_${index}`} vertexpoint={`${x}_${y}`} >
            {index}
            {currentEdge?.[0] == index &&
                <span className='absolute h-full w-full top-0 left-0 z-40 bg-yellow-300 animate-ping rounded-full'></span> 
                // current_vertex?.visited?.[current_vertex?.visited?.length - 1] == index && <span className='absolute h-full w-full top-0 left-0 z-40 bg-red-300 animate-ping rounded-full'></span>
                }
            {/* {current_vertex?.visited?.[current_vertex?.visited?.length-1]==index &&<span className='absolute h-full w-full top-0 left-0 z-40 bg-red-300 animate-ping rounded-full'></span>} */}

        </div>
    )
}

export default Vertex