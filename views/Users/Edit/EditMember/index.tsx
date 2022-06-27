import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MemberEditable, MutableMemberFormProps } from '@/services/GraphQL/users/types'

const EditMemberForm: FC<MutableMemberFormProps> = ({ onSubmit, loading, originalData: originalMember }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="firstNames"
        defaultValue={originalMember?.firstNames}
        {...register('firstNames', { required: true })}
      />
      {errors.lastNames && <small className="text-red-500">{errors.lastNames.message}</small>}
      <input type="text" placeholder="lastNames" defaultValue={originalMember?.lastNames} {...register('lastNames')} />
      <input
        type="text"
        placeholder="email"
        defaultValue={originalMember?.email}
        {...register('email', { required: true })}
      />
      {errors.email && <small className="text-red-500">{errors.email.message}</small>}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default EditMemberForm
