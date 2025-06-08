import React from 'react';
import Tabla from '../../components/tablas/tabla';
import './tablaPague.css'
const columns = [
  { title: 'Nombre', data: 'nombre', className: 'dt-left' },
  { title: 'Apellido', data: 'apellido', className: 'dt-left' },
  { title: 'Correo', data: 'correo', className: 'dt-left' },
  { title: 'Telefono', data: 'telefono', className: 'dt-left' }
];

const data = [
  { nombre: 'Juan', apellido: 'Juare', correo: 'juan@example.com', telefono: '666' },
  { nombre: 'Ana', apellido:'Juare', correo: 'ana@example.com', telefono: '666' },
  { nombre: 'Luis', apellido:'Juare', correo: 'luis@example.com', telefono: '666' },  
  { nombre: 'Juan', apellido: 'Juare', correo: 'juan@example.com', telefono: '666' },
  { nombre: 'Ana', apellido:'Juare', correo: 'ana@example.com', telefono: '666' },
  { nombre: 'Luis', apellido:'Juare', correo: 'luis@example.com', telefono: '666' },
    { nombre: 'Juan', apellido: 'Juare', correo: 'juan@example.com', telefono: '666' },
  { nombre: 'Ana', apellido:'Juare', correo: 'ana@example.com', telefono: '666' },
  { nombre: 'Luis', apellido:'Juare', correo: 'luis@example.com', telefono: '666' },  
  { nombre: 'Juan', apellido: 'Juare', correo: 'juan@example.com', telefono: '666' },
  { nombre: 'Ana', apellido:'Juare', correo: 'ana@example.com', telefono: '666' },
  { nombre: 'Luis', apellido:'Juare', correo: 'luis@example.com', telefono: '666' },
];

const usuarios = () => (
  <div className='tabla-contenida'>
    <h2>Tabla de Usuarios</h2>
    <Tabla columns={columns} data={data} />
  </div>
);

export default usuarios;