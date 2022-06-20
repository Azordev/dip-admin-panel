import { UserEditable } from '@/services/GraphQL/users/types'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

interface CreateUserFormProps {
  onSubmit: (_formData: UserEditable) => void
  loading: boolean
}

const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="member_code" {...register('member_code', { required: true })} />
      {errors.member_code && <small className="text-red-500">{errors.member_code.message}</small>}
      <input type="text" placeholder="password" {...register('password', { required: true })} />
      {errors.password && <small className="text-red-500">{errors.password.message}</small>}
      <input type="text" placeholder="position" {...register('position')} />
      {errors.position && <small className="text-red-500">{errors.position.message}</small>}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateUserForm
