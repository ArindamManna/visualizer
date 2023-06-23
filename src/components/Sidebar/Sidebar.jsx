import React from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItem from './MenuItem'
import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalState } from '../../Redux/GlobalSlice';

function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpengraphListPopup } = useSelector((state) => {
        const { isOpengraphListPopup } = state.GlobalSlice;
        return { isOpengraphListPopup }
    })
    const sidebarList = [
        {
            label: "Home",
            onclick: () => {
                navigate('/')
            }
        },
        {
            label: "Graph Traversal",
            subMenu: [
                {
                    label: "BFS",
                    onclick: () => {
                        navigate('/bfs')
                    }
                },
                {
                    label: "DFS",
                    onclick: () => {
                        navigate('/dfs')
                    }
                }
            ]
        },
        {
            label: "Minimum Spanning Tree",
            subMenu: [
                {
                    label: "Prim's Algorithm",
                    onclick: () => {
                        navigate('/prim')
                    }
                },
                {
                    label: "Kruskal's Algorithm",
                    onclick: () => {
                        navigate('/kruskal')
                    }
                }
            ]
        },
        {
            label: "Shortest Path",
            subMenu: [
                // {
                //     label: "Floyd's Algorithm",
                //     onclick: () => {
                //         navigate('/floyd')
                //     }
                // },
                {
                    label: "Dijkstra's Algorithm",
                    onclick: () => {
                        navigate('/dijkstra')
                    }
                }
            ]
        },
        {
            label: "Saved Graph's",
            onclick: () => {
                dispatch(updateGlobalState({ isOpengraphListPopup: !isOpengraphListPopup }))
                // navigate('/savedGraphs')
            }
        }
    ]
    return (
        <div className="sidebar">
            {sidebarList.map((item, i) => {
                return <MenuItem data={item} key={i} />
            })}
        </div>
    )
}

export default Sidebar