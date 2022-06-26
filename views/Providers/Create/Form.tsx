import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProviderFormProps, ProviderEditable } from '@/services/GraphQL/providers/types'

const CreateProviderForm: FC<MutableProviderFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Comercial Name" {...register('commercialName', { required: true })} />
      {errors.commercialName && <span>This field is required</span>}
      <input type="text" placeholder="Address" {...register('address')} />
      <input type="text" placeholder="Sales Phone" {...register('salesPhone')} />
      <input type="text" placeholder="B2B Phone" {...register('b2bPhone')} />
      <input type="text" placeholder="Sales Email" {...register('salesEmail')} />
      <input type="text" placeholder="B2B Email" {...register('b2bEmail', { required: true })} />
      {errors.b2bEmail && <span>This field is required</span>}
      <input type="text" placeholder="Legal Name" {...register('legalName')} />
      <input type="text" placeholder="Details" {...register('details')} />
      <input type="text" placeholder="Logo URL" {...register('logoUrl')} />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateProviderForm
