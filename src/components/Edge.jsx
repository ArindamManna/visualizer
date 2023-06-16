import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Edge({ data, vertexList, deleteEdge,stack }) {
    const location = useLocation()
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
    const { u, v, v_temp, w, index } = data;
    const {pastStack, fetureStack, currentStatus,visited_edge}=stack?stack:{};
    const {distances, minDistancePaths}=pastStack?.[pastStack?.length-1]?pastStack[pastStack?.length-1]:{}
    let currentEdge=visited_edge?.[currentStatus?.visited?.length-1];
    const [isEdgeVisited,setIsEdgeVisited]=useState(false);
    const [isEdgeNotUsed,setIsEdgeNotUsed]=useState(false)
    useEffect(()=>{
        // debugger
        let temp=false;
        let loopCt;
        // =currentStatus?.visited?.length;
        if (currentStatus && Object.keys(currentStatus)?.length==0) {
            loopCt=pastStack?.[pastStack?.length-1]?.visited?.length;
            console.log(loopCt,"hhhhhh");
        }else{
            loopCt=currentStatus?.visited?.length;
        }
        for (let i = 0; i < loopCt; i++) {
            let item=visited_edge[i]
            if (item?.[0]==u && item?.[1]==v) {
                // setIsEdgeVisited(true)
                temp=true;
                break
            }else{
                temp=false;
            }
            
        }

        setIsEdgeVisited(temp)

        if (currentAlgo=="dijkstra") {
            let isEdgeNotUsed_temp=true;
            for (let i = 0; i < minDistancePaths?.length; i++) {
                const path = minDistancePaths[i];
                for (let j = 0; j < path?.length; j++) {
                    // const [u,v] = path[j];
                    if (`${path[j]?.[0]}`==`${u}` && `${path[j]?.[1]}`==`${v}`) {
                        isEdgeNotUsed_temp=false;
                        break;
                    }
                    
                }
                if (!isEdgeNotUsed_temp) {
                    break
                }
            }
            setIsEdgeNotUsed(isEdgeNotUsed_temp)
        }
    },[stack,currentAlgo])
    // console.log(currentEdge, u, v);
    let u_point = vertexList[u];

    let v_point = v_temp ? v_temp : vertexList[v];
    // const u = {
    //     x: 100,
    //     y: 200
    // };
    // const v = {
    //     x: 300,
    //     y: 500
    // }
    const [lineData, setlineData] = useState("")
    useEffect(() => {
        if (u_point == undefined || v_point == undefined) {
            deleteEdge({ index })
        } else {
            const dx = v_point.x - u_point.x;
            const dy = v_point.y - u_point.y;
            const angle = Math.atan2(dy, dx);

            const length = Math.sqrt(dx * dx + dy * dy);

            setlineData({ angle, length })
        }
    }, [u_point, v_point])
    return (
        <>
            <div onDoubleClick={(e) => {
                deleteEdge?.({ index })
            }} className='transform-origin-tl absolute h-1.5 flex items-end lineParent' style={{
                top: `${u_point?.y}px`,
                left: `${u_point?.x}px`,
                transform: `rotate(${lineData?.angle}rad)`,
                width: `${lineData?.length}px`

            }}>
                <div 
                className={` line w-full bg-black   ${currentEdge?.[0]==u && currentEdge?.[1]==v ? "arrowForward": ""} ${isEdgeVisited?isEdgeNotUsed?"bg-gray-300 text-gray-300":     "bg-blue-500 text-blue-500":""}`} 
                // className=' line w-full ' 
                >
                    {w &&
                        <span className={`weight absolute left-1/2 -translate-x-1/2 top-full mt-1 ${u_point?.x>v_point?.x?"rotate-180":""} `}>
                            {w}
                        </span>
                    }
                    <span className='absolute top-1/2 right-1.5 -translate-y-1/2'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Edge