import React from "react";
import "./inicio.css";
import foto from "../img/victoryBarber.jpg";
import maquinilla from "../img/inicioMaquinilla.jpg";
import tijeras from "../img/tijeras.jpg";
const inicio = () => {
  return (
    <div className="inicio">
      <div className="ImagenInicio">
        <img className="imgVictory" src={foto} alt="Logo BarberShop" />
        <h1 className="tituloInicio">Barberia Victorino</h1>
      </div>
      <div className="SobreNosotros">
        <div className="carNosotros">
          <h2>Sobre Nosotros</h2>
          <p>
            En Barbería Victorino, ofrecemos un servicio de barbería excepcional
            con un equipo de profesionales altamente capacitados. Nos
            especializamos en cortes de cabello, afeitados y tratamientos
            capilares personalizados para cada cliente.
          </p>
        </div>
        <div className="fotoNosotros">
          <img className="imgNosotros" src={maquinilla} alt="Barbería" />
        </div>
      </div>
      <div className="dondeEstamos"> 
        <div className="fotoTijera">
          <img className="imgTijera" src={tijeras} alt="Barbería" />
        </div>
        <div className="carddondeEstamos">
          <h2>Sobre Nosotros</h2>
          <p>
            En Barbería Victorino, ofrecemos un servicio de barbería excepcional
            con un equipo de profesionales altamente capacitados. Nos
            especializamos en cortes de cabello, afeitados y tratamientos
            capilares personalizados para cada cliente.
          </p>
        </div>
       
      </div>
    </div>
  );
};

export default inicio;
