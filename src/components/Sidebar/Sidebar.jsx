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
            label: "Shortest Path Find",
            subMenu: [
                {
                    label: "Dijextra Algo"
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