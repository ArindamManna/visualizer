import React, { useEffect, useMemo, useState } from 'react'
import Vertex from './Vertex'
import Edge from './Edge'
import { json } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputGraph from './Modal/InputGraph';
import { updateGlobalState } from '../Redux/GlobalSlice';

function GraphShow() {

    const { currentGraph, savedGraphList, pastStack, fetureStack, currentStatus } = useSelector((state) => {
        const { currentGraph, savedGraphList, pastStack } = state.GlobalSlice;
        return { currentGraph, savedGraphList, pastStack }
    })
    const dispatch = useDispatch()

    const [GraphDetails, setGraphDetails] = useState({
        Weighted_graph: "true",
        Directed_graph: "true",
        name: ""
    })
    const [vertexList, setVertexList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [currentActiveBtn, setCurrentActiveBtn] = useState('vertex');
    const [stack, setStack] = useState({
        pastStack: [],
        fetureStack: [],
        currentStatus: {

        },
        visited_edge:[]
    })
    const [source,setSource]=useState(0)
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
                    prev_temp[i] = { ...item, w: undefined }
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
        console.log(currentGraph, "currentGraph");
    }, [currentGraph])

    function bfs(graph, start = 0) {
        if (start==undefined || start==null) {
            alert("please type source")
        }
        let visited = [];
        let queue = [start];
        let visited_edge=[]
        visited.push(`${start}`);
        // inhitilize feture stack
        let fetureStack_temp = [{ queue: [...queue], visited: [...visited] }];
        // dispatch(updateGlobalState({
        //     fetureStack: 
        // }));


        while (queue.length > 0) {
            const currentVertex = queue.shift();
            console.log(currentVertex);

            const neighbors = graph[currentVertex];
            for (let i = 0; i < neighbors.length; i++) {
                const neighborVertex = neighbors[i][0];
                if (!visited.includes(`${neighborVertex}`)) {
                    visited.push(`${neighborVertex}`);
                    visited_edge.push([`${currentVertex}`,`${neighborVertex}`])
                    queue.push(neighborVertex);
                    //   update feture stack
                    console.log(visited, "vis");
                    fetureStack_temp = [...fetureStack_temp, { queue: [...queue], visited: [...visited] }]
                    // dispatch(updateGlobalState({
                    //     fetureStack: [...fetureStack,{ queue:[...queue],visited }]
                    // }));
                }
            }
        }
        // console.log(pastStack.get(), "dddddd");
        dispatch(updateGlobalState({
            fetureStack: fetureStack_temp
        }));
        setStack(prev => ({ ...prev, fetureStack: fetureStack_temp, currentStatus: {},visited_edge }))
        return fetureStack_temp
        console.log(fetureStack_temp, "fetureStack_temp");
        console.log(visited, "visited");
        console.log(queue, "queue");
    }
    const [nextCall, setNextCall] = useState(undefined)
    async function runAlgo(params) {
        // setStack({
        //     pastStack: [],
        //     fetureStack: [],
        //     currentStatus: {

        //     }
        // })
        bfs(currentGraph?.adjacent_matrix,source);

        // setTimeout(() => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // return nextCall(0)
        return setNextCall(true)


        // }, 1000);


    }
    useEffect( () => {
        if (nextCall !== undefined) {



            let pastStack_temp = [
                ...stack?.pastStack
            ];
            let fetureStack_temp = [
                ...stack.fetureStack
            ]

            // fetureStack_temp?.forEach(async (item, i) => {
            //  actual code
            // console.log("before resoleve");
            nextStep()
            console.log(stack, `hello_`);

           
        }
    }, [nextCall])
    // async function nextCall(i) {

    //    
    // }

   async function nextStep(params) {
    await new Promise(resolve => setTimeout(resolve, 1000));
        // return if feature stack is emty
        if (stack.fetureStack?.length == 0) {
            return
        }

        // clone stack
        let pastStack_temp = [
            ...stack?.pastStack
        ];
        let fetureStack_temp = [
            ...stack.fetureStack
        ]

        if (Object.keys(stack?.currentStatus).length != 0) {
            pastStack_temp.push(stack?.currentStatus)
        }
        fetureStack_temp.shift();

        // dispatch(updateGlobalState({
        //     fetureStack: fetureStack_temp,
        //     pastStack: pastStack_temp,
        //     currentStatus: stack?.fetureStack[0]
        // }));
        setStack(prev => ({
            ...prev,
            fetureStack: fetureStack_temp,
            pastStack: pastStack_temp,
            currentStatus: stack?.fetureStack[0]
        }))

        if (fetureStack_temp?.length != 0) {
                
            // return nextCall(i+1)
            setNextCall(!nextCall)
        } else {
            setNextCall(undefined)
        }
    }


    function prevStep(params) {
        let pastStack_temp = [
            ...pastStack
        ];
        let fetureStack_temp = [
            ...fetureStack
        ];
        if (Object.keys(currentStatus).length != 0) {
            pastStack_temp.push(currentStatus)
        }
        fetureStack_temp.shift();

        dispatch(updateGlobalState({
            fetureStack: fetureStack_temp,
            pastStack: pastStack_temp,
            currentStatus: fetureStack[0]
        }));
    }


    return (
        <>
            <div className='h-[30rem] w-full bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative'>
                <div className='h-full cursor-crosshair px-4 relative' id='graphEdit'
                >
                    {vertexList?.map((item, index) => {
                        return <Vertex data={{ ...item, index }} key={index} stack={stack} />
                    })}
                    {edgeList?.map((item, i) => {
                        return <Edge vertexList={vertexList} data={{ ...item, index: i }} key={i} stack={stack} />
                    })}


                </div>
                <div className='h-20 shrink-0 items-center border-t border-gray-300 absolute bottom-0 w-full px-4 py-2 flex justify-between gap-4'>
                    <div className="left flex gap-4 items-center">

                        <span>
                            Source
                        </span>
                        <input type="text" placeholder='Source' className='border-b border-gray-400 py-1 px-2 w-20' defaultValue={0} onChange={(e)=>{setSource(e.target.value)}}  />
                        {/* <span className='lable'>Speed</span>
                        <select name="" id="" className='border border-gray-400 outline-none'>
                            <option value="1">0.25</option>
                            <option value="1">0.5</option>
                            <option value="1">0.75</option>
                            <option value="1" selected>Normal</option>
                            <option value="1">1.25</option>
                            <option value="1">1.5</option>
                            <option value="1">1.75</option>
                            <option value="1">2</option>
                        </select> */}


                        <div className='flex items-center gap-3 ml-4'>
                            <button className='btn border-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>

                            </button>
                            <button className='btn border-none' onClick={() => {
                                runAlgo()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>

                            </button>
                            <button className='btn border-none'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                </svg>

                            </button>
                        </div>

                        {/* <button className={`btn ${currentActiveBtn == "vertex" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('vertex') }}>
                            Vertex
                        </button>
                        <button className={`btn ${currentActiveBtn == "edge" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('edge') }}>
                            Edge
                        </button>
                        <button className={`btn ${currentActiveBtn == "InputGraph" ? "btnActive" : ""}`} onClick={() => { setCurrentActiveBtn('InputGraph') }}>
                            Input Graph
                        </button> */}
                    </div>

                </div>

            </div>

        </>
    )
}

export default GraphShow