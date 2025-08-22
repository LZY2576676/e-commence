import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink className={({isActive})=>`sidebar-option ${isActive ? 'active' : ''}`} to="/add">
          <img className='w-5 h-5' src="/add_icon.png" alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink className={({isActive})=>`sidebar-option ${isActive ? 'active' : ''}`} to="/list">
          <img className='w-5 h-5' src="/order_icon.png" alt="" />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink className={({isActive})=>`sidebar-option ${isActive ? 'active' : ''}`} to="/orders">
          <img className='w-5 h-5' src="/order_icon.png" alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
