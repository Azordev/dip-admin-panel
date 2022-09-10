import { GetServerSideProps, NextPage } from 'next'

import EmptyItem from '@/components/EmptyItem'
import { Attendee } from '@/services/GraphQL/inscriptions/types'
import ClientOnly from '@/views/Shared/ClientOnly'

import AttendeesContainers from 'containers/Asistentes/AttendeesContainer'
import { getInscriptionsByEvent } from 'controllers/inscriptions'

interface PageProps {
  attendees: Attendee[]
}

const Attendees: NextPage<PageProps> = ({ attendees }) => {
  if (!attendees || attendees.length < 1) return <EmptyItem text="La inscripción esta vacía o es invalida" />
  return (
    <div>
      <ClientOnly>
        <AttendeesContainers attendees={attendees} />
      </ClientOnly>
    </div>
  )
}

export default Attendees

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { eventId } = ctx.query

  const { attendees } = await getInscriptionsByEvent(eventId as string)

  return {
    props: {
      attendees,
    },
  }
}
