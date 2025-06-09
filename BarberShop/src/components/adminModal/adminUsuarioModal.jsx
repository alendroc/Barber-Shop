import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AdminUsuarioModal = ({ open, onClose, modo, usuario, onSubmit }) => {
    const [usuarioData, setUsuarioData] = React.useState(usuario || {});

    React.useEffect(() => {
        setUsuarioData(usuario || {});
    }, [usuario]);

    const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    let dataToSend = { ...usuarioData, ...formJson };

    if (modo === 'crear') {
        onSubmit(dataToSend); 
    } else if (modo === 'actualizar') {
        dataToSend.id = usuarioData.id;
        onSubmit(dataToSend); 
    } else if (modo === 'eliminar') {
        onSubmit(usuarioData.id); 
    }

    onClose();
};

    const handleChange = (event) => {
        setUsuarioData({
            ...usuarioData,
            [event.target.name]: event.target.value,
        });
    };

    const getTitle = () => {
        if (modo === 'crear') return 'Crear Usuario';
        if (modo === 'actualizar') return 'Actualizar Usuario';
        if (modo === 'eliminar') return 'Eliminar Usuario';
        return 'Usuario';
    };

    const getSubmitButtonText = () => {
        if (modo === 'crear') return 'Crear';
        if (modo === 'actualizar') return 'Actualizar';
        if (modo === 'eliminar') return 'Eliminar';
        return 'Guardar';
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
            }}
        >
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {modo === 'crear' ? 'Ingrese los datos del nuevo usuario.' :
                        modo === 'actualizar' ? 'Modifique los datos del usuario.' :
                            '¿Está seguro que desea eliminar este usuario?'}
                </DialogContentText>
                {modo !== 'eliminar' && (
                    <>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={usuarioData.nombre || ''}
                            onChange={handleChange}
                            inputProps={{ maxLength: 40 }}
                            helperText="Max 40 characters"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="lastName"
                            name="apellido"
                            label="Apellido"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={usuarioData.apellido || ''}
                            onChange={handleChange}
                            inputProps={{ maxLength: 40 }}
                            helperText="Max 40 characters"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="email"
                            name="correo"
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={usuarioData.correo || ''}
                            InputProps={{
                                readOnly: modo === 'actualizar',
                            }}
                            onChange={handleChange}
                            inputProps={{ maxLength: 50 }}
                            helperText="Max 50 characters"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone"
                            name="telefono"
                            label="Teléfono"
                            type="tel"
                            fullWidth
                            variant="standard"
                            value={usuarioData.telefono || ''}
                            onChange={handleChange}
                            inputProps={{ pattern: '^\\+?[0-9]{10,15}$' }}
                            helperText="Must be a valid phone number (10-15 digits, optional +)."
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            name="contrasena"
                            label="Contraseña"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            inputProps={{ pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$' }}
                            helperText="Must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">{getSubmitButtonText()}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdminUsuarioModal;