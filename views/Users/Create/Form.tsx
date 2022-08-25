import { FC } from 'react'
import { useForm } from 'react-hook-form'

import BackHeader from '@/components/BackHeader'
import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'
const CreateUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <div>
      <BackHeader parent={'Socios'} />
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="member_code" {...register('memberCode', { required: true })} />
        {errors.memberCode && <small className="text-red-500">{errors.memberCode.message}</small>}
        <input type="text" placeholder="password" {...register('password', { required: true })} />
        {errors.password && <small className="text-red-500">{errors.password.message}</small>}
        <input type="text" placeholder="position" {...register('position')} />
        {errors.position && <small className="text-red-500">{errors.position.message}</small>}
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  )
}

export default CreateUserForm
