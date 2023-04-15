import React, { useEffect, useState } from 'react'
import Vertex from './Vertex'
import Edge from './Edge'
import { json } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InputGraph from './Modal/InputGraph';

function GrafEdit() {

    const { currentGraph } = useSelector((state) => {
        const { currentGraph } = state.GlobalSlice;
        return { currentGraph }
    })

    const [GraphDetails, setGraphDetails] = useState({
        Weighted_graph:true,
        Directed_graph:true
    })
    const [vertexList, setVertexList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [isEdgeCreating, setIsEdgeCreating] = useState(null)
    const [creatingEdgeData, setcreatingEdgeData] = useState({ u: {}, v: {} });
    const [currentActiveBtn, setCurrentActiveBtn] = useState('vertex');


    useEffect(() => {
        if (currentGraph.edgeList && currentGraph.vertexList) {
            setEdgeList(currentGraph.edgeList);
            setVertexList(currentGraph.vertexList)
        } else {
            setEdgeList([]);
            setVertexList([])
        }
        if (currentGraph) {
            setGraphDetails(currentGraph)
        }
    }, [currentGraph])
    const AddVertex = (e) => {
        if (e.target.getAttribute('id') !== "graphEdit" || currentActiveBtn != "vertex") {
            return;
        }
        let obj = {
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY
        }
        setVertexList(prev => ([...prev, obj]))

    }
    const EdgeCreateStart = ({ event, point, index }) => {
        if (currentActiveBtn != "edge") {
            return
        }
        event.stopPropagation();
        setIsEdgeCreating(point)
        setcreatingEdgeData({ u: index, v_temp: point })
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
                    v_temp: {
                        x: arr[0],
                        y: arr[1]
                    }
                }))
            } else if (e.nativeEvent.target.getAttribute('id') == "graphEdit") {
                setcreatingEdgeData(prev => ({
                    ...prev,
                    v_temp: {
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
        debugger
        let vertexpoint = event.nativeEvent.target.getAttribute('vertexpoint');
        let id_oflastvertex = event.nativeEvent.target.getAttribute('id');
        let arr = id_oflastvertex.split('_');
        let ind=edgeList.findIndex((item)=>(item.u==creatingEdgeData.u && item.v==arr[1]))

        if (vertexpoint && creatingEdgeData.u != arr[1] && ind == -1) {

            setcreatingEdgeData(prev => ({ ...prev, v: arr[1], v_temp: undefined }))
            // setcreatingEdgeData(prev => ({ ...prev, v: { x: arr[0], y: arr[1] } }))
            // console.log(edgeList.includes(creatingEdgeData));
            setEdgeList(prev => ([...prev, { u: creatingEdgeData.u, v: arr[1] }]))

        }
        setIsEdgeCreating(null)

    }
    function saveGraph() {

        let smallest_x = 0;
        let smallest_y = 0;
        vertexList.forEach(item => {
            smallest_x = Math.min(smallest_x, item.x);
            smallest_y = Math.min(smallest_y, item.y);
        });
        let vertexList_temp = [...vertexList];
        vertexList.forEach((item, i) => {
            vertexList_temp[i].x -= smallest_x;
            vertexList_temp[i].y -= smallest_y;
        });

        let graph = { edgeList, vertexList: vertexList_temp };
        localStorage.setItem('graph', JSON.stringify(graph))
    }
    return (
        <>
            {/* <div className='z-50 fixed h-screen w-screen flex items-center justify-center shrink-0'> */}
            <div className='h-[30rem] w-full bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative'>
                <div className='h-full cursor-crosshair px-4 relative' id='graphEdit' onClick={AddVertex} onMouseMove={EdgeCreating}
                    onMouseUp={(event) => {
                        EdgeCreateEnd({ event })
                    }}  >
                    {vertexList?.map((item, index) => {
                        return <Vertex data={{ ...item, index }} key={index} EdgeCreateStart={EdgeCreateStart} EdgeCreateEnd={EdgeCreateEnd} />
                    })}
                    {edgeList?.map((item, i) => {
                        return <Edge vertexList={vertexList} data={item} key={i} />
                    })}
                    {isEdgeCreating && <Edge vertexList={vertexList} data={creatingEdgeData} />}


                </div>
                <div className='h-20 shrink-0 items-center border-t border-gray-300 absolute bottom-0 w-full px-4 py-2 flex justify-between gap-4'>
                    <div className="left flex gap-4">
                        <button className={`btn ${currentActiveBtn == "vertex" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('vertex') }}>
                            Vertex
                        </button>
                        <button className={`btn ${currentActiveBtn == "edge" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('edge') }}>
                            Edge
                        </button>
                        <button className={`btn ${currentActiveBtn == "InputGraph" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('InputGraph') }}>
                            Input Graph
                        </button>
                    </div>
                    <div className="right">
                        <button onClick={saveGraph} class="bg-indigo-500 space-x-3 items-center flex justify-center text-lg font-medium  hover:bg-indigo-600 rounded-md px-3 py-2 text-white w-full  disabled:bg-indigo-300 disabled:cursor-not-allowed">
                            <span>Save</span>
                        </button>
                    </div>
                </div>

            </div>
                {currentActiveBtn == "InputGraph" &&
                    <InputGraph data={{
                        GraphDetails,
                        setGraphDetails,
                        edgeList,
                        setEdgeList
                    }}  />
                }
            {/* </div> */}
        </>
    )
}

export default GrafEdit