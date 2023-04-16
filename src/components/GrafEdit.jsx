import React, { useEffect, useMemo, useState } from 'react'
import Vertex from './Vertex'
import Edge from './Edge'
import { json } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputGraph from './Modal/InputGraph';
import { updateGlobalState } from '../Redux/GlobalSlice';

function GrafEdit() {

    const { currentGraph ,savedGraphList} = useSelector((state) => {
        const { currentGraph ,savedGraphList} = state.GlobalSlice;
        return { currentGraph,savedGraphList }
    })
    const dispatch=useDispatch()

    const [GraphDetails, setGraphDetails] = useState({
        Weighted_graph: "true",
        Directed_graph: "true",
        name: ""
    })
    const [vertexList, setVertexList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [isEdgeCreating, setIsEdgeCreating] = useState(null)
    const [creatingEdgeData, setcreatingEdgeData] = useState({ u: {}, v: {} });
    const [currentActiveBtn, setCurrentActiveBtn] = useState('vertex');

    function makeGraphUndirected() {
        if (GraphDetails.Directed_graph == "false") {
            let edgeList_temp = [...edgeList];

            edgeList.forEach((edge) => {
                let ind = edgeList_temp.findIndex((item) => (item.u == edge.v && item.v == edge.u))
                if (ind == -1) {
                    edgeList_temp.push({
                        u: edge.v,
                        v: edge.u
                    })
                }
            })
            setEdgeList(edgeList_temp)
        }
    }
    useEffect(() => {
        if (GraphDetails.Weighted_graph == "false") {
            setEdgeList(prev => {
                let prev_temp = [...prev];
                prev.forEach((item, i) => {
                    prev_temp[i].w = undefined
                });

                return prev_temp
            })
        }
        makeGraphUndirected()
    }, [GraphDetails])
    useEffect(() => {
        if (currentGraph?.edgeList && currentGraph?.vertexList) {
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
    //#region create edge
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
        let vertexpoint = event.nativeEvent.target.getAttribute('vertexpoint');
        let id_oflastvertex = event.nativeEvent.target.getAttribute('id');
        let arr = id_oflastvertex.split('_');
        let ind = edgeList.findIndex((item) => (item.u == creatingEdgeData.u && item.v == arr[1]))

        if (vertexpoint && creatingEdgeData.u != arr[1] && ind == -1) {

            setcreatingEdgeData(prev => ({ ...prev, v: arr[1], v_temp: undefined }))
            // setcreatingEdgeData(prev => ({ ...prev, v: { x: arr[0], y: arr[1] } }))
            // console.log(edgeList.includes(creatingEdgeData));
           
            setEdgeList(prev => {
                let prev_temp = [...prev];
                let edge = { u: creatingEdgeData.u, v: arr[1] };
                let ind = prev_temp.findIndex((item) => (item.u == edge.v && item.v == edge.u));
                if (GraphDetails.Directed_graph == "false" && ind == -1) {
                    return [...prev, edge, { u: edge.v, v: edge.u }];
                }else{
                    return [...prev, edge];
                }
            })

        }
        setIsEdgeCreating(null)

    }
    //#endregion 

    function saveGraph() {

        let smallest_x = 0;
        let smallest_y = 0;
        vertexList.forEach(item => {
            smallest_x = Math.min(smallest_x, item.x);
            smallest_y = Math.min(smallest_y, item.y);
        });
        let vertexList_temp = [...vertexList];
        vertexList.forEach((item, i) => {
            vertexList_temp[i]={
                ...vertexList_temp[i],
                x:vertexList_temp[i].x - smallest_x,
                y:vertexList_temp[i].y - smallest_y
            }
            // vertexList_temp[i].x -= smallest_x;
            // vertexList_temp[i].y -= smallest_y;
        });

        let adjacent_matrix=new Array(vertexList.length)
        adjacent_matrix.fill([])
        edgeList.forEach((edge)=>{
            adjacent_matrix[edge.u].push([edge.v,edge.v]);
        })
       
        let graph = { edgeList, vertexList: vertexList_temp ,adjacent_matrix,...GraphDetails};
        //#region  backend api change
        
        dispatch(updateGlobalState({
            savedGraphList:[...savedGraphList,graph]
        }))
        localStorage.setItem('savedGraphList', JSON.stringify([...savedGraphList,graph]))
        //#endregion
    }

    //#region delete edge and vertex
    function removeEdgeConectedwithVertex({index,edgeList_temp}) { // index is the index of deleted vertex and edgelist_temp for perfome delete opration on this
        let u_ind=edgeList_temp.findIndex((item) => (item.u == index ))
        let v_ind=edgeList_temp.findIndex((item) => ( item.v == index))
        if (u_ind==-1 && v_ind==-1) {
            return edgeList_temp;
        }
        if (u_ind!=-1) {
            edgeList_temp.splice(u_ind,1);
            v_ind=edgeList_temp.findIndex((item) => ( item.v == index))
        }
        if (v_ind!=-1) {
            edgeList_temp.splice(v_ind,1);
        }
      return  removeEdgeConectedwithVertex({index,edgeList_temp})

    }
    const deleteVertex = ({ index }) => {
        // delete connected edge with vertex no index
        let edgeList_temp= removeEdgeConectedwithVertex({index,edgeList_temp:[...edgeList]})
        setEdgeList(edgeList_temp)
        // delete vertex
        setVertexList(prev => {
            let prev_temp = [...prev];
            prev_temp.splice(index, 1)
            return prev_temp
        })
    }
    const deleteEdge = ({ index }) => {
        setEdgeList(prev => {
            let prev_temp = [...prev];
            // if graph is undirected then delete both forward and backward edge
            if (GraphDetails.Directed_graph == "false") {
                let edge = prev_temp[index];
                prev_temp.splice(index, 1);
                let ind = prev_temp.findIndex((item) => (item.u == edge.v && item.v == edge.u))
                prev_temp.splice(ind, 1);
            } else {

                prev_temp.splice(index, 1)
            }
            return prev_temp
        })
    }
    //#endregion

    return (
        <>
            {/* <div className='z-50 fixed h-screen w-screen flex items-center justify-center shrink-0'> */}
            <div className='h-[30rem] w-full bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative'>
                <div className='h-full cursor-crosshair px-4 relative' id='graphEdit' onClick={AddVertex} onMouseMove={EdgeCreating}
                    onMouseUp={(event) => {
                        EdgeCreateEnd({ event })
                    }}  >
                    {vertexList?.map((item, index) => {
                        return <Vertex data={{ ...item, index }} deleteVertex={deleteVertex} key={index} EdgeCreateStart={EdgeCreateStart} EdgeCreateEnd={EdgeCreateEnd} />
                    })}
                    {edgeList?.map((item, i) => {
                        return <Edge vertexList={vertexList} deleteEdge={deleteEdge} data={{ ...item, index: i }} key={i} />
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
                }} />
            }
            {/* </div> */}
        </>
    )
}

export default GrafEdit