import React, { useState } from 'react'
import Vertex from './Vertex'
import Edge from './Edge'

function GrafEdit() {
    const [vertexList, setVertexList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [isEdgeCreating, setIsEdgeCreating] = useState(null)
    const [creatingEdgeData, setcreatingEdgeData] = useState({ u: {}, v: {} });
    const [currentActiveBtn, setCurrentActiveBtn] = useState('vertex')
    const AddVertex = (e) => {
        console.log(e);
        if (e.target.getAttribute('id') !== "graphEdit" || currentActiveBtn != "vertex") {
            return;
        }
        let obj = {
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
            value: vertexList.length
        }
        setVertexList(prev => ([...prev, obj]))

    }
    const EdgeCreateStart = ({ event, point }) => {
        if (currentActiveBtn != "edge") {
            return
        }
        event.stopPropagation();
        setIsEdgeCreating(point)
        setcreatingEdgeData({ u: point, v: point })
    }
    const EdgeCreating = (e) => {
        e.stopPropagation();
        e.preventDefault()
        let vertexpoint = e.nativeEvent.target.getAttribute('vertexpoint')
        if (isEdgeCreating) {

            if (vertexpoint) {
                let arr = vertexpoint.split('_')
                setcreatingEdgeData(prev => ({
                    ...prev,
                    v: {
                        x: arr[0],
                        y: arr[1]
                    }
                }))
            } else if (e.nativeEvent.target.getAttribute('id') == "graphEdit") {
                setcreatingEdgeData(prev => ({
                    ...prev,
                    v: {
                        x: e.nativeEvent.layerX,
                        y: e.nativeEvent.layerY
                    }
                }))
            }

        }
    }

    const EdgeCreateEnd = ({ event, point }) => {
        event.stopPropagation();
        if (!isEdgeCreating) {
            return
        }
        let vertexpoint = event.nativeEvent.target.getAttribute('vertexpoint')
        if (vertexpoint) {
            let arr = vertexpoint.split('_');
            setcreatingEdgeData(prev => ({ ...prev, v: { x: arr[0], y: arr[1] } }))
            setEdgeList(prev => ([...prev, creatingEdgeData]))
        }
        setIsEdgeCreating(null)

    }


    return (
        <>
            <div className='z-50 fixed h-screen w-screen flex items-center justify-center shrink-0'>
                <div className='h-[50rem] w-3/4 bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative'>
                    <div className='h-full px-4 relative' id='graphEdit' onClick={AddVertex} onMouseMove={EdgeCreating}
                        onMouseUp={(event) => {
                            EdgeCreateEnd({ event })
                        }}  >
                        {vertexList?.map((item, index) => {
                            return <Vertex data={{...item,index}} key={index} EdgeCreateStart={EdgeCreateStart} EdgeCreateEnd={EdgeCreateEnd} />
                        })}
                        {edgeList?.map((item, i) => {
                            return <Edge data={item} key={i} />
                        })}
                        {isEdgeCreating && <Edge data={creatingEdgeData} />}


                    </div>
                    <div className='h-20 shrink-0 items-center border-t border-gray-300 absolute bottom-0 w-full px-4 py-2 flex gap-4'>
                        <button className={`btn ${currentActiveBtn == "vertex" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('vertex') }}>
                            Vertex
                        </button>
                        <button className={`btn ${currentActiveBtn == "edge" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('edge') }}>
                            Edge
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GrafEdit