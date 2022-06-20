import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Subscription, SubscriptionEditable } from '@/services/GraphQL/subscriptions/types'

interface EditSubscriptionFormProps {
  onSubmit: (_formData: SubscriptionEditable) => void
  loading: boolean
  originalData?: Subscription
}

const EditSubscriptionForm: FC<EditSubscriptionFormProps> = ({
  onSubmit,
  loading,
  originalData: originalSubscription,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="details"
          defaultValue={originalSubscription?.details}
          {...register('details')}
        />
        {errors.details && <small className="text-red-500">{errors.details.message}</small>}
        <input
          type="datetime-local"
          placeholder="expiration"
          defaultValue={originalSubscription?.expiration}
          {...register('expiration')}
        />
        {errors.expiration && <small className="text-red-500">{errors.expiration.message}</small>}
        <select defaultValue={originalSubscription?.status} {...register('status')}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default EditSubscriptionForm
