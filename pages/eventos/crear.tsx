import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, FormEventHandler, useState } from 'react'

import useLogger from '@/hooks/useLogger'
import CreateEventLayout from '@/views/Events/Create'

const Create: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const { error: logError } = useLogger()

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData(e.target as HTMLFormElement)
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
