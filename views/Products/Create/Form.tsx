import { FC } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)

  const handlePrice = (e: { value: any }) => {
    setValue('basePriceSol', e.value)
  }

  return (
    <form className="form-product" onSubmit={submitHandler}>
      <label className="text-size label" htmlFor="name">
        Nombre del Producto
      </label>
      <input
        className={`input-product font-visby ${errors.name && 'error'}`}
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
        <CurrencyFormat
          fixedDecimalScale={true}
          decimalScale={2}
          className={`input-product font-visby ${errors.basePriceSol && 'error'}`}
          type="text"
          allowNegative={false}
          isNumericString={true}
          placeholder="00.00"
          onValueChange={handlePrice}
          {...register('basePriceSol', {
            required: true,
            validate: value => value !== 0,
          })}
        />
      </div>
      <label className="text-size label" htmlFor="description">
        Descripción del producto
      </label>
      <textarea
        className={`textarea font-visby ${errors.description && 'error'}`}
        id="description"
        placeholder="Escribe aquí..."
        {...register('description')}
      />

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
