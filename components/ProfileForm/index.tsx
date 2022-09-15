import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import { MutableProviderFormProps, ProviderEditable } from '@/services/GraphQL/providers/types'
import Picture from '@/views/SVGs/Picture'

import styles from './ProfileForm.module.scss'

const ProfileForm: FC<MutableProviderFormProps> = ({ onSubmit, originalData }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderEditable>()
  const submitHandler = handleSubmit(onSubmit)
  useEffect(() => {
    setValue('commercialName', originalData?.commercialName)
    setValue('salesPhone', originalData?.salesPhone)
  }, [originalData?.commercialName, originalData?.salesPhone, setValue])
  const { push } = useRouter()

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label className={styles['label-input']}>Logotipo</label>
      <div className={styles['container-input']}>
        <input id="image-file" type="file" accept="image/*" className={styles['input-file']} />
        <label htmlFor="image-file" className={styles.image}>
          <figure>
            <Picture />
          </figure>
          <span className={styles.label}> {'Añadir imagen'} </span>
        </label>
      </div>
      <section className={styles.section}>
        <div className={styles['input-section']}>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Nombre de la marca</label>
            <input
              className={styles.input}
              placeholder="Escriba el nombre del evento"
              id="title"
              type="text"
              {...register('commercialName')}
            />
            {errors.commercialName && <small className="text-red-500">{errors.commercialName.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Número de WhatsApp</label>
            <input
              className={styles.input}
              placeholder="Inserte número de WhatsApp del proveedor..."
              id="title"
              type="text"
              {...register('salesPhone')}
            />
            {errors.salesPhone && <small className="text-red-500">{errors.salesPhone.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Link del catálogo</label>
            <input className={styles.input} placeholder="Inserta el enlace de tu catálogo web" id="title" type="text" />
          </div>
        </div>
      </section>
      <section className={styles['buttons-container']}>
        <Button iconName="" className={styles['button-cancel']} onClick={() => push('/productos')}>
          Cancelar
        </Button>
        <Button iconName="" className={styles['button-save']} type="submit">
          Guardar
        </Button>
      </section>
    </form>
  )
}

export default ProfileForm
