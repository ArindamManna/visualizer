import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalState } from '../Redux/GlobalSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { name } = useSelector((state) => {
    const { name } = state.GlobalSlice;
    return { name }
  })
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    dispatch(updateGlobalState({token:null}));
    navigate("/")
  }
  return (
    <header className='w-full py-3 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-0'>
      <h3 className='text-lg text-gray-500 font-bold'>
        Visualizer
      </h3>
      <div className="right flex items-center gap-4">
        <p className='font-medium'>
          Hi, {name}
        </p>
        <button onClick={logout} className='px-3 py-2 text-base rounded-md border border-red-400 text-red-500 hover:text-red-500 hover:border-red-400 '>
          Log out
        </button>
      </div>
    </header>
  )
}

export default Navbar