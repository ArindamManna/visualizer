import React, { useEffect, useMemo, useState } from 'react'
import Vertex from './Vertex'
import Edge from './Edge'
import { json, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputGraph from './Modal/InputGraph';
import { updateGlobalState } from '../Redux/GlobalSlice';
import ResultBoard from './ResultBoard';

function GraphShow() {
    //#region state
    const location = useLocation()
    const { currentGraph, savedGraphList } = useSelector((state) => {
        const { currentGraph, savedGraphList } = state.GlobalSlice;
        return { currentGraph, savedGraphList }
    })
    const dispatch = useDispatch()

    const [GraphDetails, setGraphDetails] = useState({
        Weighted_graph: "true",
        Directed_graph: "true",
        name: ""
    })
    const [vertexList, setVertexList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    // const [currentActiveBtn, setCurrentActiveBtn] = useState('vertex');
    const [playPauseStatus, setPlayPauseStatus] = useState("start") // start , running, pused ,restart
    const [source, setSource] = useState(0);
    const [stack, setStack] = useState({
        pastStack: [],
        fetureStack: [],
        currentStatus: {

        },
        visited_edge: []
    })
    const [nextCall, setNextCall] = useState(undefined)
    //#endregion

    const resetStack = () => {
        setStack({
            pastStack: [],
            fetureStack: [],
            currentStatus: {

            },
            visited_edge: []
        });
        setPlayPauseStatus("start")
    }
    // when url chenges
    useEffect(() => {
        resetStack()
    }, [location])

    //#region Graph chenge
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
    }, [currentGraph])
    //#endregion

    //#region Graph Traversal Algo
    function bfs(graph, start = 0) {
        if (start == undefined || start == null) {
            alert("please type source")
        }
        let visited = [];
        let queue = [start];
        let visited_edge = []
        visited.push(`${start}`);
        // inhitilize feture stack
        let fetureStack_temp = [{ queue: [...queue], visited: [...visited] }];



        while (queue.length > 0) {
            const currentVertex = queue.shift();
            console.log(currentVertex);

            const neighbors = graph[currentVertex];
            for (let i = 0; i < neighbors.length; i++) {
                const neighborVertex = neighbors[i][0];
                if (!visited.includes(`${neighborVertex}`)) {
                    visited.push(`${neighborVertex}`);
                    visited_edge.push([`${currentVertex}`, `${neighborVertex}`])
                    queue.push(neighborVertex);
                    //   update feture stack
                    fetureStack_temp = [...fetureStack_temp, { queue: [...queue], visited: [...visited] }]

                }
            }
        }

        setStack(prev => ({ fetureStack: fetureStack_temp, currentStatus: {}, visited_edge, pastStack: [] }))
        return fetureStack_temp;
    }
    function dfs(graph, start) {
        if (start == undefined || start == null) {
            alert("please type source")
        }
        const visited = [];
        let visited_edge = []
        let fetureStack_temp = []

        function dfsHelper(vertex) {
            visited.push(`${vertex}`);
            fetureStack_temp = [...fetureStack_temp, { visited: [...visited] }]
            console.log(vertex);

            const neighbors = graph[vertex];
            for (let i = 0; i < neighbors.length; i++) {
                const neighborVertex = neighbors[i][0];
                if (!visited.includes(`${neighborVertex}`)) {
                    visited_edge.push([`${vertex}`, `${neighborVertex}`]);
                    dfsHelper(neighborVertex);
                    //   fetureStack_temp = [...fetureStack_temp, { queue: [...queue], visited: [...visited] }]
                }
            }
        }

        dfsHelper(start);
        setStack(prev => ({ fetureStack: fetureStack_temp, currentStatus: {}, visited_edge, pastStack: [] }))

        return fetureStack_temp;
    }
    //#endregion
    //#region Minimal Spanning Tree (MST)
    function prims(graph, source = 0) {
        function findMinKeyVertex(key, visited) {
            let minKey = Infinity;
            let minKeyVertex = -1;

            for (let v = 0; v < key.length; v++) {
                if (!visited[v] && key[v] < minKey) {
                    minKey = key[v];
                    minKeyVertex = v;
                }
            }

            return minKeyVertex;
        }




        const numVertices = graph.length;
        const visited = new Array(numVertices).fill(false);
        const key = new Array(numVertices).fill(Infinity);
        const parent = new Array(numVertices).fill(null);
        let connectWith = new Array(numVertices).fill(null);
        let visited_till_now = []

        key[source] = 0;
        connectWith[source] = 0;
        parent[source] = -1;

        let visited_temp = [];
        let visited_edge = []
        // visited.push(`${start}`);
        // inhitilize feture stack
        let fetureStack_temp = [];
        // let fetureStack_temp = [{ visited: [...visited_temp] }];

        for (let count = 0; count < numVertices; count++) {
            const minKeyVertex = findMinKeyVertex(key, visited);
            visited[minKeyVertex] = true;
            visited_till_now.push(minKeyVertex)
            visited_temp.push(`${minKeyVertex}`);
            visited_edge.push([`${connectWith[minKeyVertex]}`, `${minKeyVertex}`])
            //   update feture stack
            fetureStack_temp = [...fetureStack_temp, { visited: [...visited_temp], visited_till_now: [...visited_till_now], key: [...key] }]

            const neighbors = graph[minKeyVertex];
            for (let i = 0; i < neighbors.length; i++) {
                const [neighborVertex, weight] = neighbors[i];
                if (!visited[neighborVertex] && Number(weight) < key[neighborVertex]) {
                    parent[neighborVertex] = minKeyVertex;
                    key[neighborVertex] = Number(weight);
                    connectWith[neighborVertex] = `${minKeyVertex}`




                }
            }
        }
        setStack(prev => ({ fetureStack: fetureStack_temp, currentStatus: {}, visited_edge, pastStack: [], source }))
        console.log(parent, "kkkkkkkk");
        console.log(key, "kkkkkkkk");
        console.log(visited, "kkkkkkkk");
        return parent;
    }


    function kruskal(graph) {
        class UnionFind {
            constructor(size) {
                this.parent = new Array(size);
                this.rank = new Array(size);

                for (let i = 0; i < size; i++) {
                    this.parent[i] = i;
                    this.rank[i] = 0;
                }
            }

            find(x) {
                if (this.parent[x] !== x) {
                    this.parent[x] = this.find(this.parent[x]);
                }

                return this.parent[x];
            }

            union(x, y) {
                const rootX = this.find(x);
                const rootY = this.find(y);

                if (rootX !== rootY) {
                    if (this.rank[rootX] < this.rank[rootY]) {
                        this.parent[rootX] = rootY;
                    } else if (this.rank[rootX] > this.rank[rootY]) {
                        this.parent[rootY] = rootX;
                    } else {
                        this.parent[rootY] = rootX;
                        this.rank[rootX]++;
                    }
                }
            }
        }
        const numVertices = graph.length;
        const edges = [];

        // Collect all edges from the graph
        for (let u = 0; u < numVertices; u++) {
            const neighbors = graph[u];
            for (let i = 0; i < neighbors.length; i++) {
                const [v, weight] = neighbors[i];
                edges.push([u, v, weight]);
            }
        }

        // Sort the edges by weight in non-decreasing order
        edges.sort((a, b) => a[2] - b[2]);

        const mst = [];
        const unionFind = new UnionFind(numVertices);



        // define stack
        let visited_till_now = []
        let visited_temp = [];
        let visited_edge = []
        // visited.push(`${start}`);
        // inhitilize feture stack
        let fetureStack_temp = [];
        let currentEdgeIndex=0;
        for (let i = 0; i < edges.length; i++) {
            const [u, v, weight] = edges[i];

            // Check if adding this edge creates a cycle
            if (unionFind.find(u) !== unionFind.find(v)) {
                unionFind.union(u, v);
                mst.push([u, v, weight]);



                if (!visited_temp?.includes(`${u}`)) {
                    
                    visited_temp.push(`${u}`)
                }
                if (!visited_temp?.includes(`${v}`)) {
                    
                    visited_temp.push(`${v}`)
                }
                // visited_temp.push(`${minKeyVertex}`);
                visited_edge.push([`${u}`, `${v}`])
                //   update feture stack
                // fetureStack_temp = [...fetureStack_temp, { visited_till_now: [...visited_till_now] }]
                fetureStack_temp = [...fetureStack_temp, { visited: [...visited_temp], visited_till_now: [...visited_till_now],currentEdgeIndex:currentEdgeIndex++ }]
            }
        }
        console.log(mst,"fasdfsdf");
        setStack(prev => ({ fetureStack: fetureStack_temp, currentStatus: {}, visited_edge:mst, pastStack: [], source }))
        return mst;
    }


    //#endregion
    //#region shortest path find
    function dijkstra(graph, source = 0) {

        function findMinDistanceVertex(distances, visited) {
            let minDistance = Infinity;
            let minDistanceVertex = -1;

            for (let v = 0; v < distances.length; v++) {
                if (!visited.includes(`${v}`) && distances[v] < minDistance) {
                    minDistance = distances[v];
                    minDistanceVertex = v;
                }
            }

            return minDistanceVertex;
        }



        const numVertices = graph.length;
        const distances = new Array(numVertices).fill(Infinity);
        const visited = [];
        let visited_temp = [];
        // const visited = new Array(numVertices).fill(false);
        // inhitilize feture stack
        let visited_edge = []
        let fetureStack_temp = [];
        let minDistancePaths = new Array(numVertices).fill([])

        distances[source] = 0;

        for (let i = 0; i < numVertices - 1; i++) {
            const minDistanceVertex = findMinDistanceVertex(distances, visited);
            // visited[minDistanceVertex] = true;
            visited.push(`${minDistanceVertex}`);

            const neighbors = graph[minDistanceVertex];
            for (let j = 0; j < neighbors.length; j++) {
                const [neighborVertex, weight] = neighbors[j];
                const distance = distances[minDistanceVertex] + Number(weight);
                if (distance < distances[neighborVertex]) {
                    distances[neighborVertex] = distance;
                    minDistancePaths[neighborVertex] = [...minDistancePaths[minDistanceVertex], [`${minDistanceVertex}`, `${neighborVertex}`]]
                    visited_temp = [...visited_temp, `${neighborVertex}`]
                    fetureStack_temp = [...fetureStack_temp, { visited: [...visited_temp], minDistancePaths: [...minDistancePaths], distances: [...distances] }];
                    visited_edge.push([`${minDistanceVertex}`, `${neighborVertex}`])

                }

            }
        }

        setStack(prev => ({ fetureStack: fetureStack_temp, currentStatus: {}, visited_edge, pastStack: [], source }))
        console.log(distances, "sdsss");
        return distances;
    }
    //#endregion
    console.log(stack, "fsfdsfs");
    function runAlgo(params) {
        // resetStack()
        if (location.pathname == "/bfs") {
            bfs(currentGraph?.adjacent_matrix, source);
        } else if (location.pathname == "/dfs") {
            dfs(currentGraph?.adjacent_matrix, source);
        } else if (location.pathname == "/prim") {
            prims(currentGraph?.adjacent_matrix, source);
        } else if (location.pathname == "/kruskal") {
            kruskal(currentGraph?.adjacent_matrix, source);
        } else if (location.pathname == "/dijkstra") {
            dijkstra(currentGraph?.adjacent_matrix, source);
        }


        return setNextCall(true)
    }
    //#region  Play Pause Next Prev Func
    useEffect(() => {
        if (nextCall !== undefined) {
            nextStep()
            console.log(stack, `hello_`);
        }
    }, [nextCall])

    async function nextStep(params) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        // return if feature stack is emty
        if (stack.fetureStack?.length == 0 && Object.keys(stack?.currentStatus)?.length == 0) {
            return
        }

        // clone stack
        let pastStack_temp = [
            ...stack?.pastStack
        ];
        let fetureStack_temp = [
            ...stack.fetureStack
        ]

        // move object from feature to current and current to past
        if (Object.keys(stack?.currentStatus).length != 0) {
            pastStack_temp.push(stack?.currentStatus)
        }
        fetureStack_temp.shift();

        let currentStatus_temp = stack?.fetureStack[0] ? stack?.fetureStack[0] : {};
        //    update stack 
        setStack(prev => ({
            ...prev,
            fetureStack: fetureStack_temp,
            pastStack: pastStack_temp,
            currentStatus: currentStatus_temp
        }))


        // recursion call
        if (playPauseStatus == "running") {
            if (fetureStack_temp?.length != 0 || Object.keys(currentStatus_temp)?.length != 0) {
                // return nextCall(i+1) //just for console pass value
                setNextCall(!nextCall)
            } else {
                setNextCall(undefined)
                setPlayPauseStatus("restart")
            }
        }
    }

    async function prevStep(params) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        // return if feature stack is emty
        if (stack.pastStack?.length == 0) {
            return
        }

        // clone stack
        let pastStack_temp = [
            ...stack?.pastStack
        ];
        let fetureStack_temp = [
            ...stack.fetureStack
        ]

        // move object from feature to current and current to past
        if (Object.keys(stack?.currentStatus).length != 0) {
            fetureStack_temp.unshift(stack?.currentStatus)
        }
        pastStack_temp.pop();

        //    update stack 
        setStack(prev => ({
            ...prev,
            fetureStack: fetureStack_temp,
            pastStack: pastStack_temp,
            currentStatus: stack?.pastStack[stack?.pastStack?.length - 1]
        }))



    }
    //#endregion





    //#region play next prev btn click func
    const next = () => {
        if (playPauseStatus == "start") {
            setPlayPauseStatus("paused")
            runAlgo()

        }
        if (playPauseStatus == "paused") {
            setNextCall(!nextCall)
        }
    }
    const playPause = () => {

        if (playPauseStatus == "start" || playPauseStatus == "restart") {
            setPlayPauseStatus("running")
            runAlgo()
        }
        if (playPauseStatus == "running") {
            setPlayPauseStatus("paused")
        }
    }
    const prev = () => {
        prevStep()
    }
    //#endregion

    return (
        <>
            <div className='h-1/2 w-full bg-white border border-gray-300 rounded-lg shadow-lg  py-3 relative'>
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
                        <input type="text" placeholder='Source' className='border-b border-gray-400 py-1 px-2 w-20' defaultValue={0} onChange={(e) => {
                            setSource(e.target.value);
                            resetStack()
                            setPlayPauseStatus("start")
                        }} />
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
                            <button className='btn border-none' type='button' onClick={(e) => { prev(e) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>

                            </button>
                            <button className='btn border-none' onClick={() => {
                                playPause()
                            }}>
                                {playPauseStatus == "running" ? <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg> : playPauseStatus == "restart" ? <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                </svg>}



                            </button>
                            <button className='btn border-none' type='button' onClick={(e) => { next(e) }}>
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
            <ResultBoard stack={stack} />
        </>
    )
}

export default GraphShow