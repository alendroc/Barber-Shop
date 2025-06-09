import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const showSuccessAlert = () => {
  MySwal.fire({
    title: '¡Éxito!',
    text: 'La operación se realizó correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
}
