import React from "react";
import Drawer from "@mui/material/Drawer";
import "./modalSidebar.css"
import { HiScissors } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";

const SidebarDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div className="drawerBody">
        <h2>Tus citas</h2>
        <div style={{ padding: '0 10px'}}>
           <div className="cardCitas">
            <div className="cardArriba">
                <div className="barberoNombre">
                    <HiScissors className="iconoTijeras"/>
                    <p>Luis Ramirez</p>
                </div>
                <div className="precios">
                    <p><span>₡</span> 4000</p>
                </div>
            </div>
            <div className="fechaTrash">
                <div className="fechaCita">
                <p>05/06/2025</p>
                <p>11:00 pm</p>
            </div>
                <button className="Trash"><FaTrashAlt ></FaTrashAlt></button>
            </div>
            
           </div> 
        </div>
      </div>
    </Drawer>
  );
};

export default SidebarDrawer;