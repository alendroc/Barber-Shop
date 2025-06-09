import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reservarCita.css";
import { format } from "date-fns";
import DialogConfirmarCita from "./dialogConfirmarCita/dialogConfirmarCita";

const reservarCita = () => {
  const location = useLocation();
  const { barbero } = location?.state || {};
  console.log(barbero);
  const [value, setValue] = useState(new Date());

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const fechaSeleccionada = value;
  console.log(fechaSeleccionada);
  const citasRegistradas = [
    { fecha: "2025-06-05", hora: "10:00" },
    { fecha: "2025-06-06", hora: "11:00" },
    { fecha: "2025-06-07", hora: "11:00" },
    { fecha: "2025-06-07", hora: "3:00" },
    { fecha: "2025-06-07", hora: "4:00" },
  ];
  const horasDisponibles = [
    "10:00 am",
    "11:00 am",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
  ];
  const fechaFormateada = format(value, "yyyy-MM-dd");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const confirmarCita = () => {
    console.log(
      `Cita confirmada el ${fechaFormateada} a las ${horaSeleccionada}`
    );
    setDialogOpen(false);
    // Aquí podrías guardar la cita con una llamada a la API
  };

  return (
    <>
      <div className="contenedorSacarCita">
        <div className="prueba">
          <h2>
            {barbero.usuario?.nombre} {barbero.usuario?.apellido} - Barberia
            victorino
          </h2>
          <div className="calendar-container">
            <div className="barberoInfo">
              <div className="img-name">
                <img src={barbero?.imagen || "wew"}></img>
                <h4>
                  {barbero.usuario?.nombre} {barbero.usuario?.apellido}
                </h4>
              </div>
              <div className="contenidoExtra">
                <p>Corte de cabello</p>
                <p>Duracion: 40 minutos</p>
                <p>₡ 4000</p>
              </div>
            </div>
            <div className="fechaHora">
              <div className="calendario">
                <Calendar
                  onChange={setValue}
                  value={value}
                  minDate={today}
                  maxDate={maxDate}
                />
              </div>
              <div className="horas">
                {horasDisponibles.map((hora, index) => {
                  const horaFormateada = hora
                    .replace(" am", "")
                    .replace(" pm", "");
                  const citaOcupada = citasRegistradas.some(
                    (cita) =>
                      cita.fecha === fechaFormateada &&
                      cita.hora === horaFormateada
                  );
                  return (
                    <div
                      key={index}
                      className={`buttonHora ${
                        citaOcupada ? "ocupado" : "disponible"
                      }`}
                      onClick={() => {
                        if (!citaOcupada)
                          console.log(`Hora seleccionada: ${hora}`);
                        setHoraSeleccionada(hora);
                        setDialogOpen(true);
                      }}
                    >
                      <div className="button-wrapper">
                        <div className="text">{hora}</div>
                        <span className="icon">
                          {citaOcupada ? "Ocupado" : "Disponible"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogConfirmarCita
        isOpen={dialogOpen}
        hora={horaSeleccionada}
        fecha={fechaFormateada}
        onConfirmar={confirmarCita}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};
export default reservarCita;
