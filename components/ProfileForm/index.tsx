import Image from 'next/image'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Button from '@/components/Button'
import { MutableProviderFormProps, ProviderEditable } from '@/services/GraphQL/providers/types'

import styles from './ProfileForm.module.scss'

const ProfileForm: FC<MutableProviderFormProps> = ({ onSubmit, originalData, loading }) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [imageFile, setImageFile] = useState<File | null>()
  useEffect(() => {
    setValue('commercialName', originalData?.commercialName)
    setValue('salesPhone', originalData?.salesPhone)
    setValue('catalogUrl', originalData?.catalogUrl)
    setValue('logo', originalData?.logoUrl || 'https://img.icons8.com/ios/100/image.png')
    setImageUrl(originalData?.logoUrl)
  }, [
    originalData?.commercialName,
    originalData?.salesPhone,
    originalData?.logoUrl,
    originalData?.catalogUrl,
    setValue,
  ])

  const MAX_FILE_SIZE = 800000
  const handleFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]

    if (file && !file.type.includes('png')) {
      return Swal.fire('Error', 'Solo imagenes en formato PNG son aceptadas', 'error')
    }
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
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles['label-input']}>Logotipo</label>
      <div className={styles['container-input']}>
        <input
          id="image-file"
          type="file"
          accept="image/png"
          className={styles['input-file']}
          {...register('logo')}
          onChange={handleFile}
        />
        <label htmlFor="image-file" className={styles.image}>
          <figure>
            <Image
              width={imageUrl ? 300 : 40}
              height={imageUrl ? 200 : 40}
              objectFit="contain"
              src={imageUrl || 'https://img.icons8.com/ios/100/image.png'}
              alt="Logo del Proveedor"
            />
          </figure>
          <span className={styles.label}>{imageFile?.name ? 'Cambiar imagen' : 'Añadir imagen'}</span>
        </label>
        {errors.logoUrl && <small className={styles['error-message']}>{errors.logoUrl.message}</small>}
      </div>
      <section className={styles.section}>
        <div className={styles['input-section']}>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Nombre de la Marca</label>
            <input
              className={styles.input}
              placeholder="Escriba el nombre de la Marca Comercial"
              id="title"
              type="text"
              {...register('commercialName', { required: { value: true, message: 'El campo no puede estar vacio' } })}
            />
            {errors.commercialName && (
              <small className={styles['error-message']}>{errors.commercialName.message}</small>
            )}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Número de WhatsApp</label>
            <input
              className={styles.input}
              placeholder="Inserte número de WhatsApp del proveedor..."
              id="title"
              type="number"
              {...register('salesPhone', { required: { value: true, message: 'El campo no puede estar vacio' } })}
            />
            {errors.salesPhone && <small className={styles['error-message']}>{errors.salesPhone.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Link del catálogo</label>
            <input
              className={styles.input}
              placeholder="Inserta el enlace de tu catálogo web"
              id="catalogo"
              type="text"
              {...register('catalogUrl', { required: { value: true, message: 'El campo no puede estar vacio' } })}
            />

            {errors.catalogUrl && <small className={styles['error-message']}>{errors.catalogUrl.message}</small>}
          </div>
        </div>
      </section>
      <section className={styles['buttons-container']}>
        <Button iconName="" className={styles['button-cancel']} onClick={() => reset()}>
          Cancelar
        </Button>
        <Button iconName="" className={styles['button-save']} type="submit">
          {loading ? 'Guardando' : 'Guardar'}
        </Button>
      </section>
    </form>
  )
}

export default ProfileForm
