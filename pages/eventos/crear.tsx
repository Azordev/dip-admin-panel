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

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    const formData = new FormData()

    Object.entries(event).forEach(([key, value]) => {
      if (key === 'image' || key === 'pdf') {
        formData.set(key, value[0])
      } else {
        formData.set(key, value)
      }
    })

    try {
      await axios.post('/api/events', formData)
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
