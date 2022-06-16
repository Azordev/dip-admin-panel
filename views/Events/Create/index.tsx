import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { EventEditable } from '@/services/GraphQL/events/types'

interface CreateEventFormProps {
  onSubmit: (_formData: EventEditable) => void
  loading: boolean
}

const CreateEventForm: FC<CreateEventFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="title" {...register('title', { required: true })} />
      {errors.title && <small className="text-red-500">{errors.title.message}</small>}
      <input type="text" placeholder="description" {...register('description')} />
      <input type="datetime-local" {...register('date', { required: true })} />
      <select {...register('type', { required: true })}>
        <option value="ATTENDANCE">Evento</option>
        <option value="WORKSHOP">Convocatoria</option>
      </select>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateEventForm
