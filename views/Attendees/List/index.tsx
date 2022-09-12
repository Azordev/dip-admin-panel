import { FC, useMemo } from 'react'

import Table, { TableData } from '@/components/Table'
import { Attendee } from '@/services/GraphQL/inscriptions/types'

import DeleteAttendee from './DeleteAttendee'

import styles from './attendeesList.module.scss'

const AttendeesList: FC<{ attendees: Attendee[] }> = ({ attendees }) => {
  const data: TableData[] = useMemo(() => {
    return attendees.map(attendee => {
      const member = `${attendee.member.firstNames} ${attendee.member.lastNames}`
      const isActive = Boolean(attendee.member.user.isActive)
      const code = `#${attendee.member.user.memberCode}`

      const Active = () => (
        <span className={`${styles.status} ${isActive ? styles.active : styles.inactive}`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      )

      return {
        id: attendee.id,
        items: [
          code,
          attendee.member.user.createdAt,
          member,
          attendee.member.email,
          '**********',
          <Active key={`active-${attendee.id}`} />,
          <DeleteAttendee key={`delete-${attendee.id}`} member={member} inscriptionId={attendee.id} />,
        ],
      }
    })
  }, [attendees])

  return (
    <div className={styles.attendees}>
      <Table headers={['CÓDIGO', 'Fecha', 'Socio', 'Correo electrónico', 'Contraseña', 'Estado']} data={data} />
    </div>
  )
}

export default AttendeesList
