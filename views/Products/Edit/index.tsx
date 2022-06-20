import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Product, ProductEditable } from '@/services/GraphQL/products/types'

interface EditProductFormProps {
  onSubmit: (_formData: ProductEditable) => void
  loading: boolean
  originalData?: Product
}

const EditProductForm: FC<EditProductFormProps> = ({ onSubmit, loading, originalData: originalProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          defaultValue={originalProduct?.name}
          {...register('name', { required: true })}
        />
        {errors.name && <small className="text-red-500">{errors.name.message}</small>}
        <input
          type="text"
          placeholder="description"
          defaultValue={originalProduct?.description}
          {...register('description', { required: true })}
        />
        {errors.description && <small className="text-red-500">{errors.description.message}</small>}
        <input
          type="text"
          placeholder="image_url"
          defaultValue={originalProduct?.image_url}
          {...register('image_url', { required: true })}
        />
        {errors.image_url && <small className="text-red-500">{errors.image_url.message}</small>}
        <input
          type="text"
          placeholder="base_price_sol"
          defaultValue={originalProduct?.base_price_sol}
          {...register('base_price_sol', { required: true })}
        />
        {errors.base_price_sol && <small className="text-red-500">{errors.base_price_sol.message}</small>}
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default EditProductForm
