import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_EVENT_BY_ID } from '../../../services/GraphQL/queries/events'
import { UPDATE_EVENT } from '../../../services/GraphQL/mutations/events'
import { EventBase } from '../../../services/GraphQL/types/events'
import ClientOnly from '../../../views/Shared/ClientOnly'
import styles from '../../../styles/Home.module.css'
import { formatDate } from '../../../services/utils/dateFormat'
import { toast } from 'react-toastify'

const EditEvent: NextPage = () => {
  const [getOriginalEventData, { loading, data }] = useLazyQuery(GET_EVENT_BY_ID)
  const { push, query } = useRouter()
  const [updatedEvent, setUpdatedEvent] = useState<EventBase>({
    title: data?.title || '',
    description: data?.description || '',
    date: data?.date || '',
    type: data?.type || '',
  })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

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

      if (error || !called) {
        console.error(error)
        return toast('Error al obtener la información', { type: 'error' })
      }

      if (called && originalData) {
        const { event } = originalData
        setUpdatedEvent(event)
        setDate(event.date?.toString().slice(0, 16).split('T')[0] || '')
        setTime(event.date?.toString().slice(0, 16).split('T')[1] || '')
      }
    }

    if (query.id) getCurrentData(query.id as string)
  }, [query])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!updatedEvent.title || !updatedEvent.description || !updatedEvent.type || !date || !time) {
      return toast('Todos los campos son requeridos', { type: 'error' })
    }

    await updateEvent({ variables: { ...data.event, ...{ ...updatedEvent, date: formatDate(date, time) } } })
    push('/eventos')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value })

  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <ClientOnly>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>Editar Evento</h1>

          <form onSubmit={submitHandler}>
            <input type="text" name="title" onChange={changeHandler} value={updatedEvent.title} placeholder="title" />
            <input
              type="text"
              name="description"
              onChange={changeHandler}
              value={updatedEvent.description}
              placeholder="description"
            />
            <input type="date" name="date" onChange={e => setDate(e.target.value)} value={date} placeholder="date" />
            <input type="time" name="time" onChange={e => setTime(e.target.value)} value={time} placeholder="date" />
            {/* <input type="text" name="type"   placeholder="type" /> */}
            <select name="type" onChange={changeHandler} value={updatedEvent.type}>
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
            </select>
            <button type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    </ClientOnly>
  )
}

export default EditEvent
