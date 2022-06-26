import { FC, memo } from 'react'
import { useForm } from 'react-hook-form'

import { Provider, ProviderEditable } from '@/services/GraphQL/providers/types'

import ClientOnly from '../../Shared/ClientOnly'

interface EditProviderFormProps {
  onSubmit: (_formData: ProviderEditable) => void
  loading: boolean
  originalData?: Provider
}

const EditProviderForm: FC<EditProviderFormProps> = ({ onSubmit, loading, originalData: originalProvider }) => {
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
          defaultValue={originalProvider?.commercial_name}
          {...register('commercial_name', { required: true })}
        />
        {errors.commercial_name && <small className="text-red-500">{errors.commercial_name.message}</small>}
        <input type="text" defaultValue={originalProvider?.legal_name} {...register('legal_name')} />
        {errors.legal_name && <small className="text-red-500">{errors.legal_name.message}</small>}
        <input type="text" defaultValue={originalProvider?.b2b_email} {...register('b2b_email', { required: true })} />
        {errors.b2b_email && <small className="text-red-500">{errors.b2b_email.message}</small>}
        <input type="text" defaultValue={originalProvider?.sales_email} {...register('sales_email')} />
        {errors.sales_email && <small className="text-red-500">{errors.sales_email.message}</small>}
        <input type="text" defaultValue={originalProvider?.b2b_phone} {...register('b2b_phone')} />
        {errors.b2b_phone && <small className="text-red-500">{errors.b2b_phone.message}</small>}
        <input type="text" defaultValue={originalProvider?.sales_phone} {...register('sales_phone')} />
        {errors.sales_phone && <small className="text-red-500">{errors.sales_phone.message}</small>}
        <input type="text" defaultValue={originalProvider?.address} {...register('address')} />
        {errors.address && <small className="text-red-500">{errors.address.message}</small>}
        <input
          type="checkbox"
          defaultChecked={originalProvider?.is_active}
          {...register('is_active', { required: true })}
        />
        {errors.is_active && <small className="text-red-500">{errors.is_active.message}</small>}
        <input type="text" defaultValue={originalProvider?.details} {...register('details')} />
        {errors.details && <small className="text-red-500">{errors.details.message}</small>}
        <input type="text" defaultValue={originalProvider?.logo_url} {...register('logo_url')} />
        {errors.logo_url && <small className="text-red-500">{errors.logo_url.message}</small>}
        <input type="text" defaultValue={originalProvider?.avatar_url} {...register('avatar_url')} />
        {errors.avatar_url && <small className="text-red-500">{errors.avatar_url.message}</small>}
        <button type="submit">{buttonText}</button>
      </form>
    </ClientOnly>
  )
}

export default memo(EditProviderForm)
