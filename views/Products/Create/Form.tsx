import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'
import stylesInput from '@/styles/EditEvent.module.scss'

import styles from './SaveorDelete.module.scss'
const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const handleFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]
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
    <form className="form-product" onSubmit={submitHandler}>
      <label className="text-size label" htmlFor="name">
        Nombre del Producto
      </label>
      <input
        className="input-product font-visby"
        id="name"
        type="text"
        placeholder="Escriba el nombre del evento..."
        {...register('name', { required: { value: true, message: 'El campo no puede estar vacio' } })}
      />
      {errors.name && <small className="text-red-500">{errors.name.message}</small>}

      <label className="text-size label" htmlFor="basePriceSol">
        Precio del producto
      </label>

      <div className="container-price">
        <p className="price">S/.</p>
        <input
          className="input-product font-visby"
          type="text"
          id="basePriceSol"
          placeholder="00.00"
          {...register('name', { required: { value: true, message: 'Debe colocar un precio' } })}
        />
      </div>
      {errors.basePriceSol && <small className="text-red-500">{errors.basePriceSol.message}</small>}

      <label className="text-size label" htmlFor="description">
        Descripción del producto
      </label>
      <textarea
        className="textarea font-visby"
        id="description"
        placeholder="Escribe aquí..."
        {...register('description', { required: { value: true, message: 'El campo no puede estar vacio' } })}
      />
      {errors.description && <small className="text-red-500">{errors.description.message}</small>}

      <label className="text-size label">Añadir imagen del producto</label>
      <div className={stylesInput['image-section']}>
        <div className={stylesInput['container-input']}>
          <input
            id="image-file"
            type="file"
            accept="image/*"
            className={stylesInput['input-file']}
            {...register('imageUrl')}
            onChange={handleFile}
          />
          <label htmlFor="image-file" className={stylesInput.image}>
            <figure>
              <Image
                width={imageUrl ? 300 : 40}
                height={imageUrl ? 200 : 40}
                objectFit="contain"
                src={imageUrl || 'https://img.icons8.com/ios/100/image.png'}
                alt="Imagen del evento"
              />
            </figure>
            <span className={stylesInput.label}>{imageFile?.name ? 'Cambiar imagen' : 'Añadir imagen'}</span>
          </label>
        </div>
      </div>
      {errors.imageUrl && <small className="text-red-500">{errors.imageUrl.message}</small>}

      <input
        type="text"
        placeholder="base_price_sol"
        {...register('basePriceSol', { required: { value: true, message: 'Debe colocar un precio' } })}
      />
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
