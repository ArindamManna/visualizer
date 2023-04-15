import React from 'react'
import { GrGraphQl } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalState } from '../../Redux/GlobalSlice';

function GraphList() {
    const dispatch = useDispatch()
    const { savedGraphList } = useSelector((state) => {
        const { savedGraphList } = state.GlobalSlice;
        return { savedGraphList }
    })

    return (
        <>
            <div className=' py-2 shrink-0 absolute top-0 right-2 h-full w-36 z-50'>
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
                            <div key={i} onClick={() => {
                                dispatch(updateGlobalState({
                                    currentGraph: item,
                                    isOpengraphListPopup: false
                                }))
                            }} className='text-gray-500 hover:text-purple-400 cursor-pointer rounded-md shadow-md flex flex-col shrink-0 items-center p-3'>

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