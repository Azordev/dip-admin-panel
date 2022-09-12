import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import DeleteModal from '@/components/DeleteModal'

import styles from './attendeesList.module.scss'

const DeleteAttendee: FC<{ member: string; inscriptionId: string }> = ({ member, inscriptionId }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    const deleteInscription = async () => {
      await axios.delete(`/api/inscriptions/${inscriptionId}`)
    }

    if (confirmDelete) {
      deleteInscription()
    }
  }, [confirmDelete, inscriptionId])

  return (
    <svg
      viewBox="351.207 218.448 20 20"
      width={20}
      height={20}
      onClick={() => DeleteModal(`la inscripción de ${member}`, setConfirmDelete)}
      className={styles['delete-button']}
    >
      <path
        d="M 361.207 218.448 C 355.677 218.448 351.207 222.918 351.207 228.448 C 351.207 233.978 355.677 238.448 361.207 238.448 C 366.737 238.448 371.207 233.978 371.207 228.448 C 371.207 222.918 366.737 218.448 361.207 218.448 Z M 366.207 232.038 L 364.797 233.448 L 361.207 229.858 L 357.617 233.448 L 356.207 232.038 L 359.797 228.448 L 356.207 224.858 L 357.617 223.448 L 361.207 227.038 L 364.797 223.448 L 366.207 224.858 L 362.617 228.448 L 366.207 232.038 Z"
        style={{ fill: 'rgb(245, 40, 47)' }}
      />
    </svg>
  )
}

export default DeleteAttendee
