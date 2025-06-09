import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import '../../../node_modules/datatables.net-dt/css/dataTables.dataTables.css';
import './tabla.css'
const Tabla = ({ columns, data, buttons }) => {
  const tableRef = useRef();
    console.log('Botones:', buttons);
  useEffect(() => {
     if ($.fn.DataTable.isDataTable(tableRef.current)) {
    $(tableRef.current).DataTable().clear().destroy();
  }
    $(tableRef.current).DataTable({
      data,
      columns,
      paging: false,
      scrollY: '400px',
      scrollCollapse: true,
      searching: true,
      info: false,
      language: {
        search: 'Buscar:'
      },
      initComplete: function () {
        const searchContainer = $(tableRef.current).closest('.tablaCapa').find('.dt-search');
        searchContainer.css('display', 'flex');
        searchContainer.css('align-items', 'center');
        searchContainer.css('gap', '10px');

       if ($('#custom-buttons').length === 0 && buttons) {
  const buttonContainer = $('<div id="custom-buttons" style="display:flex; gap:10px;"></div>');
  buttons.forEach(btn => {
    const button = $(`<button type="button" class="boton">${btn.label}</button>`);
    button.on('click', (e) => {
      e.preventDefault();
      btn.onClick();
    });
    buttonContainer.append(button);
  });
  searchContainer.prepend(buttonContainer);
}
      }
    });

  }, [data, columns, buttons]);

  return (
    <div className='tablaCapa'>
      <table ref={tableRef} className="display" />
    </div>
  );
};

export default Tabla;