import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useLazyQuery } from '@apollo/client'
import { EVENT_BY_ID } from '../../../services/GraphQL/events/queries'
import { UPDATE_EVENT } from '../../../services/GraphQL/events/mutations'
import { Event, EventEditable } from '../../../services/GraphQL/events/types'
import { toast } from 'react-toastify'
import Layout from './Layout'

const UpdateEvent: FC = () => {
  const [getOriginalEventData, { loading }] = useLazyQuery(EVENT_BY_ID)
  const { push, query } = useRouter()
  const [originalEvent, setOriginalEvent] = useState<Event>()
  const [updateEvent] = useMutation(UPDATE_EVENT)

  useEffect(() => {
    const getCurrentData = async (id: string) => {
      const {
        called,
        error,
        data: originalData,
      } = await getOriginalEventData({
        variables: {
          id,
        },
      })

      if (error) {
        console.error(error)
        return toast('Error al obtener la información', { type: 'error' })
      }

      if (called && originalData) {
        const { event } = originalData
        setOriginalEvent(event)
      }
    }

    if (query.id) getCurrentData(query.id as string)
  }, [query, originalEvent, getOriginalEventData])

  const submitHandler = async (updatedEvent: EventEditable) => {
    console.log(updatedEvent)
    const formattedDate = new Date(updatedEvent.date).toISOString()
    await updateEvent({
      variables: { ...originalEvent, ...updatedEvent, date: formattedDate },
    })
    push('/eventos')
  }

  return <Layout onSubmit={submitHandler} loading={loading} originalEvent={originalEvent} />
}

export default UpdateEvent
