import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'

import { ImageSVG } from './AddImageSVG'
import styles from './SaveorDelete.module.scss'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)

  return (
    <form className="form-product" onSubmit={submitHandler}>
      <label className="text-size label" htmlFor="name">
        Nombre del Producto
      </label>
      <input
        className="input-product font-visby"
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
        <input
          className="input-product font-visby"
          type="text"
          placeholder="00.00"
          {...register('basePriceSol', { required: true })}
        />
        {errors.basePriceSol && <small className="text-red-500">{errors.basePriceSol.message}</small>}
      </div>

      <label className="text-size label" htmlFor="description">
        Descripción del producto
      </label>
      <textarea
        className="textarea font-visby"
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
        {ImageSVG}
        Añadir imagen
      </label>
      {errors.imageUrl && <small className="text-red-500">{errors.imageUrl.message}</small>}

      <input type="text" placeholder="base_price_sol" {...register('basePriceSol', { required: true })} />
      {errors.basePriceSol && <small className="text-red-500">{errors.basePriceSol.message}</small>}
      <button className={styles.save} type="submit">
        {loading ? 'Guardando' : 'Guardar'}
      </button>
      <button className={styles.delete} onClick={() => reset()}>
        Eliminar
      </button>
    </form>
  )
}

export default CreateProductForm
