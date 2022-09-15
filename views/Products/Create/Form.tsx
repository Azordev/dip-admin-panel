import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import { MutableProductFormProps, ProductEditable } from '@/services/GraphQL/products/types'
import stylesInput from '@/styles/EditEvent.module.scss'

interface ProductEditableWithImg extends ProductEditable {
  image?: FileList
}

const CreateProductForm: FC<MutableProductFormProps> = ({ onSubmit, loading }) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const MAX_FILE_SIZE = 8000000
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductEditableWithImg>()
  const submitHandler = handleSubmit(onSubmit as unknown as SubmitHandler<ProductEditableWithImg>)
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
      {errors.name && <small className={stylesInput['error-message']}>{errors.name.message}</small>}

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
          {...register('basePriceSol', { required: { value: true, message: 'Debe colocar un precio' } })}
        />
      </div>
      {errors.basePriceSol && <small className={stylesInput['error-message']}>{errors.basePriceSol.message}</small>}

      <label className="text-size label" htmlFor="description">
        Descripción del producto
      </label>
      <textarea
        className="textarea font-visby"
        id="description"
        placeholder="Escribe aquí..."
        {...register('description', { required: { value: true, message: 'El campo no puede estar vacio' } })}
      />
      {errors.description && <small className={stylesInput['error-message']}>{errors.description.message}</small>}

      <label className="text-size label">Añadir imagen del producto</label>
      <div>
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
              <Image
                width={imageUrl ? 300 : 40}
                height={imageUrl ? 200 : 40}
                objectFit="contain"
                src={imageUrl || 'https://img.icons8.com/ios/100/image.png'}
                alt="Imagen del producto"
              />
            </figure>
            <span className={stylesInput.label}>{imageFile?.name ? 'Cambiar imagen' : 'Añadir imagen'}</span>
            <span className={stylesInput.label}>*Max 8MB Size</span>
          </label>
        </div>
      </div>
      {errors.imageUrl && <small className={stylesInput['error-message']}>{errors.imageUrl.message}</small>}

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
