import React from 'react'

function Vertex({ data, EdgeCreateEnd, EdgeCreateStart,deleteVertex,stack }) {
    const { x, y, value,index } = data;
    const {pastStack, fetureStack, currentStatus}=stack?stack:{};
    let current_vertex=fetureStack?.[0]

    return (
        <div onDoubleClick={(e)=>{
           
            deleteVertex?.({index})
            }} className={`z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border-2 ${current_vertex?.visited?.[current_vertex?.visited?.length-1]==index?"border-red-500":   current_vertex?.visited?.indexOf(`${index}`)!=-1?"border-blue-500":   "border-gray-400"}  bg-white text-gray-400 hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2`} style={{
            // }} className='z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border border-gray-400 bg-blue-500 animate-ping text-gray-400 hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2' style={{
            top: `${y}px`,
            left: `${x}px`
        }} onMouseDown={(event) => {
            EdgeCreateStart?.({ event,index, point: data })
        }} id={`vertex_${index}`} vertexpoint={`${x}_${y}`} >
            {index}
            {current_vertex?.visited?.[current_vertex?.visited?.length-1]==index &&<span className='absolute h-full w-full top-0 left-0 z-40 bg-red-300 animate-ping rounded-full'></span>}
            {/* {currentStatus?.visited?.[currentStatus?.visited?.length-1]==index &&<span className='absolute h-full w-full top-0 left-0 z-40 bg-red-300 animate-ping rounded-full'></span>} */}
            
        </div>
    )
}

export default Vertex