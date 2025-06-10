import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AdminBarberoModal from '../../components/adminModal/adminBarberoModal';
import Tabla from '../../components/tablas/tabla';
import { cargarBarberos, registrarBarbero, adminEditarBarbero } from '../../controllers/barberoController';
import { cargarUsuarios } from '../../controllers/userController';
import './tablaPague.css';

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
    {
        title: 'Usuario',
        data: 'usuario',
        className: 'dt-left',
        render: function (usuario) {
            return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'N/A';
        }
    },
    {
        title: 'Imagen',
        data: 'imagen',
        className: 'dt-left',
        render: function (data) {
            const baseUrl = 'http://localhost:9001';
            return `<img src="${baseUrl}${data}" alt="Imagen" width="50" />`;
        }
    },
    { title: 'Descripción', data: 'descripcion', className: 'dt-left' }
];

const AdminBarberos = () => {
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState('crear');
    const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
    const [barberos, setBarberos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetchBarberos();
        fetchUsuarios();
    }, []);

    const fetchBarberos = async () => {
        setLoading(true);
        try {
            const data = await cargarBarberos();
            setBarberos(data.barberos.items || []);
            console.log("Barberos cargados:", data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const data = await cargarUsuarios();
            setUsuarios(data || []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCrear = () => {
        setModo('crear');
        setBarberoSeleccionado(null);
        setOpen(true);
    };

    const handleActualizar = (barbero) => {
        setModo('actualizar');
        setBarberoSeleccionado(barbero);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchBarberos();
    };

    const handleCreateBarbero = async (barberoData) => {
        try {
            const barberoDataWithImage = {
                ...barberoData,
                imagen: selectedImage,
            };
            await registrarBarbero(barberoDataWithImage);
            fetchBarberos();
            handleClose();
        } catch (error) {
            setError(error);
            console.error("Error creating barbero:", error);
        }
    };

    const handleUpdateBarbero = async (barberoData) => {
        try {
            const barberoDataWithImage = {
                ...barberoData,
                imagen: selectedImage,
            };
            const inputValido = {
                id: barberoData.id,
                imagen: barberoDataWithImage.imagen,
                descripcion: barberoData.descripcion
            };
            await adminEditarBarbero(inputValido);
            fetchBarberos();
            handleClose();
        } catch (error) {
            setError(error);
            console.error("Error al actualizar barbero:", error);
        }
    };

    const handleImage = (image) => {
        setSelectedImage(image);
    }

    const botones = [
        { label: 'Agregar', onClick: handleCrear },
        {
            label: 'Actualizar', onClick: () => {
                const selectedRows = document.querySelectorAll('.row-check:checked');
                if (selectedRows.length === 1) {
                    const selectedId = selectedRows[0].closest('tr').dataset.id;
                    const barbero = barberos.find(u => u.id === selectedId);
                    if (barbero) {
                        handleActualizar(barbero);
                    }
                } else {
                    alert('Por favor, seleccione un barbero para actualizar.');
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
            <h1>Barberos</h1>
            <Tabla columns={columns} data={barberos} buttons={botones} />

            <AdminBarberoModal
                open={open}
                onClose={handleClose}
                modo={modo}
                barbero={barberoSeleccionado}
                usuarios={usuarios.filter(u => u.rol === 'usuario')}
                onCreate={handleCreateBarbero}
                onUpdate={handleUpdateBarbero}
                setImage={handleImage}
            />
        </div>
    );
};

export default AdminBarberos;