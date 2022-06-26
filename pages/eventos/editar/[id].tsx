import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { UPDATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EVENT_BY_ID } from '@/services/GraphQL/events/queries'
import { EventEditable } from '@/services/GraphQL/events/types'
import UpdateEvent from '@/views/Events/Edit'

const EditEvent: NextPage = () => {
  const [updateEvent, { loading, error: mutationError }] = useMutation(UPDATE_EVENT)
  const { push, query } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (updatedEvent: EventEditable) => {
    const formattedDate = new Date(updatedEvent.date).toISOString()
    await updateEvent({
      variables: { ...updatedEvent, id: query.id, date: formattedDate },
    })
    push('/eventos')
  }

  if (mutationError) logError(mutationError, 'pages/eventos/editar/[id].tsx', 'Error al actualizar el evento')

  return (
    <UpdateFormContainer
      currentDataQuery={EVENT_BY_ID}
      submitHandler={submitHandler}
      isSubmitLoading={loading}
      UpdateForm={UpdateEvent}
    />
  )
}

export default EditEvent
