import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Member, MemberEditable } from '@/services/GraphQL/users/types'
import ClientOnly from '../../../Shared/ClientOnly'

interface EditMemberFormProps {
  onSubmit: (_formData: MemberEditable) => void
  loading: boolean
  originalData?: Member
}

const EditMemberForm: FC<EditMemberFormProps> = ({ onSubmit, loading, originalData: originalMember }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <ClientOnly>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="first_names"
          defaultValue={originalMember?.first_names}
          {...register('first_names', { required: true })}
        />
        {errors.last_names && <small className="text-red-500">{errors.last_names.message}</small>}
        <input
          type="text"
          placeholder="last_names"
          defaultValue={originalMember?.last_names}
          {...register('last_names')}
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={originalMember?.email}
          {...register('email', { required: true })}
        />
        {errors.email && <small className="text-red-500">{errors.email.message}</small>}
        <input type="text" placeholder="phone" defaultValue={originalMember?.phone} {...register('phone')} />
        <input type="text" placeholder="address" defaultValue={originalMember?.address} {...register('address')} />
        <input
          type="text"
          placeholder="contact_information"
          defaultValue={originalMember?.contact_information}
          {...register('contact_information')}
        />
        <input
          type="text"
          placeholder="private_information"
          defaultValue={originalMember?.private_information}
          {...register('private_information')}
        />
        <button type="submit">{buttonText}</button>
      </form>
    </ClientOnly>
  )
}

export default EditMemberForm
