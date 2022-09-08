import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import BackHeader from '@/components/BackHeader'
import { MutableProviderFormProps, ProviderEditable } from '@/services/GraphQL/providers/types'

const CreateProviderForm: FC<MutableProviderFormProps> = ({ onSubmit, loading }) => {
  const { push, query } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <BackHeader parent={(query.provider as string) ?? 'Provider'} parentImageUrl={query['provider-url'] as string} />
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Comercial Name" {...register('commercialName', { required: true })} />
        {errors.commercialName && <span>This field is required</span>}
        <input type="text" placeholder="WhatsApp Phone" {...register('salesPhone')} />
        {errors.salesPhone && <span>This field is required</span>}
        <input type="number" min={0} placeholder="Order Index" {...register('orderIndex')} />
        <input type="text" placeholder="Plan" {...register('plan')} />
        <input type="text" placeholder="Logo URL" {...register('logoUrl')} />
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default CreateProviderForm
