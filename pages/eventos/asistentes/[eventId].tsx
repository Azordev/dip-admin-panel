import { GetServerSideProps, NextPage } from 'next'

import { Event } from '@/services/GraphQL/events/types'
import { Attendee } from '@/services/GraphQL/inscriptions/types'
import ClientOnly from '@/views/Shared/ClientOnly'

import AttendeesContainers from 'containers/Asistentes/AttendeesContainer'
import { getEvent } from 'controllers/events'
import { getInscriptionsByEvent } from 'controllers/inscriptions'

interface PageProps {
  event: Event
  attendees: Attendee[]
}

const Attendees: NextPage<PageProps> = ({ attendees, event }) => {
  return (
    <div>
      <ClientOnly>
        <AttendeesContainers event={event} attendees={attendees} />
      </ClientOnly>
    </div>
  )
}

export default Attendees

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { eventId } = ctx.query

  const { attendees } = await getInscriptionsByEvent(eventId as string)
  const { event } = await getEvent(eventId as string)

  return {
    props: {
      attendees,
      event,
    },
  }
}
