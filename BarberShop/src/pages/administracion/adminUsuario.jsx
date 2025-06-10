import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AdminUsuarioModal from '../../components/adminModal/adminUsuarioModal';
import Tabla from '../../components/tablas/tabla';
import {
    cargarUsuarios,
    registrarUsuario,
    adminEditarUsuario,
    eliminarUsuarioPorId,
} from '../../controllers/userController';
import './tablaPage.css';
import Swal from 'sweetalert2';

const columns = [
    {
        title: '',
        data: null,
        orderable: false,
        className: 'dt-center',
        render: function () {
            return '<input type="checkbox" class="row-check" />';
        },
        width: '30px'
    },
    { title: 'Nombre', data: 'nombre', className: 'dt-left' },
    { title: 'Apellido', data: 'apellido', className: 'dt-left' },
    { title: 'Correo', data: 'correo', className: 'dt-left' },
    { title: 'Teléfono', data: 'telefono', className: 'dt-left' },
    { title: 'Rol', data: 'rol', className: 'dt-left' },
];

const AdminUsuarios = () => {
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState('crear');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const data = await cargarUsuarios(null);
         
            setUsuarios(data || []);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };


    const handleCrear = () => {
        setModo('crear');
        setUsuarioSeleccionado(null);
        setOpen(true);
    };

    const handleActualizar = (usuario) => {
        setModo('actualizar');
        setUsuarioSeleccionado(usuario);
        setOpen(true);
    };

    // const handleEliminar = (usuario) => {
    //     setModo('eliminar');
    //     setUsuarioSeleccionado(usuario);
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
        fetchUsuarios();
    };

    const handleCreateUsuario = async (usuarioData) => {
        try {
            
            const inputCorregido = {
                ...usuarioData,
                password: usuarioData.contrasena,
            };
            delete inputCorregido.contrasena;

            await registrarUsuario(inputCorregido);
            Swal.fire({
                title: "Usuario creado!",
                text: "El usuario ha sido creado correctamente.",
                icon: "success"
            });
            handleClose();
        } catch (error) {
            setError(error);
            console.error("Error al crear usuario:", error);
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al crear el usuario.",
                icon: "error"
            });
        }
    };

    const handleUpdateUsuario = async (usuarioData) => {
        try {
            const inputValido = {
                id: usuarioData.id,
                nombre: usuarioData.nombre,
                apellido: usuarioData.apellido,
                telefono: usuarioData.telefono,
                rol: usuarioData.rol
            };
            await adminEditarUsuario(inputValido);
            Swal.fire({
                title: "Usuario actualizado!",
                text: "El usuario ha sido actualizado correctamente.",
                icon: "success"
            });
            handleClose();
        } catch (error) {
            setError(error);
            console.error("Error al actualizar usuario:", error);
            Swal.fire({
                title: "Error!",
                text: "Hubo un error al actualizar el usuario.",
                icon: "error"
            });
        }
    };

    const handleDeleteUsuario = async (id) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00d13f",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡eliminarlo!",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await eliminarUsuarioPorId(id);
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "Tu archivo ha sido eliminado.",
                    icon: "success"
                });
                fetchUsuarios();
                handleClose();
            } catch (error) {
                setError(error);
                console.error("Error al borrar usuario:", error);
                Swal.fire({
                    title: "¡Error!",
                    text: "Hubo un error al eliminar el usuario.",
                    icon: "error"
                });
            }
        }
    });
};

    const botones = [
        { label: 'Agregar', onClick: handleCrear },
        {
            label: 'Actualizar', onClick: () => {
                const selectedRows = document.querySelectorAll('.row-check:checked');
                if (selectedRows.length === 1) {
                    const selectedId = selectedRows[0].closest('tr').dataset.id;
                    const usuario = usuarios.find(u => u.id === selectedId);
                    if (usuario) {
                        handleActualizar(usuario);
                    }
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Por favor, seleccione un usuario para actualizar.",
                        icon: "error"
                    });
                }
            }
        },
        {
            label: 'Eliminar', onClick: () => {
                const selectedRows = document.querySelectorAll('.row-check:checked');
                if (selectedRows.length > 0) {
                    const selectedIds = Array.from(selectedRows).map(row => row.closest('tr').dataset.id);
                    Promise.all(selectedIds.map(id => handleDeleteUsuario(id)))
                        .then(() => fetchUsuarios())
                        .catch(error => console.error("Error deleting usuarios:", error));
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Por favor, seleccione al menos un usuario para eliminar.",
                        icon: "error"
                    });
                }
            }
        }
    ];

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className='tabla-contenida'>
            <h2>Administración de Usuarios</h2>
            <Tabla columns={columns} data={usuarios} buttons={botones} />

            <AdminUsuarioModal
                open={open}
                onClose={handleClose}
                modo={modo}
                usuario={usuarioSeleccionado}
                onSubmit={
                    modo === 'crear'
                        ? handleCreateUsuario
                        : modo === 'actualizar'
                            ? handleUpdateUsuario
                            : handleDeleteUsuario
                }
            />
        </div>
    );
};

export default AdminUsuarios;