import React from 'react'
import { GrGraphQl } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalState } from '../../Redux/GlobalSlice';
import { useNavigate } from 'react-router-dom';
import { ApiHelperFunction } from '../../Api/ApiHelperfunction';

function GraphList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { savedGraphList } = useSelector((state) => {
        const { savedGraphList } = state.GlobalSlice;
        return { savedGraphList }
    });
    const deleteGraph = async (i) => {
        let arr = [...savedGraphList];
        arr.splice(i, 1);
        // localStorage.setItem("savedGraphList",JSON.stringify(arr))
        let res = await ApiHelperFunction({
            urlPath: "graph/delete", method: "delete", formData: {
                index: i,
            }
        })
        if (res?.code == 200) {
            alert("Graph deleted Succesfully")
            dispatch(updateGlobalState({
                savedGraphList: arr,
                currentGraph: null,
            }))
        }
    }
    const editGraph = (i) => {
        navigate("/");
        let item = savedGraphList[i];
        dispatch(updateGlobalState({
            currentGraph: item,
            isEditGraph: true,
            editGraphIndex: i,
            isOpengraphListPopup: false
        }))
    }
    const usethisGraph = (i) => {
        let item = savedGraphList[i];
        dispatch(updateGlobalState({
            currentGraph: item,
            isOpengraphListPopup: false
        }))
    }

    return (
        <>
            <div className=' py-2 shrink-0 absolute top-0 right-2 h-full w-36 z-50 graphlist'>
                <div className='flex flex-col gap-4 p-4 border border-gray-300 h-full w-full overflow-auto bg-white rounded-md'>
                    <div onClick={() => {
                        dispatch(updateGlobalState({
                            currentGraph: {},
                            isOpengraphListPopup: false
                        }))
                    }} className='text-gray-500 hover:text-purple-400 cursor-pointer rounded-md shadow-md flex flex-col shrink-0 items-center p-3'>

                        <AiOutlinePlus className='h-6 w-6' />
                        <span className='mt-2 text-sm font-medium '>
                            Add Graph
                        </span>
                    </div>

                    {savedGraphList?.map((item, i) => {
                        return (
                            <div key={i} className='text-gray-500 relative  cursor-pointer rounded-md shadow-md flex flex-col shrink-0 items-center p-3 graphlist_graph'>
                                <div className='absolute w-full h-full top-0 left-0  flex-col p-1 gap-1 hov'>
                                    <div className='w-full h-full  rounded-md flex gap-1 bg-white'>
                                        <button title='Edit' onClick={() => { editGraph(i) }} className='w-full h-full bg-blue-200 hover:bg-blue-400 hover:text-white text-blue-500 rounded-md flex items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button title='Delete' onClick={() => { deleteGraph(i) }} className='w-full h-full bg-red-200 hover:bg-red-400 hover:text-white text-red-500 rounded-md flex items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button title='Use Graph' onClick={() => { usethisGraph(i) }} className='w-full h-full font-bold bg-purple-200 hover:bg-purple-400 hover:text-white text-purple-500 rounded-md flex items-center justify-center text-sm'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <GrGraphQl className='h-6 w-6' />
                                <span className='mt-2 text-sm font-medium '>
                                    {item.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default GraphList