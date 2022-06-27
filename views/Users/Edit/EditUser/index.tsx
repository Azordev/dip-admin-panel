import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'

const EditUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading, originalData: originalUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="memberCode"
        defaultValue={originalUser?.memberCode}
        {...register('memberCode', { required: true })}
      />
      {errors.memberCode && <small className="text-red-500">{errors.memberCode.message}</small>}
      <input type="password" placeholder="password" {...register('password', { required: true })} />
      <input
        type="text"
        placeholder="position"
        defaultValue={originalUser?.position}
        {...register('position', { required: true })}
      />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default EditUserForm
