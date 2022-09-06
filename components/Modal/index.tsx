import Swal from 'sweetalert2'

export default function Modal(str: string, callback: any) {
  return Swal.fire({
    allowOutsideClick: () => !Swal.isLoading(),
    backdrop: 'rgba(0, 0, 0, 0.7)',
    confirmButtonText: 'Aceptar',
    input: 'text',
    inputValidator: value => {
      if (!value) {
        return 'Ingresa una palabra'
      } else if (value !== 'ELIMINAR') {
        return 'Palabra incorrecta'
      }
    },
    inputPlaceholder: 'ELIMINAR',
    padding: '50px 120px 40px',
    showCancelButton: true,
    html: '<p>Si desea eliminar este, escriba <span>ELIMINAR</span> en el siguiente recuadro.</p>',
    title: `¿Desea eliminar este ${str}?`,
    width: 874,
  }).then(confirmed => {
    if (confirmed.value === 'ELIMINAR') {
      // eslint-disable-next-line promise/no-callback-in-promise
      callback(confirmed.isConfirmed)
      return Swal.fire('Eliminado!')
    } else {
      return false
    }
  })
}
