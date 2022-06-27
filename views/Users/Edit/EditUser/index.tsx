import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { User, UserEditable } from '@/services/GraphQL/users/types'

import ClientOnly from '../../../Shared/ClientOnly'

interface EditUserFormProps {
  onSubmit: (_formData: UserEditable) => void
  loading: boolean
  originalData?: User
}

const EditUserForm: FC<EditUserFormProps> = ({ onSubmit, loading, originalData: originalUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <ClientOnly>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="member_code"
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
    </ClientOnly>
  )
}

export default EditUserForm
