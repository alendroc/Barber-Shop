import React, { useState } from 'react';
import { AiFillShop } from "react-icons/ai";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { BiCut } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <h2>BV</h2>
      <input id="burger-checkbox" type="checkbox"  onClick={() => setMenuOpen(!menuOpen)}/>
         <label className="burger" htmlFor="burger-checkbox">
         <span></span>
         <span></span>
         <span></span>
        </label>

     {/* <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <GiHamburgerMenu />
      </button>*/}

      <ul className={`ul-navbar ${menuOpen ? 'open' : ''}`} >
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <li>Inicio<AiFillShop className='icono-navbar' /></li>
        </Link>
        <Link to="/barberos" onClick={() => setMenuOpen(false)}>
          <li>Barberos<BiCut className='icono-navbar' /></li>
        </Link>
        <Link to="/citas" onClick={() => setMenuOpen(false)}>
          <li>Citas<BsCalendar2MinusFill className='icono-navbar' /></li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;