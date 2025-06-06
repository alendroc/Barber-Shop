import React from 'react'
import { AiFillShop } from "react-icons/ai";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>BV</h2>
      <ul>
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        <li>Inicio <AiFillShop className="icono-sidebar" /></li>
      </NavLink>
      <NavLink to="/barberos" className={({ isActive }) => isActive ? 'active' : ''}>
        <li>Barberos <BiCut className="icono-sidebar" /></li>
      </NavLink>
      <NavLink to="/citas" className={({ isActive }) => isActive ? 'active' : ''}>
        <li>Citas <BsCalendar2MinusFill className="icono-sidebar" /></li>
      </NavLink>
      <li className='iniciarSesion'>Inicial sesion</li>
      </ul>
    </div>
  )
}

export default Sidebar