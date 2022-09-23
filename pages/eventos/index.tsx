import axios from 'axios'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'

import EventsContainers from '@/containers/Events/EventsContainer'
import { Event } from '@/services/GraphQL/events/types'
import ClientOnly from '@/views/Shared/ClientOnly'

interface EventsResponse {
  events: Event[]
  events_aggregate: {
    aggregate: {
      totalCount: number
    }
  }
}

const Events: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const getEvents = useCallback(async (limit: number, offset: number) => {
    const { data } = await axios.get<EventsResponse>('/api/events/', {
      params: {
        limit,
        offset,
      },
    })
    setEvents(data.events)
    setTotal(data.events_aggregate.aggregate.totalCount)
    setLoading(false)
  }, [])

  return (
    <ClientOnly>
      <EventsContainers events={events} totalEvents={total} onchangePage={getEvents} loading={loading} />
    </ClientOnly>
  )
}

export default Events
