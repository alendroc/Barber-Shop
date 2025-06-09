import React, {useState} from 'react';
import Tabla from '../../components/tablas/tabla';
import './tablaPague.css'
const columns = [
     {
    title: '',       // Sin título
    data: null,      // No necesita campo en `data`
    orderable: false, // No se puede ordenar
    className: 'dt-center',
    render: function () {
      return '<input type="checkbox" class="row-check" />';
    },
    width: '30px'
  },
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

const usuarios = () => {
  const [showAgregar, setShowAgregar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);

  const botones = [
    { label: 'Agregar', onClick: () => setShowAgregar(true) },
    { label: 'Actualizar', onClick: () => setShowActualizar(true) },
    { label: 'Eliminar', onClick: () => setShowEliminar(true) }
  ];
   console.log("Agregar",showAgregar)
    return (
        <div className='tabla-contenida'>
    <h2>Tabla de Usuarios</h2>
    <div style={{padding: '10px'}}>
        <Tabla columns={columns} data={data} buttons={botones}/>
    </div>
    
  </div>

    )

}
  
export default usuarios;