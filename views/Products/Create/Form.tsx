import { CurrencyInput } from 'input-currency-react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
        <Controller
          name="basePriceSol"
          control={control}
          render={() => (
            <CurrencyInput
              className="input-product font-visby"
              value="0"
              style={{ textAlign: 'left' }}
              options={{
                precision: 2,
                style: 'decimal',
              }}
              {...register('basePriceSol', { required: true })}
            />
          )}
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
      <button className="save" type="submit">
        {loading ? 'Guardando' : 'Guardar'}
      </button>
      <button className="delete" onClick={() => reset()}>
        Eliminar
      </button>
    </form>
  )
}

export default CreateProductForm
