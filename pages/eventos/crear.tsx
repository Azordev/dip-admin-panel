import { useMutation } from '@apollo/client'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_EVENT } from '@/services/GraphQL/events/mutations'
import { type EventEditable } from '@/services/GraphQL/events/types'
import CreateEventLayout from '@/views/Events/Create'

const Create: NextPage = () => {
  const [createEvent, { loading, error: mutationError }] = useMutation(CREATE_EVENT)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (newEvent: EventEditable) => {
    newEvent.date = new Date(newEvent.date).toISOString()

    createEvent({ variables: newEvent })
    push('/eventos')
  }

  if (mutationError) logError(mutationError, 'pages/eventos/crear.tsx', 'Error al crear el evento')

  return <CreateEventLayout onSubmit={submitHandler} loading={loading} />
}

export default Create
