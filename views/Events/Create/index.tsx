import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_EVENT_BY_ID } from '../../../services/GraphQL/queries/events'
import { UPDATE_EVENT } from '../../../services/GraphQL/mutations/events'
import { EventBase } from '../../../services/GraphQL/types/events'
import { toast } from 'react-toastify'
import Layout from './Layout'

const UpdateEvent: FC = () => {
  const [getOriginalEventData, { loading }] = useLazyQuery(GET_EVENT_BY_ID)
  const { push, query } = useRouter()
  const [originalEvent, setOriginalEvent] = useState<EventBase>({
    title: '',
    description: '',
    date: '',
    type: '',
  })
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

  const submitHandler = async (updatedEvent: EventBase) => {
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
