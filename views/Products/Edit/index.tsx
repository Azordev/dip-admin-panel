import Image from 'next/image'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { SubmitHandler, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Button from '@/components/Button'
import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'
import stylesInput from '@/styles/EditEvent.module.scss'
import Picture from '@/views/SVGs/Picture'

interface ProductEditableWithImg extends ProductEditable {
  image?: FileList
}

const EditProductForm: FC<MutableProductFormProps> = ({ onSubmit, originalData, loading }) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const MAX_FILE_SIZE = 8000000
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditableWithImg>()
  const submitHandler = handleSubmit(onSubmit as SubmitHandler<ProductEditableWithImg>)
  useEffect(() => {
    setValue('description', originalData?.description)
    setValue('name', originalData?.name)
    setValue('basePriceSol', originalData?.basePriceSol)
  }, [originalData?.description, originalData?.name, setValue, getValues, originalData?.basePriceSol])

  const showModal = () => {}

  const handlePrice = (e: { value: any }) => setValue('basePriceSol', e.value)

  const handleFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]
    if (file && file.size >= MAX_FILE_SIZE) {
      return Swal.fire('Error', 'Imagen excede el tamaño maximo (8MB)', 'error')
    }
    if (file?.type.includes('image')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setImageUrl(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container">
      <form className="form-product" onSubmit={submitHandler}>
        <label className="text-size label" htmlFor="name">
          Nombre del Producto
        </label>
        <input
          className={`input-product font-visby ${errors.name && 'error'}`}
          id="name"
          type="text"
          placeholder="Escriba el nombre del producto..."
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
            value={originalData?.basePriceSol}
            {...register('basePriceSol', {
              required: true,
              validate: value => value !== 0,
            })}
          />
          {errors.basePriceSol && <small className={stylesInput['error-message']}>{errors.basePriceSol.message}</small>}
        </div>
        <label className="text-size label" htmlFor="description">
          Descripción del producto
        </label>
        <textarea
          className={`textarea font-visby ${errors.description && 'error'}`}
          id="description"
          placeholder="Escribe aquí..."
          {...register('description', { required: true })}
        />
        {errors.description && <small className={stylesInput['error-message']}>{errors.description.message}</small>}
        <label className="text-size label">Añadir imagen del producto</label>

        <div className={stylesInput['container-input']}>
          <input
            id="image-file"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className={stylesInput['input-file']}
            {...register('image')}
            onChange={handleFile}
          />
          <label htmlFor="image-file" className={stylesInput.image}>
            <figure>
              {imageUrl ? (
                <Image width={300} height={200} objectFit="contain" src={imageUrl} alt="Imagen del producto" />
              ) : (
                <Picture />
              )}
            </figure>
            <span className={stylesInput.label}>{imageFile?.name ? 'Cambiar imagen' : 'Añadir imagen'}</span>
          </label>
        </div>
        {errors.image && <small className={stylesInput['error-message']}>{errors.image.message}</small>}
        <div className="button-container">
          <Button disabled={loading} className={stylesInput['button-save']} type="submit">
            {loading ? 'Guardando' : 'Guardar'}
          </Button>
          <Button className={stylesInput['button-delete']} onClick={showModal}>
            Eliminar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm
