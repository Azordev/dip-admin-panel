import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import ListHeader from '@/components/ListHeader'
import styles from '@/components/Paginated/Paginated.module.scss'
import { Attendee } from '@/services/GraphQL/inscriptions/types'
import AttendeesList from '@/views/Attendees/List'

interface PaginatedProps {
  attendees: Attendee[]
}

const AttendeesContainers: FC<PaginatedProps> = ({ attendees }) => {
  return (
    <div className={styles.relative}>
      {/* <ListHeader createText="Añadir socio" createPath="/socios/crear" /> */}
      <BackHeader />
      <AttendeesList attendees={attendees} />
    </div>
  )
}

export default AttendeesContainers
