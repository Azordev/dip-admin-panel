import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function DeleteModal(itemName: string, confirmButtonText: any) {
  const MySwal = withReactContent(Swal)
  return MySwal.fire({
    backdrop: 'rgba(0, 0, 0, 0.7)',
    confirmButtonText: 'Aceptar',
    input: 'text',
    inputPlaceholder: 'ELIMINAR',
    padding: '50px 120px 40px',
    showCancelButton: true,
    html: '<p>Si desea eliminar este,' + itemName + ' escriba <span>ELIMINAR</span> en el siguiente recuadro.</p>',
    title: `¿Desea eliminar este ${itemName}?`,
    width: 874,
  }).then(confirmed => {
    if (confirmed.value === 'ELIMINAR') {
      // eslint-disable-next-line promise/no-callback-in-promise
      confirmButtonText(confirmed.isConfirmed)
      return MySwal.fire('Eliminado!', '', 'success')
    } else {
      return MySwal.fire('Cancelado', '', 'info')
    }
  })
}
