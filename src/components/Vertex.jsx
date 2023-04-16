import React from 'react'

function Vertex({ data, EdgeCreateEnd, EdgeCreateStart,deleteVertex }) {
    const { x, y, value,index } = data;

    return (
        <div onDoubleClick={(e)=>{
            deleteVertex({index})
        }} className='z-50 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full border border-gray-400 bg-white text-gray-400 hover:text-purple-400 hover:border-purple-400 absolute -translate-x-1/2 -translate-y-1/2' style={{
            top: `${y}px`,
            left: `${x}px`
        }} onMouseDown={(event) => {
            EdgeCreateStart({ event,index, point: data })
        }} id={`vertex_${index}`} vertexpoint={`${x}_${y}`} >
            {index}
        </div>
    )
}

export default Vertex