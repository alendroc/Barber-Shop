import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AdminCitaModal = ({ open, cita, onClose, modo, usuarios, barberos, onCreate }) => {
    const [citaData, setCitaData] = useState(cita || {
        fecha: '',
        hora: '',
        usuario: '',
        barbero: ''
    });
    const [selectedBarbero, setSelectedBarbero] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState('');

    useEffect(() => {
        setCitaData(cita || {
            fecha: '',
            hora: '',
            usuario: '',
            barbero: ''
        });
        if (cita && cita.usuario) {
            setSelectedUsuario(cita.usuario?.id || '');
        } else {
            setSelectedUsuario('');
        }
        if (cita && cita.barbero) {
            setSelectedBarbero(cita.barbero?.id || '');
        } else {
            setSelectedBarbero('');
        }
    }, [cita, usuarios, barberos]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            fecha: citaData.fecha,
            hora: citaData.hora,
            usuario: selectedUsuario,
            barbero: selectedBarbero
        };

        onCreate && onCreate(formData);
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
        return 'Cita';
    };

    const getSubmitButtonText = () => {
        if (modo === 'crear') return 'Crear';
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
                        margin="dense"
                        name="fecha"
                        label="Fecha"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={citaData.fecha || ''}
                        onChange={handleChange}
                        required
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
                        required
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="usuario-select-label">Usuario</InputLabel>
                        <Select
                            labelId="usuario-select-label"
                            id="usuario-select"
                            value={selectedUsuario}
                            label="Usuario"
                            onChange={handleUsuarioChange}
                            required
                        >
                            {usuarios && usuarios.map((usuario) => (
                                <MenuItem key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellido}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="barbero-select-label">Barbero</InputLabel>
                        <Select
                            labelId="barbero-select-label"
                            id="barbero-select"
                            value={selectedBarbero}
                            label="Barbero"
                            onChange={handleBarberoChange}
                            required
                        >
                            {barberos && barberos.map((barbero) => (
                                <MenuItem key={barbero.id} value={barbero.id}>{barbero.usuario.nombre} {barbero.usuario.apellido}</MenuItem>
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