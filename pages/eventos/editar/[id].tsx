import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { EVENT_BY_ID } from '@/services/GraphQL/events/queries'
import { EventEditable } from '@/services/GraphQL/events/types'
import UpdateEvent from '@/views/Events/Edit'

const isEventOrWorkshop = (type: boolean | undefined): string => (type ? 'WORKSHOP' : 'ATTENDANCE')

const EditEvent: NextPage = () => {
  const { push, query } = useRouter()
  const { error: logError } = useLogger()
  const [loading, setLoading] = useState(false)
  const submitHandler = async (updatedEvent: EventEditable) => {
    const formattedDate = updatedEvent.date.concat('T', updatedEvent?.time || '00:00', ':00')
    const formData = new FormData()

    Object.entries(updatedEvent).forEach(([key, value]) => {
      if (key === 'image' || key === 'pdf') {
        formData.set(key, value[0])
      } else {
        formData.set(key, value)
      }
    })
    formData.set('date', formattedDate)
    formData.set('type', isEventOrWorkshop(updatedEvent.type as boolean))

    try {
      setLoading(true)
      await axios.put(`/api/events/${query.id}`, formData)
      setLoading(false)
      push(`/eventos`)
    } catch (error: any) {
      setLoading(false)
      logError(error, 'pages/eventos/editar/[id].tsx', 'Error al actualizar el evento')
    }
  }

  return (
    <UpdateFormContainer
      currentDataQuery={EVENT_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={UpdateEvent}
      queryName="event"
    />
  )
}

export default EditEvent
