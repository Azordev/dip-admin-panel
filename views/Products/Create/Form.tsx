import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form className="form-product" onSubmit={submitHandler}>
      <label className="text-size label" htmlFor="name">
        Nombre del Producto
      </label>
      <input
        className="input"
        id="name"
        type="text"
        placeholder="Escriba el nombre del evento..."
        {...register('name', { required: true })}
      />

      <label className="text-size label" htmlFor="basePriceSol">
        Precio del producto
      </label>

      <div className="container-price">
        <p className="price">S/.</p>
        <input className="input" type="text" placeholder="00.00" {...register('basePriceSol', { required: true })} />
        {errors.basePriceSol && <small className="text-red-500">{errors.basePriceSol.message}</small>}
      </div>

      <label className="text-size label" htmlFor="description">
        Descripción del producto
      </label>
      <textarea
        className="textarea"
        id="description"
        placeholder="Escribe aquí..."
        {...register('description', { required: true })}
      />
      {errors.description && <small className="text-red-500">{errors.description.message}</small>}

      <label className="text-size label">Añadir imagen del producto</label>
      <label
        className="image font-visby"
        // {...register('imageUrl', { required: true })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          // className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Añadir imagen
      </label>
      {errors.imageUrl && <small className="text-red-500">{errors.imageUrl.message}</small>}

      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateProductForm
