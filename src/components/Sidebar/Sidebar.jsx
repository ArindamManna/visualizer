import React from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItem from './MenuItem'

function Sidebar() {

    const navigate=useNavigate()
    const sidebarList=[
        {
            label:"Home",
            onclick:()=>{
                navigate('/')
            }
        },
        {
            label:"Graph Traversal",
            subMenu:[
                {
                    label:"BFS"
                },
                {
                    label:"DFS"
                }
            ]
        },
        {
            label:"Shortest Path Find",
            subMenu:[
                {
                    label:"Dijextra Algo"
                }
            ]
        }
    ]
    return (
        <div className="sidebar">
          {sidebarList.map((item,i)=>{
            return <MenuItem data={item} key={i} />
          })}
        </div>
    )
}

export default Sidebar