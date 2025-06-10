import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './alerta.css'

export const showAlert = ({ mensaje = '', icono = 'success', background = '#fff' }) => {
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

export const optionAlertx = () => {
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
    });
  }
});
}
