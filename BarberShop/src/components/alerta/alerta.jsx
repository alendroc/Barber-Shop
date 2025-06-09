import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './alerta.css'
export const showSuccessAlert = ({ mensaje = '', icono = 'success', background = '#fff' }) => {
  console.log(mensaje,icono,background)
  const Toast = Swal.mixin({
  toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    background: background,
    color:  '#fff',
    customClass: {
      popup: 'mi-fuente'  // Clase CSS fija para aplicar fuente
    },
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    }
});
Toast.fire({
  icon: icono,
  title: mensaje
});
}
