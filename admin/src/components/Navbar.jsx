import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <img className='w-[max(10%,80px)]' src="/logo.png" alt="Logo" />
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
