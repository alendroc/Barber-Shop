import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import UploadImage from '../imagen/UploadImage';
// import './adminBarbero.css';

const AdminBarberoModal = ({ open, barbero, onClose, modo, usuarios, onCreate, onUpdate, onDelete }) => {

    const [barberoData, setBarberoData] = useState(barbero || {
        usuario: '',
        imagen: '',
        descripcion: ''
    });
    const [selectedUsuario, setSelectedUsuario] = useState('');

    useEffect(() => {
        setBarberoData(barbero || {
            usuario: '',
            imagen: '',
            descripcion: ''
        });
        if (barbero) {
            setSelectedUsuario(barbero.usuario?.id || '');
        } else {
            setSelectedUsuario('');
        }
    }, [barbero]);

    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
        usuario: selectedUsuario,
        imagen: barberoData.imagen,
        descripcion: barberoData.descripcion
    };

    if (modo === 'crear') {
        onCreate && onCreate(formData);  
    } else if (modo === 'actualizar') {
        onUpdate && onUpdate({ id: barbero?.id, ...formData });  
    } else if (modo === 'eliminar') {
        onDelete && onDelete(barbero?.id);  
    }

    onClose();
};


    const handleChange = (event) => {
        setBarberoData({
            ...barberoData,
            [event.target.name]: event.target.value,
        });
    };

    const handleUsuarioChange = (event) => {
        setSelectedUsuario(event.target.value);
    };

    const getTitle = () => {
        if (modo === 'crear') return 'Crear Barbero';
        if (modo === 'actualizar') return 'Actualizar Barbero';
        if (modo === 'eliminar') return 'Eliminar Barbero';
        return 'Barbero';
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
                    <UploadImage/>

                    <TextField
                        margin="dense"
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={barberoData.descripcion || ''}
                        onChange={handleChange}
                        required
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">{getSubmitButtonText()}</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminBarberoModal;
