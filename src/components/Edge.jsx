import React, { useEffect, useState } from 'react'

function Edge({ data }) {
    const {u,v}=data;
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
        const dx = v.x - u.x;
        const dy = v.y - u.y;
        const angle = Math.atan2(dy, dx);

        const length = Math.sqrt(dx * dx + dy * dy);

        setlineData({ angle, length })
    }, [u, v])
    return (
        <div className=' line' style={{
            top:`${u.y}px`,
            left:`${u.x}px`,
            transform: `rotate(${lineData.angle}rad)`,
            width: `${lineData.length}px`

        }}>
        </div>
    )
}

export default Edge