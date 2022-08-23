import axios from 'axios'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import { Event } from '@/services/GraphQL/events/types'
import EventsList from '@/views/Events/List'
import ClientOnly from '@/views/Shared/ClientOnly'

interface Error {
  message: string
  status: boolean
}

const Events: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>({ message: '', status: false })

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get<{ events: Event[] }>('/api/events')
        setEvents(data.events)
        setLoading(false)
      } catch (err) {
        setError({ message: 'Error al obtener los eventos', status: true })
      }
    }

    getEvents()
  }, [])

  if (error?.status) return <div>Error: {error.message}</div>
  if (loading) return <Loading />
  if (events.length < 1) return <EmptyList text="No hay eventos" />
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
