import React from 'react'

function InputGraph({ data,doneFunc }) {
    const { GraphDetails, setGraphDetails, edgeList, setEdgeList } = data
    
    return (
        <>
            {/* <div className='absolute z-50 h-full w-full top-0 left-0 flex items-center justify-center'> */}

                <div className='absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   max-h-[40rem] overflow-auto bg-white border border-gray-400 rounded-md p-4 shadow-md  ' >

                    <p className='mb-1  text-base text-black'>Name</p>
                    <input type="text" name='name' value={GraphDetails?.name} placeholder='Graph Name' className='border-b mb-2 border-gray-400 py-1 px-2 text-sm text-gray-400' onChange={(e)=>{setGraphDetails(prev=>({...prev,[e.target.name]:e.target.value}))}} />
                    <p className='mb-1  text-base text-black'>Type of Graph</p>
                    <div className='flex items-center mb-1'>
                        <input type="radio" id="html" name="Weighted_graph" value="true" checked={GraphDetails.Weighted_graph=="true"} onChange={(e)=>{setGraphDetails(prev=>({...prev,[e.target.name]:e.target.value}))}} />
                        <label for="html" className='  text-sm text-gray-400 ml-2'>Weighted Graph</label>
                    </div>
                    <div className='flex items-center mb-2'>
                        <input type="radio" id="html" name="Weighted_graph" value="false" checked={GraphDetails.Weighted_graph=="false"} onChange={(e)=>{setGraphDetails(prev=>({...prev,[e.target.name]:e.target.value}))}}  />
                        <label for="html" className='  text-sm text-gray-400 ml-2'>Non Weighted Graph</label>
                    </div>
                    <p className='mb-1  text-base text-black'>Type of Graph</p>
                    <div className='flex items-center mb-1'>
                        <input type="radio" id="html" name="Directed_graph" value="true" checked={GraphDetails.Directed_graph=="true"} onChange={(e)=>{setGraphDetails(prev=>({...prev,[e.target.name]:e.target.value}))}}  />
                        <label for="html" className='  text-sm text-gray-400 ml-2'>Directed Graph</label>
                    </div>
                    <div className='flex items-center mb-2'>
                        <input type="radio" id="html" name="Directed_graph" value="false" checked={GraphDetails.Directed_graph=="false"} onChange={(e)=>{setGraphDetails(prev=>({...prev,[e.target.name]:e.target.value}))}}  />
                        <label for="html" className='  text-sm text-gray-400 ml-2'>Non Directed Graph</label>
                    </div>
                    <p className='mb-1  text-base text-black'>Eanter the weight of every edge</p>
                    <table className='dashboard-table'>
                        <thead>
                            <tr>
                                <td className='table-head-cell'>
                                    From  Vertex No
                                </td>
                                <td className='table-head-cell'>
                                    To  Vertex No
                                </td>
                                <td className='table-head-cell'>
                                    Weight
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {edgeList?.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='table-body-cell'>
                                            {item.u}
                                        </td>
                                        <td className='table-body-cell'>
                                            {item.v}
                                        </td>
                                        <td className='table-body-cell'>
                                            <input onChange={(e) => {
                                                setEdgeList(prev => {
                                                    let prev_temp = [...prev];
                                                    prev_temp[i] = {
                                                        ...prev[i],
                                                        w: e.target.value
                                                    }
                                                    return prev_temp
                                                })
                                            }} type="number" value={edgeList[i].w} placeholder='Enter Weight' className='max-w-[7rem] py-2 px-3 border-b text-center border-gray-400' />
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>


                    <div className=' flex gap-4 justify-end mt-2'>
                        <button className='btn' type='button' onClick={()=>{doneFunc()}}>
                            Done
                        </button>

                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default InputGraph