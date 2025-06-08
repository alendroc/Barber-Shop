import React, { useState } from 'react';
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import LoginModal from '../LoginModal/loginModal';
import SidebarDrawer from '../modalSidebar/modalSidebar';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [adminOpen, setAdminOpen] = useState(false);
  return (
    <div className="navbar">
      <h2>BV</h2>
      <div className='sesion-Menu'>
        <li className='iniciarSesion' onClick={()=> setModal(true)}>Inicial sesion</li>
      <input id="burger-checkbox" type="checkbox" checked={menuOpen}  onClick={() => setMenuOpen(!menuOpen)}/>
         <label className="burger" htmlFor="burger-checkbox">
         <span></span>
         <span></span>
         <span></span>
        </label>
      </div>
      
       

      <ul className={`ul-navbar ${menuOpen ? 'open' : ''}`} >
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <li>Inicio<AiFillShop className='icono-navbar' /></li>
        </Link>
        <Link to="/barberos" onClick={() => setMenuOpen(false)}>
          <li>Barberos<BiCut className='icono-navbar' /></li>
        </Link>
          <li  onClick={() => setDrawerOpen(true)}>Citas<BsCalendar2MinusFill className='icono-navbar' /></li>
           <li onClick={() => setAdminOpen(!adminOpen)} className="admin-header">
          Administración {adminOpen ? <MdExpandLess className="flecha" /> : <MdExpandMore className="flecha"  />}
        </li>
        {adminOpen && (
          <ul className="submenu-navbar">
            <Link to="/admin/usuarios" onClick={() => setMenuOpen(false)}>
              <li><FaUser className="icono-navbar" /> Usuarios</li>
            </Link>
            <Link to="/admin/barberos" onClick={() => setMenuOpen(false)}>
              <li><BiCut className="icono-navbar" /> Barberos</li>
            </Link>
            <Link to="/admin/citas" onClick={() => setMenuOpen(false)}>
              <li><BsCalendar2MinusFill className="icono-navbar" /> Citas</li>
            </Link>
          </ul>
        )}  
      </ul>
      <LoginModal isOpen={modal} onClose={() => setModal(false)}/>
      <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Navbar;