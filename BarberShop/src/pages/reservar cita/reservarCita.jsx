import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reservarCita.css";
import { format } from "date-fns";
import DialogConfirmarCita from "./dialogConfirmarCita/dialogConfirmarCita";
import { cargarCitas, registrarCita } from "../../controllers/citaController";

const reservarCita = () => {
  const location = useLocation();
  const { barbero } = location?.state || {};
  const [fecha, setFecha] = useState(new Date());
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // const citasRegistradas = [
  //   { fecha: "2025-06-05", hora: "10:00" },
  //   { fecha: "2025-06-06", hora: "11:00" },
  //   { fecha: "2025-06-07", hora: "11:00" },
  //   { fecha: "2025-06-07", hora: "3:00" },
  //   { fecha: "2025-06-07", hora: "4:00" },
  // ];
  const horasDisponibles = [
    "10:00 am",
    "11:00 am",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
  ];
  const fechaFormateada = format(fecha, "yyyy-MM-dd");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const [citasRegistradas, setCitasRegistradas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cargarCitas();
        console.log(response);

        setCitasRegistradas(response || []);
      } catch (error) {
        console.error("Error cargando citas:", error);
      }
    };

    fetchData();
  }, []);

  const confirmarCita = async () => {
    console.log(
      `Cita confirmada el ${fechaFormateada} a las ${horaSeleccionada}`
    );

    const input = {
      fecha: fechaFormateada,
      hora: horaSeleccionada,
      barbero: barbero.id,
    };
    console.log("data", input);
    const result = await registrarCita(input);
    if (result) {
      console.log("Cita agregada correctamente");
      const nuevasCitas = await cargarCitas();
      setCitasRegistradas(nuevasCitas || []);
    }
    setDialogOpen(false);
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
                  onChange={setFecha}
                  value={fecha}
                  minDate={today}
                  maxDate={maxDate}
                />
              </div>
              <div className="horas">
                {horasDisponibles.map((hora, index) => {
                  const horaFormateada = hora;
                  // .replace(" am", "")
                  // .replace(" pm", "");
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
                        if (!citaOcupada) {
                          console.log(`Hora seleccionada: ${hora}`);
                          setHoraSeleccionada(hora);
                          setDialogOpen(true);
                        }
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
