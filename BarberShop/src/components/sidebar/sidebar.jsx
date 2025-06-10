import React,{useEffect, useState} from 'react'
import { AiFillShop } from "react-icons/ai";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import LoginModal from '../LoginModal/loginModal';
import { Menu, MenuItem, Fade } from '@mui/material';
import SidebarDrawer from '../modalSidebar/modalSidebar';
import { useAuth } from '../context/authContext';
import './Sidebar.css'

const Sidebar = () => {
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false); 
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, autenticado } = useAuth();
  const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
  const handleClose = () => {
   setAnchorEl(null);
  };



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
        <li  onClick={() => setDrawerOpen(true)}>Citas <BsCalendar2MinusFill className="icono-sidebar" /></li>
         {/* Acordeón Administración */}
        <li onClick={() => setAdminOpen(!adminOpen)} className={ !adminOpen ? "admin-header" :  "admin"}>
          Administración {adminOpen ? <MdExpandLess /> : <MdExpandMore />}
        </li>
        {adminOpen && (
          <ul className="submenu">
            <NavLink to="/admin/usuarios" className={({ isActive }) => isActive ? 'active' : ''}>
              <li><FaUser className="icono-sidebar" /> Usuarios</li>
            </NavLink>
            <NavLink to="/admin/barberos" className={({ isActive }) => isActive ? 'active' : ''}>
              <li><BiCut className="icono-sidebar" /> Barberos</li>
            </NavLink>
            <NavLink to="/admin/citas" className={({ isActive }) => isActive ? 'active' : ''}>
              <li><BsCalendar2MinusFill className="icono-sidebar" /> Citas</li>
            </NavLink>
          </ul>
        )}
         {!autenticado ? (
        <li className='iniciarSesion' onClick={() => setModal(true)}>Iniciar Sesión</li>
         ):(
           <>
           <li className='iniciarSesion' onClick={handleClick} style={{ cursor: 'pointer', userSelect: 'none' }} aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
            Usuario
          </li>
          <Menu id="fade-menu" anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} slotProps={{ list: {'aria-labelledby': 'fade-menu',},}}>
            <MenuItem onClick={logout}  style={{color: "#b73232", fontSize: "14px", padding: '0 10px', fontFamily:"Hammersmith One", minHeight: "auto"}}>Cerrar sesion</MenuItem>
          </Menu>
        </>
         )}
      </ul>
       <LoginModal isOpen={modal} onClose={() => setModal(false)}/>
       <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}

export default Sidebar