import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'

import styles from './SaveorDelete.module.scss'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="name" {...register('name', { required: true })} />
      {errors.name && <small className="text-red-500">{errors.name.message}</small>}
      <input type="text" placeholder="description" {...register('description', { required: true })} />
      {errors.description && <small className="text-red-500">{errors.description.message}</small>}
      <input type="text" placeholder="image_url" {...register('imageUrl', { required: true })} />
      {errors.imageUrl && <small className="text-red-500">{errors.imageUrl.message}</small>}
      <input type="text" placeholder="base_price_sol" {...register('basePriceSol', { required: true })} />
      {errors.basePriceSol && <small className="text-red-500">{errors.basePriceSol.message}</small>}
      <button className={styles.save} type="submit">
        {buttonText}
      </button>
      <button className={styles.delete}>Delete</button>
    </form>
  )
}
export default CreateProductForm
