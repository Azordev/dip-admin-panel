import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/Button'
import CustomInput from '@/components/CustomInput'
import CustomSwitch from '@/components/CustomSwitch'
import { EventEditable } from '@/services/GraphQL/events/types'
import styles from '@/styles/EditEvent.module.scss'
import Icons8 from '@/views/Shared/Icons8'
import Picture from '@/views/SVGs/Picture'

export interface EventEditableWithFiles extends EventEditable {
  image?: FileList
  pdf?: FileList
  time?: string
}

const CreateEventForm: FC<{
  onSubmit: (_data: EventEditableWithFiles, _e: FormEvent<HTMLFormElement>) => void
  loading: boolean
}> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditableWithFiles>()

  const submitHandler = handleSubmit(onSubmit as unknown as SubmitHandler<EventEditableWithFiles>)
  const router = useRouter()
  const buttonText = loading ? 'Guardando' : 'Guardar'
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isWorkshop, setIsWorkshop] = useState<boolean>(false)

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
          <label htmlFor="date" className={styles['label-title']}>
            Fecha del evento
          </label>
          <div className={styles['datetime-container']}>
            <input
              className={styles['input-date']}
              {...register('date', { required: true })}
              id="date"
              type="date"
              placeholder="Escriba la fecha del evento"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
            <input
              className={styles['input-time']}
              {...register('time', { required: true })}
              id="time"
              type="time"
              placeholder="Escriba la hora del evento"
              defaultValue={new Date().toLocaleTimeString('es-Es').slice(0, -3)}
            />
          </div>
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
          register={register}
          name="type"
          isChecked={isWorkshop}
          onChange={() => setIsWorkshop(prevValue => !prevValue)}
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
