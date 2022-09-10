import { useRouter } from 'next/router'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import style from '@/components/Button/Button.module.scss'
import DeleteModal from '@/components/DeleteModal'
import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'

import styles from './Form.module.scss'

const CreateUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading }) => {
  const router = useRouter()
  const showModal = () => {
    DeleteModal('socio', (confirmed: boolean) => {
      if (confirmed) {
        console.log('abrió modal')
      }
    })
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <section className={styles.section}>
          <div className={styles['input-section']}>
            <div className={styles['custom-input']}>
              <label className={styles['label-input']} htmlFor="namePartner">
                Nombre del Socio
              </label>
              <input
                className={styles.input}
                id="namePartner"
                type="text"
                placeholder="Escribe el nombre del socio"
                {...register('namePartner', { required: true })}
              />
              {errors.namePartner && <small className={styles['error-message']}>{errors.namePartner.message}</small>}
            </div>
            <div className={styles['custom-input']}>
              <label className={styles['label-input']} htmlFor="memberCode">
                Código del Socio
              </label>
              <input
                className={styles.input}
                id="memberCode"
                type="text"
                placeholder="Escribe el código del socio"
                {...register('memberCode', { required: true })}
              />
              {errors.memberCode && <small className={styles['error-message']}>{errors.memberCode.message}</small>}
            </div>
            <div className={styles['custom-input']}>
              <label className={styles['label-input']} htmlFor="startDate">
                Fecha de Inicio
              </label>
              <input
                className={styles.input}
                id="startDate"
                type="date"
                placeholder="Escribe el código del socio"
                {...register('startDate', { required: true })}
              />
              {errors.startDate && <small className={styles['error-message']}>{errors.startDate.message}</small>}
            </div>
            <div className={styles['custom-input']}>
              <label className={styles['label-input']} htmlFor="email">
                Correo electrónico
              </label>
              <input
                className={styles.input}
                id="email"
                type="text"
                placeholder="Inserte el correo electrónico"
                {...register('email', { required: true })}
              />
              {errors.email && <small className={styles['error-message']}>{errors.email.message}</small>}
            </div>
            <div className={styles['custom-input']}>
              <label className={styles['label-input']} htmlFor="password">
                Contraseña
              </label>
              <input
                className={styles.input}
                id="password"
                type="password"
                placeholder="Inserte la contraseña del socio"
                {...register('password', { required: true })}
              />
              {errors.password && <small className={styles['error-message']}>{errors.password.message}</small>}
            </div>
          </div>
        </section>
        <section className={style['buttons-container']}>
          <Button iconName="" className={style['button-save']} type="submit">
            Añadir
          </Button>
          <Button iconName="" className={style['button-delete']} onClick={showModal}>
            Eliminar
          </Button>
          {/* TODO: implementar funcionalidad asociada a este botón */}
        </section>
      </form>
    </>
  )
}

export default CreateUserForm
