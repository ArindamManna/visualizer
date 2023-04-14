import React, { useEffect, useState } from 'react'

function Edge({ data ,vertexList}) {
    const {u,v,v_temp}=data;
    let u_point=vertexList[u];
    let v_point= v_temp?v_temp:vertexList[v];
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
        const dx = v_point.x - u_point.x;
        const dy = v_point.y - u_point.y;
        const angle = Math.atan2(dy, dx);

        const length = Math.sqrt(dx * dx + dy * dy);

        setlineData({ angle, length })
    }, [u_point, v_point])
    return (
        <div className=' line' style={{
            top:`${u_point.y}px`,
            left:`${u_point.x}px`,
            transform: `rotate(${lineData.angle}rad)`,
            width: `${lineData.length}px`

        }}>
        </div>
    )
}

export default Edge