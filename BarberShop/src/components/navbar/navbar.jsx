import React, { useState, useEffect } from "react";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu, MenuItem, Fade } from "@mui/material";
import LoginModal from "../LoginModal/loginModal";
import SidebarDrawer from "../modalSidebar/modalSidebar";
import { useAuth } from "../context/authContext";

import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout,  autenticado, token } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
  if (!autenticado) {
    console.log("autenticado",autenticado)
    setAdminOpen(false);
    setMenuOpen(false); 
  }
}, [autenticado]);


  return (
    <div className="navbar">
      <h2>BV</h2>
      <div className="sesion-Menu">
        {!autenticado ? (
          <li className="iniciarSesion" onClick={() => setModal(true)}>
            Iniciar Sesión
          </li>
        ) : (
          <>
            <div
              className="iniciarSesion"
              onClick={handleClick}
              style={{ cursor: "pointer", userSelect: "none" }}
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              Usuario
            </div>

            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              slotProps={{ list: { "aria-labelledby": "fade-menu" } }}
            >
              <MenuItem
                onClick={logout}
                style={{
                  color: "#b73232",
                  fontSize: "12px",
                  padding: "0 10px",
                  fontFamily: "Hammersmith One",
                  minHeight: "auto",
                }}
              >
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
        )}
        <input
          id="burger-checkbox"
          type="checkbox"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label className="burger" htmlFor="burger-checkbox">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <ul className={`ul-navbar ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <li>
            Inicio
            <AiFillShop className="icono-navbar" />
          </li>
        </Link>
        <Link to="/barberos" onClick={() => setMenuOpen(false)}>
          <li>
            Barberos
            <BiCut className="icono-navbar" />
          </li>
        </Link>
        <li onClick={() => setDrawerOpen(true)}>
          Citas
          <BsCalendar2MinusFill className="icono-navbar" />
        </li>

      {autenticado &&  token?.user?.rol === "barbero" &&(
  <>
    <li onClick={() => setAdminOpen(!adminOpen)} className="admin-header">
      Administración{" "}
      {adminOpen ? (
        <MdExpandLess className="flecha" />
      ) : (
        <MdExpandMore className="flecha" />
      )}
    </li>
    {adminOpen && (
      <ul className="submenu-navbar">
        <Link to="/admin/usuarios" onClick={() => { setMenuOpen(false); setAdminOpen(false); }}>
          <li><FaUser className="icono-navbar" /> Usuarios</li>
        </Link>
        <Link to="/admin/barberos" onClick={() => { setMenuOpen(false); setAdminOpen(false); }}>
          <li><BiCut className="icono-navbar" /> Barberos</li>
        </Link>
        <Link to="/admin/citas" onClick={() => { setMenuOpen(false); setAdminOpen(false); }}>
          <li><BsCalendar2MinusFill className="icono-navbar" /> Citas</li>
        </Link>
      </ul>
    )}
  </>
)}

      
      </ul>
      <LoginModal isOpen={modal} onClose={() => setModal(false)} />
      <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Navbar;
