import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import '../../../node_modules/datatables.net-dt/css/dataTables.dataTables.css';
import './tabla.css'
const Tabla = ({ columns, data }) => {
  const tableRef = useRef();

  useEffect(() => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().clear().rows.add(data).draw();
    } else {
      $(tableRef.current).DataTable({
        data,
        columns,
         paging: false,            // 🚫 Sin paginación
         scrollY: '400px',         // 📏 Altura de la tabla
         scrollCollapse: true,     // ✔️ Colapsa si hay pocos datos
         searching: true,         // (opcional) desactiva buscador
         info: false,             // (opcional) oculta info de registros
          language: {
    search: 'Buscar:'  // ← Aquí cambias la palabra
    }
      });
    }

    // Cleanup
    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy(true);
      }
    };
  }, [data, columns]);

  return (
    <div className='tablaCapa'>
        <table ref={tableRef} className="display" style={{ }} />
    </div>
    
  );
};

export default Tabla;