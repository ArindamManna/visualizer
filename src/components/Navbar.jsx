import React from 'react'

function Navbar() {
  return (
    <header className='w-full py-3 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-0'>
            <h3 className='text-lg text-gray-500 font-bold'>
                Visualizer
            </h3>
            <div className="right">
                <button className='btn'>
                    Login
                </button>
            </div>
    </header>
  )
}

export default Navbar