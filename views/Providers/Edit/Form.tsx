import { FC, memo } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProviderFormProps, ProviderEditable } from '@/services/GraphQL/providers/types'

import ClientOnly from '../../Shared/ClientOnly'

const EditProviderForm: FC<MutableProviderFormProps> = ({ onSubmit, loading, originalData: originalProvider }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <ClientOnly>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          defaultValue={originalProvider?.commercialName}
          {...register('commercialName', { required: true })}
        />
        {errors.commercialName && <small className="text-red-500">{errors.commercialName.message}</small>}
        <input type="text" defaultValue={originalProvider?.salesPhone} {...register('salesPhone')} />
        {errors.salesPhone && <small className="text-red-500">{errors.salesPhone.message}</small>}
        <input
          type="checkbox"
          defaultChecked={originalProvider?.isActive}
          {...register('isActive', { required: true })}
        />
        {errors.isActive && <small className="text-red-500">{errors.isActive.message}</small>}
        <input type="text" defaultValue={originalProvider?.logoUrl} {...register('logoUrl')} />
        {errors.logoUrl && <small className="text-red-500">{errors.logoUrl.message}</small>}
        <button type="submit">{buttonText}</button>
      </form>
    </ClientOnly>
  )
}

export default memo(EditProviderForm)
