import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)

export default function Modal(str) {
  return Swal.fire({
    customClass: {
      title: 'swalTitle',
    },
    allowOutsideClick: () => !Swal.isLoading(),
    cancelButtonColor: '#AFABAB',
    confirmButtonColor: '#B2BF55',
    confirmButtonText: 'Aceptar',
    height: 874,
    input: 'text',
    inputValidator: value => {
      if (value !== 'ELIMINAR') {
        return 'You need to write something!'
      }
    },
    inputValue: 'ELIMINAR',
    padding: '58px 140px',
    preConfirm: str => {},
    showCancelButton: true,
    showLoaderOnConfirm: true,
    text: `Si desea eliminar este ${str}, escriba ELIMINAR en el siguiente recuadro.`,
    title: `¿Desea eliminar este ${str}?`,
    width: 874,
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Evento eliminado',
      })
    }
  })
}
