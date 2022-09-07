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
      <input
        type="text"
        placeholder="Escriba el nombre de la empresa"
        {...register('commercialName', { required: true })}
      />
      {errors.commercialName && <span>This field is required</span>}
      <input type="date" placeholder="DD/MM/AAAA" {...register('salesPhone')} />
      {errors.salesPhone && <span>This field is required</span>}
      <input type="text" min={0} placeholder="Escriba el usuario" {...register('orderIndex')} />
      <input type="text" placeholder="Escriba la contraseña" {...register('plan')} />
      <input type="text" placeholder="Logo URL" {...register('logoUrl')} />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateProviderForm
