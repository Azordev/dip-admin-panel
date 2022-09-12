import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import styles from './DeleteModal.module.scss'

export default function DeleteModal(itemName: string, confirmButtonText: (_isConfirmed: boolean) => void) {
  const MySwal = withReactContent(Swal)
  return MySwal.fire({
    backdrop: 'rgba(0, 0, 0, 0.7)',
    confirmButtonText: 'Aceptar',
    input: 'text',
    inputPlaceholder: 'ELIMINAR',
    padding: '50px 120px 40px',
    showCancelButton: true,
    html: (
      <p>
        Si desea eliminar {itemName}, escriba <span>ELIMINAR</span> en el siguiente recuadro.
      </p>
    ),
    title: <h2 className={styles['delete-modal-title']}>¿Desea eliminar {itemName}?</h2>,
    width: 874,
  }).then(confirmed => {
    if (/^eliminar$/i.test(confirmed.value)) {
      // eslint-disable-next-line promise/no-callback-in-promise
      confirmButtonText(confirmed.isConfirmed)
      return MySwal.fire('Eliminado!', '', 'success')
    } else {
      return MySwal.fire('Cancelado', '', 'info')
    }
  })
}
