import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import useLogger from '@/hooks/useLogger'
import CreateEventLayout from '@/views/Events/Create'
import { EventEditableWithFiles } from '@/views/Events/Create/Form'

const isEventOrWorkshop = (type: boolean | undefined): string => (type ? 'WORKSHOP' : 'ATTENDANCE')

const Create: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler = async (formValues: EventEditableWithFiles, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    try {
      const form = new FormData(e.target as HTMLFormElement)
      form.set('type', isEventOrWorkshop(form.get('type') as unknown as boolean))
      form.set('date', formValues.date.concat('T', formValues.time || '00:00', ':00'))

      await axios.post('/api/events', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      push('/eventos')
      setLoading(false)
    } catch (error) {
      logError(error as Error, 'pages/eventos/crear.tsx', 'Error al crear el evento')
      setLoading(false)
    }
  }

  return <CreateEventLayout onSubmit={submitHandler} loading={loading} />
}

export default Create
