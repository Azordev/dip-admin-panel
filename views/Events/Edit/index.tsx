import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/Button'
import CustomInput from '@/components/CustomInput'
import CustomSwitch from '@/components/CustomSwitch'
import DeleteModal from '@/components/DeleteModal'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'
import styles from '@/styles/EditEvent.module.scss'
import Icons8 from '@/views/Shared/Icons8'

export interface EventEditableWithFiles extends EventEditable {
  image?: FileList
  pdf?: FileList
}

const EditEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading, originalData: originalEvent }) => {
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
  const [type, setType] = useState(originalEvent?.type)

  useEffect(() => {
    setValue('type', 'ATTENDANCE')
    setValue('date', originalEvent?.date.slice(0, 19) as string)
    setValue('description', originalEvent?.description)
    setValue('title', originalEvent?.title)
    setType(getValues('type'))
  }, [originalEvent?.date, originalEvent?.description, originalEvent?.title, setValue, getValues])

  const handleChange = (isCheck: any) => {
    if (isCheck) {
      setValue('type', 'WORKSHOP')
      setValue('title', originalEvent?.title)
      setValue('description', originalEvent?.description)
      setType(getValues().type)
      return
    }
    setValue('type', 'ATTENDANCE')
    setType(getValues().type)
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

  const handleAsistentes = () => {
    // TODO: implementación del botón de asistentes
  }

  const showModal = () => {
    DeleteModal('evento', (confirmed: boolean) => {
      if (confirmed) {
        // Add petition Delete
      }
    })
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Button
        onClick={handleAsistentes}
        className={styles.button}
        withIcon
        iconStyle="material"
        iconName="user-group-man-man--v1"
        iconSize={40}
      >
        Asistentes
      </Button>
      <section className={styles.section}>
        <div className={styles['input-section']}>
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
                <Image
                  width={imageUrl || originalEvent?.imageUrl ? 300 : 40}
                  height={imageUrl || originalEvent?.imageUrl ? 200 : 40}
                  objectFit="contain"
                  src={imageUrl || originalEvent?.imageUrl || 'https://img.icons8.com/ios/100/image.png'}
                  alt="Imagen del evento"
                />
              </figure>
              <span className={styles.label}>
                {imageFile?.name || originalEvent?.imageUrl ? 'Cambiar imagen' : 'Añadir imagen'}
              </span>
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
        defaultValue={originalEvent?.description}
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
        <Button iconName="" className={styles['button-cancel']} onClick={() => router.push('/eventos')}>
          Cancelar
        </Button>
        <Button iconName="" className={styles['button-save']} type="submit">
          {buttonText}
        </Button>
        {/* TODO: implementar funcionalidad asociada a este botón */}
        <Button iconName="" className={styles['button-delete']} onClick={showModal}>
          Eliminar
        </Button>
      </section>
    </form>
  )
}

export default EditEventForm
