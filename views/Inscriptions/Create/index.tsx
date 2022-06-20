import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { InscriptionEditable } from '@/services/GraphQL/inscriptions/types'

interface CreateInscriptionFormProps {
  onSubmit: (_formData: InscriptionEditable) => void
  loading: boolean
}

const CreateInscriptionForm: FC<CreateInscriptionFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="member ID" {...register('member_id', { required: true })} />
      {errors.member_id && <small className="text-red-500">{errors.member_id.message}</small>}
      <input type="text" placeholder="event ID" {...register('event_id', { required: true })} />
      {errors.event_id && <small className="text-red-500">{errors.event_id.message}</small>}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateInscriptionForm
