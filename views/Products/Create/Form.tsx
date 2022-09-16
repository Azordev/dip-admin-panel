import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'
import styles from '@/styles/EditEvent.module.scss'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const router = useRouter()

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
      <label className="image font-visby">Añadir imagen</label>
      {errors.imageUrl && <small className="text-red-500">{errors.imageUrl.message}</small>}
      <div className="button-container">
        <Button className={styles['button-save']} type="submit">
          {loading ? 'Guardando' : 'Guardar'}
        </Button>
        <Button className={styles['button-cancel']} onClick={() => router.push('/productos')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default CreateProductForm
