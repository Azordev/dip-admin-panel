import { GetServerSideProps, NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import { Event } from '@/services/GraphQL/events/types'
import EventsList from '@/views/Events/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getEvents } from 'controllers/events'

interface PageProps {
  events: Event[]
}

const Events: NextPage<PageProps> = ({ events }) => {
  if (!events || events.length < 1) return <EmptyList text="No hay eventos" />
  return (
    <ClientOnly>
      <>
        <ListHeader createText="Crear nuevo evento" createPath="/eventos/crear" />
        <EventsList events={events} />
      </>
    </ClientOnly>
  )
}

export default Events

export const getServerSideProps: GetServerSideProps = async () => {
  const { events } = await getEvents()

  return {
    props: {
      events: events || [],
    },
  }
}
