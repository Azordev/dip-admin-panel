import { FC } from 'react'

import BackHeader from '@/components/BackHeader'
import EmptyList from '@/components/EmptyList'
import { Event } from '@/services/GraphQL/events/types'
import { Attendee } from '@/services/GraphQL/inscriptions/types'
import AttendeesList from '@/views/Attendees/List'

interface PaginatedProps {
  attendees: Attendee[]
  event: Event
}

const AttendeesContainers: FC<PaginatedProps> = ({ attendees, event }) => (
  <>
    <BackHeader commercialName={event?.title} parentImageUrl={event?.imageUrl} />
    {attendees?.length > 0 ? (
      <AttendeesList attendees={attendees} />
    ) : (
      <EmptyList className="center-text" text="No se encuentran asistentes inscritos hasta el momento" />
    )}
  </>
)
export default AttendeesContainers
