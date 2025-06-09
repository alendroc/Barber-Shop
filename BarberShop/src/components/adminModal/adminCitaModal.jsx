import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdminCitaModal = ({ open, cita, onClose, modo, barberos, usuarios }) => {
    const [citaData, setCitaData] = useState(cita || {});
    const [selectedBarbero, setSelectedBarbero] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState('');

    useEffect(() => {
        setCitaData(cita || {});
        if (cita) {
            setSelectedBarbero(cita.barberoId || '');
            setSelectedUsuario(cita.usuarioId || '');
        }
    }, [cita]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes acceder a los valores de los campos del formulario
        console.log('Fecha:', citaData.fecha);
        console.log('Hora:', citaData.hora);
        console.log('Barbero:', selectedBarbero);
        console.log('Usuario:', selectedUsuario);

        if (modo === 'crear') {
            // Lógica para crear cita
            console.log('Crear cita:');
        } else if (modo === 'actualizar') {
            // Lógica para actualizar cita
            console.log('Actualizar cita:');
        } else if (modo === 'eliminar') {
            // Lógica para eliminar cita
            console.log('Eliminar cita:', citaData.id);
        }

        onClose();
    };

    const handleChange = (event) => {
        setCitaData({
            ...citaData,
            [event.target.name]: event.target.value,
        });
    };

    const handleBarberoChange = (event) => {
        setSelectedBarbero(event.target.value);
    };

    const handleUsuarioChange = (event) => {
        setSelectedUsuario(event.target.value);
    };

    const getTitle = () => {
        if (modo === 'crear') return 'Crear Cita';
        if (modo === 'actualizar') return 'Actualizar Cita';
        if (modo === 'eliminar') return 'Eliminar Cita';
        return 'Cita';
    };

    const getSubmitButtonText = () => {
        if (modo === 'crear') return 'Crear';
        if (modo === 'actualizar') return 'Actualizar';
        if (modo === 'eliminar') return 'Eliminar';
        return 'Guardar';
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, complete los campos necesarios.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="fecha"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={citaData.fecha || ''}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="hora"
                        label="Hora"
                        type="time"
                        fullWidth
                        variant="standard"
                        value={citaData.hora || ''}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="barbero-select-label">Barbero</InputLabel>
                        <Select
                            labelId="barbero-select-label"
                            id="barbero-select"
                            value={selectedBarbero}
                            label="Barbero"
                            onChange={handleBarberoChange}
                        >
                            {barberos && barberos.map((barbero) => (
                                <MenuItem key={barbero.id} value={barbero.id}>{barbero.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="usuario-select-label">Usuario</InputLabel>
                        <Select
                            labelId="usuario-select-label"
                            id="usuario-select"
                            value={selectedUsuario}
                            label="Usuario"
                            onChange={handleUsuarioChange}
                        >
                            {usuarios && usuarios.map((usuario) => (
                                <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">{getSubmitButtonText()}</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminCitaModal;