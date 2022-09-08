import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import BackHeader from '@/components/BackHeader'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'

const CreateEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading }) => {
  const { push, query } = useRouter()
  const {
    register,
    formState: { errors },
  } = useForm<EventEditable>()
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <BackHeader parent={(query.provider as string) ?? 'Events'} parentImageUrl={query['provider-url'] as string} />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="title" {...register('title', { required: true })} />
        {errors.title && <small className="text-red-500">{errors.title.message}</small>}
        <input type="text" placeholder="description" {...register('description')} />
        <input type="datetime-local" {...register('date', { required: true })} />
        <input type="file" name="image" accept="image/*" />
        <select {...register('type', { required: true })}>
          <option value="ATTENDANCE">Evento</option>
          <option value="WORKSHOP">Convocatoria</option>
        </select>
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default CreateEventForm
