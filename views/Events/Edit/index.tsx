import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import CustomInput from '@/components/CustomInput'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/EditEvent.module.css'

const EditEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading, originalData: originalEvent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleAsistentes = () => {
    // TODO: implementar funcionalidad asociada a este botón
  }

  const handleImage = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length) {
      const file = evt.target.files[0]
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
    setImageFile(null)
    setImageUrl(null)
  }

  return (
    <>
      <Button onClick={handleAsistentes} className={styles.button} withIcon iconName="user-group-man-man" iconSize={30}>
        Asistentes
      </Button>
      <form onSubmit={submitHandler} className={styles.form}>
        <section className={styles.section}>
          <div className={styles.inputSection}>
            <CustomInput
              name="title"
              label="Nombre del evento"
              register={register}
              id="title"
              type="text"
              placeholder="Escriba el nombre del evento"
              defaultValue={originalEvent?.title}
              required="El nombre del evento es obligatorio"
            >
              {errors.title && <small className={styles['error-message']}>{errors.title.message}</small>}
            </CustomInput>
            <CustomInput
              name="date"
              label="Fecha del evento"
              register={register}
              id="date"
              type="datetime-local"
              placeholder="Escriba la fecha del evento"
              defaultValue={originalEvent?.date.slice(0, 19) as string}
            />
          </div>
          <div className={styles.imageSection}>
            <div className={styles['container-input']}>
              <input
                type="file"
                accept="image/*"
                className={styles.inputfile}
                {...register('imageUrl')}
                onChange={handleImage}
              />
              <label htmlFor="file-5">
                <figure>
                  <Image
                    width={imageUrl || originalEvent?.imageUrl ? 300 : 40}
                    height={imageUrl || originalEvent?.imageUrl ? 200 : 40}
                    objectFit="contain"
                    src={imageUrl || originalEvent?.imageUrl || 'https://img.icons8.com/ios/100/image.png'}
                    alt="Imagen del evento"
                  />
                </figure>
                <span className={styles.label}>
                  {imageFile?.name || originalEvent?.imageUrl ? 'Cambiar imagen' : 'Agregar imagen'}
                </span>
              </label>
            </div>
          </div>
        </section>
        <label htmlFor="description" className={styles.labelTitle}>
          Descripción del evento
        </label>
        <textarea
          id="description"
          placeholder="Descripción"
          className={styles.textarea}
          defaultValue={originalEvent?.description}
          {...register('description', { required: false })}
        ></textarea>
        <select defaultValue={originalEvent?.type ?? ''} {...register('type', { required: true })}>
          <option value="ATTENDANCE" selected={originalEvent?.type === 'ATTENDANCE'}>
            Evento
          </option>
          <option value="WORKSHOP" selected={originalEvent?.type === 'WORKSHOP'}>
            Convocatoria
          </option>
        </select>
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default EditEventForm
