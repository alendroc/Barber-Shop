import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AdminCitaModal from "../../components/adminModal/adminCitaModal";
import Tabla from "../../components/tablas/tabla";
import {
  cargarCitas,
  registrarCitaAdmin,
  eliminarCitaPorId,
} from "../../controllers/citaController";
import { cargarUsuarios } from "../../controllers/userController";
import { cargarBarberos } from "../../controllers/barberoController";
import "./tablaPage.css";
import Swal from "sweetalert2";
import { showAlert } from "../../components/alerta/alerta";

const columns = [
  {
    title: "",
    data: null,
    orderable: false,
    className: "dt-center",
    render: function () {
      return '<input type="checkbox" class="row-check" />';
    },
    width: "30px",
  },
  { title: "Fecha", data: "fecha", className: "dt-left" },
  { title: "Hora", data: "hora", className: "dt-left" },
  {
    title: "Usuario",
    data: "usuario",
    className: "dt-left",
    render: function (usuario) {
      return usuario ? `${usuario.nombre} ${usuario.apellido}` : "N/A";
    },
  },
  {
    title: "Barbero",
    data: "barbero",
    className: "dt-left",
    render: function (barbero) {
      return barbero
        ? `${barbero?.usuario?.nombre} ${barbero?.usuario?.apellido}`
        : "N/A";
    },
  },
];

const AdminCitas = () => {
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("crear");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    fetchCitas();
    fetchUsuarios();
    fetchBarberos();
  }, []);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const data = await cargarCitas();
      console.log("citas", data.data);
      setCitas(data.data || []);
    } catch (error) {
      setError(error);
      showAlert({
        mensaje: "Error al cargar citas.",
        icono: "error",
        background: "#b04949",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await cargarUsuarios();
      setUsuarios(data.data || []);
    } catch (error) {
      setError(error);
      showAlert({
        mensaje: "Error al cargar usuarios.",
        icono: "error",
        background: "#b04949",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBarberos = async () => {
    setLoading(true);
    try {
      const data = await cargarBarberos();
      setBarberos(data.data.barberos.items || []);
    } catch (error) {
      setError(error);
      showAlert({
        mensaje: "Error al cargar barberos.",
        icono: "error",
        background: "#b04949",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = () => {
    setModo("crear");
    setCitaSeleccionada(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchCitas();
  };

  const handleCreateCita = async (citaData) => {
    try {
      const respRegisterCita = await registrarCitaAdmin(citaData);
      if (respRegisterCita.state === "success") {
        showAlert({
          mensaje: "Cita creada exitosamente",
          icono: "success",
          background: "#387716",
        });
        fetchCitas();
        handleClose();
      } else {
        showAlert({
          mensaje: respRegisterCita.mensajeError || "Error al registrar cita",
          icono: "error",
          background: "#b04949",
        });
      }
    } catch (error) {
      setError(error);
      console.error("Error creating cita:", error);
      showAlert({
        mensaje: "Error al crear cita.",
        icono: "error",
        background: "#b04949",
      });
    }
  };

  const handleDeleteCita = async (id) => {
    try {
      const respDelCita = await eliminarCitaPorId(id);
      if (respDelCita.state === "success") {
        showAlert({
          mensaje: "Cita eliminada correctamente",
          icono: "success",
          background: "#387716",
        });
        fetchCitas();
        handleClose();
      } else {
        showAlert({
          mensaje: respDelCita.mensajeError || "Error al eliminar cita",
          icono: "error",
          background: "#b04949",
        });
      }
    } catch (error) {
      setError(error);
      console.error("Error deleting cita:", error);
      showAlert({
        mensaje: respDelCita.mensajeError || error || "Error al eliminar cita",
        icono: "error",
        background: "#b04949",
      });
    }
  };

  const botones = [
    { label: "Agregar", onClick: handleCrear },
    {
      label: "Eliminar",
      onClick: () => {
        const selectedRows = document.querySelectorAll(".row-check:checked");
        if (selectedRows.length > 0) {
          const selectedIds = Array.from(selectedRows).map(
            (row) => row.closest("tr").dataset.id
          );
          Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00d13f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡eliminarlo!",
            cancelButtonText: "Cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await Promise.all(
                  selectedIds.map((id) => handleDeleteCita(id))
                );
                fetchCitas();
              } catch (error) {
                console.error("Error deleting citas:", error);
              }
            }
          });
        } else {
          showAlert({
            mensaje: "Por favor, seleccione al menos una cita para eliminar.",
            icono: "warning",
            background: "#b8791b",
          });
        }
      },
    },
  ];

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="tabla-contenida">
      <h1>Administración de Citas</h1>
      <Tabla columns={columns} data={citas} buttons={botones} />

      <AdminCitaModal
        open={open}
        onClose={handleClose}
        modo={modo}
        cita={citaSeleccionada}
        usuarios={usuarios.filter((u) => u.rol === "usuario")}
        barberos={barberos}
        onCreate={handleCreateCita}
      />
    </div>
  );
};

export default AdminCitas;
