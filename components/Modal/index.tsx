import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Modal(str: string, callback: any) {
  const MySwal = withReactContent(Swal)
  return MySwal.fire({
    backdrop: 'rgba(0, 0, 0, 0.7)',
    confirmButtonText: 'Aceptar',
    input: 'text',
    inputPlaceholder: 'ELIMINAR',
    padding: '50px 120px 40px',
    showCancelButton: true,
    html: '<p>Si desea eliminar este, escriba <span>ELIMINAR</span> en el siguiente recuadro.</p>',
    title: `¿Desea eliminar este ${str}?`,
    width: 874,
    // eslint-disable-next-line func-names
  }).then(confirmed => {
    if (confirmed.value === 'ELIMINAR') {
      // eslint-disable-next-line promise/no-callback-in-promise
      callback(confirmed.isConfirmed)
      return MySwal.fire('Eliminado!')
    } else {
      return false
    }
  })
}
