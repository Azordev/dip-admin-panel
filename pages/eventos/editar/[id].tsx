import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Swal from 'sweetalert2'

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
  const submitHandler = async (updatedEvent: EventEditable, e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    const formattedDate = updatedEvent.date.concat('T', updatedEvent?.time || '00:00', ':00')
    const formData = new FormData(e.target as HTMLFormElement)
    formData.set('date', formattedDate)
    formData.set('type', isEventOrWorkshop(updatedEvent.type as boolean))

    try {
      await axios.put(`/api/events/${query.id}`, formData)
      Swal.fire({
        title: 'Evento actualizado',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      })
      push(`/eventos`)
      setLoading(false)
    } catch (error: any) {
      logError(error, 'pages/eventos/editar/[id].tsx', 'Error al actualizar el evento')
      setLoading(false)
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
