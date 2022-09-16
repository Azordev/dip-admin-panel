import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/Button'
import CustomInput from '@/components/CustomInput'
import CustomSwitch from '@/components/CustomSwitch'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/EditEvent.module.scss'
import Icons8 from '@/views/Shared/Icons8'
import Picture from '@/views/SVGs/Picture'

export interface EventEditableWithFiles extends EventEditable {
  image?: FileList
  pdf?: FileList
}

const CreateEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditableWithFiles>()
  const submitHandler = handleSubmit(onSubmit as unknown as SubmitHandler<EventEditableWithFiles>)
  const router = useRouter()
  const buttonText = loading ? 'Guardando' : 'Guardar'
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [type, setType] = useState<string | undefined>('WORKSHOP')

  useEffect(() => {
    setValue('type', 'WORKSHOP')
    setType(getValues().type)
  }, [getValues, setValue])

  const handleChange = (isCheck: boolean) => {
    if (isCheck) {
      setValue('type', 'WORKSHOP')
      setType(getValues().type as string)
      return
    }
    setValue('type', 'ATTENDANCE')
    setType(getValues().type as string)
  }

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
      return
    }

    if (file?.type.includes('pdf')) {
      setPdfFile(file)
      return
    }

    setImageFile(null)
    setImageUrl(null)
    setPdfFile(null)
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <section className={styles.section}>
        <div className={styles['input-section']}>
          <CustomInput
            name="title"
            label="Nombre del evento"
            register={register}
            id="title"
            type="text"
            placeholder="Escriba el nombre del evento"
            defaultValue=""
            required={true}
          >
            {errors.title && <small className={styles['error-message']}>{errors.title.message}</small>}
          </CustomInput>
          <CustomInput
            name="date"
            label="Fecha del evento"
            register={register}
            id="date"
            type="date"
            placeholder="DD/MM/AAAA"
            required={true}
          />
        </div>
        <div className={styles['image-section']}>
          <div className={styles['container-input']}>
            <input
              id="image-file"
              type="file"
              accept="image/*"
              className={styles['input-file']}
              {...register('image')}
              onChange={handleFile}
            />
            <label htmlFor="image-file" className={styles.image}>
              <figure>
                {imageUrl ? (
                  <Image width={300} height={200} objectFit="contain" src={imageUrl} alt="Imagen del evento" />
                ) : (
                  <Picture />
                )}
              </figure>
              <span className={styles.label}>{imageFile?.name ? 'Cambiar imagen' : 'Añadir imagen'}</span>
            </label>
          </div>
        </div>
      </section>
      <label htmlFor="description" className={styles['label-title']}>
        Descripción del evento
      </label>
      <textarea
        id="description"
        placeholder="Escribe aquí..."
        className={styles.textarea}
        defaultValue=""
        {...register('description', { required: false })}
      ></textarea>
      <div className={styles['switch-section']}>
        <CustomSwitch
          isChecked={type === 'WORKSHOP'}
          onChange={handleChange}
          firstLabel="Evento"
          secondLabel="Convocatoria"
          size="xl"
        />
      </div>
      <label htmlFor="pdf" className={styles['label-title']}>
        Añadir PDF
      </label>
      <div className={styles['container-input']}>
        <input
          type="file"
          id="pdf-file"
          className={styles['input-file']}
          accept="application/pdf"
          {...register('pdf', { required: false })}
          onChange={handleFile}
        />
        <label htmlFor="pdf-file" className={styles.pdf}>
          <figure>
            <Icons8 name="installing-updates" iconStyle="ios" size={35} className={styles['btn-icon']} />
          </figure>
          <span className={styles.label}>{pdfFile?.name ? `${pdfFile?.name}` : 'Añadir PDF'}</span>
        </label>
      </div>
      <section className={styles['buttons-container']}>
        <Button className={styles['button-cancel']} onClick={() => router.push('/eventos')}>
          Cancelar
        </Button>
        <Button className={styles['button-save']} type="submit">
          {buttonText}
        </Button>
      </section>
    </form>
  )
}

export default CreateEventForm
