import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AdminBarberoModal from '../../components/adminModal/adminBarberoModal';
import Tabla from '../../components/tablas/tabla';
import { cargarBarberos, registrarBarbero } from '../../controllers/barberoController';
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
    { title: 'ID', data: 'id', className: 'dt-left' },
    {
        title: 'Imagen',
        data: 'imagen',
        className: 'dt-left',
        render: function (data) {
            return `<img src="${data}" alt="Imagen" width="50" />`;
        }
    }
    ,
    { title: 'Descripción', data: 'descripcion', className: 'dt-left' }
];

const AdminBarberos = () => {
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState('crear');
    const [barberoSeleccionado, setBarberoSeleccionado] = useState(null);
    const [barberos, setBarberos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBarberos();
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

    const handleEliminar = (barbero) => {
        setModo('eliminar');
        setBarberoSeleccionado(barbero);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        fetchBarberos();
    };

    const handleCreateBarbero = async (barberoData) => {
        try {
            await registrarBarbero(barberoData);
            fetchBarberos();
            handleClose();
        } catch (error) {
            setError(error);
            console.error("Error creating barbero:", error);
        }
    };

    const botones = [
        { label: 'Agregar', onClick: handleCrear },
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
                onCreate={handleCreateBarbero}
            />
        </div>
    );
};

export default AdminBarberos;