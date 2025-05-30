import React from 'react'
import { AiFillShop } from "react-icons/ai";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>BV</h2>
      <ul>
       <Link to="/"> <li>Inicio<AiFillShop className='icono-sidebar'/></li></Link> 
        <Link to="/barberos"><li>Barberos <BiCut className='icono-sidebar'/></li></Link>
        <Link to="/citas"><li>Citas<BsCalendar2MinusFill className='icono-sidebar'/></li></Link> 
      </ul>
    </div>
  )
}

export default Sidebar