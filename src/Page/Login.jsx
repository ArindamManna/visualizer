import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiHelperFunction } from '../Api/ApiHelperfunction';
import { useDispatch } from 'react-redux';
import { updateGlobalState } from '../Redux/GlobalSlice';

function Login() {

  const [formData, setFormData] = useState({})
  const  dispatch=useDispatch()
  const onchange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const signup = async (e) => {
    e.preventDefault()
    // e.preventDefault();
    let res = await ApiHelperFunction({ urlPath: "user/login", method: "post", formData })
    console.log(res,"sdff");
    if (res?.token) {
      localStorage.setItem("token",res?.token)
      dispatch(updateGlobalState({token:res?.token}))
    }
  }

  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center'>

        <form onSubmit={signup} className='p-4 rounded-md shadow-md border-gray-200 w-4/12'>
          <h2 className='text-blue-400 text-center mb-4 text-lg font-bold'>Login</h2>

          {/* <input type="text" required name='name' onChange={onchange} placeholder='Name' className='w-full bg-transparent border-b-2 border-gray-300 p-2 text-gray-400 mb-2' /> */}
          <input type="email" name='email' onChange={onchange} required placeholder='Email' className='w-full bg-transparent border-b-2 border-gray-300 p-2 text-gray-400 mb-2' />
          <input type="password" name='password' onChange={onchange} required placeholder='Password' className='w-full bg-transparent border-b-2 border-gray-300 p-2 text-gray-400 mb-2' />
          <div className='flex justify-end mb-2'>

            <button type='submit' className='text-white p-2 rounded-md bg-blue-400 hover:bg-blue-500'>Login</button>
          </div>
          <Link to={"/signup"} className='text-center text-purple-500 underline'>
            Already have an account?
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login