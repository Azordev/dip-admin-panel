import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Event, EventEditable } from '@/services/GraphQL/events/types'
import ClientOnly from '../../Shared/ClientOnly'

interface EditEventFormProps {
  onSubmit: (_formData: EventEditable) => void
  loading: boolean
  originalData?: Event
}
const EditEventForm: FC<EditEventFormProps> = ({ onSubmit, loading, originalData: originalEvent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <ClientOnly>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="title"
          defaultValue={originalEvent?.title}
          {...register('title', { required: true })}
        />
        {errors.title && <small className="text-red-500">{errors.title.message}</small>}
        <input
          type="text"
          placeholder="description"
          defaultValue={originalEvent?.description}
          {...register('description', { required: false })}
        />
        <input
          type="datetime-local"
          defaultValue={originalEvent?.date.slice(0, 19) as string}
          {...register('date', { required: true })}
        />
        <select defaultValue={originalEvent?.type ?? ''} {...register('type', { required: true })}>
          <option value="ATTENDANCE" selected={originalEvent?.type === 'ATTENDANCE'}>
            Evento
          </option>
          <option value="WORKSHOP" selected={originalEvent?.type === 'WORKSHOP'}>
            Convocatoria
          </option>
        </select>
        <button type="submit">{buttonText}</button>
      </form>
    </ClientOnly>
  )
}

export default EditEventForm
