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
        <input type="text" defaultValue={originalProvider?.legalName} {...register('legalName')} />
        {errors.legalName && <small className="text-red-500">{errors.legalName.message}</small>}
        <input type="text" defaultValue={originalProvider?.b2bEmail} {...register('b2bEmail', { required: true })} />
        {errors.b2bEmail && <small className="text-red-500">{errors.b2bEmail.message}</small>}
        <input type="text" defaultValue={originalProvider?.salesEmail} {...register('salesEmail')} />
        {errors.salesEmail && <small className="text-red-500">{errors.salesEmail.message}</small>}
        <input type="text" defaultValue={originalProvider?.b2bPhone} {...register('b2bPhone')} />
        {errors.b2bPhone && <small className="text-red-500">{errors.b2bPhone.message}</small>}
        <input type="text" defaultValue={originalProvider?.salesPhone} {...register('salesPhone')} />
        {errors.salesPhone && <small className="text-red-500">{errors.salesPhone.message}</small>}
        <input type="text" defaultValue={originalProvider?.address} {...register('address')} />
        {errors.address && <small className="text-red-500">{errors.address.message}</small>}
        <input
          type="checkbox"
          defaultChecked={originalProvider?.isActive}
          {...register('isActive', { required: true })}
        />
        {errors.isActive && <small className="text-red-500">{errors.isActive.message}</small>}
        <input type="text" defaultValue={originalProvider?.details} {...register('details')} />
        {errors.details && <small className="text-red-500">{errors.details.message}</small>}
        <input type="text" defaultValue={originalProvider?.logoUrl} {...register('logoUrl')} />
        {errors.logoUrl && <small className="text-red-500">{errors.logoUrl.message}</small>}
        <input type="text" defaultValue={originalProvider?.avatarUrl} {...register('avatarUrl')} />
        {errors.avatarUrl && <small className="text-red-500">{errors.avatarUrl.message}</small>}
        <button type="submit">{buttonText}</button>
      </form>
    </ClientOnly>
  )
}

export default memo(EditProviderForm)
