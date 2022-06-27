import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { InscriptionEditable, MutableInscriptionFormProps } from '@/services/GraphQL/inscriptions/types'

const CreateInscriptionForm: FC<MutableInscriptionFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="member ID" {...register('memberId', { required: true })} />
      {errors.memberId && <small className="text-red-500">{errors.memberId.message}</small>}
      <input type="text" placeholder="event ID" {...register('eventId', { required: true })} />
      {errors.eventId && <small className="text-red-500">{errors.eventId.message}</small>}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateInscriptionForm
