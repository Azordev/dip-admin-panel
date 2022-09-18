import { ChangeEvent, FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import style from '@/components/Button/Button.module.scss'
import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'

import styles from './Form.module.scss'

const CreateUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const today = new Date().toISOString().split('T')[0]

    if (e.target.value < today) {
      setError('startDate', { message: 'Fecha invalida' })
    } else {
      setError('startDate', { message: '' })
    }
  }
  const buttonText = loading ? 'Añadiendo' : 'Añadir'
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
                {...register('namePartner', { required: { value: true, message: 'El campo no puede estar vacio' } })}
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
                {...register('memberCode', { required: { value: true, message: 'El campo no puede estar vacio' } })}
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
                {...register('startDate', { required: { value: true, message: 'El campo no puede estar vacio' } })}
                onChange={handleDate}
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
                type="email"
                placeholder="Inserte el correo electrónico"
                {...register('email', { required: { value: true, message: 'El campo no puede estar vacio' } })}
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
                {...register('password', { required: { value: true, message: 'El campo no puede estar vacio' } })}
              />
              {errors.password && <small className={styles['error-message']}>{errors.password.message}</small>}
            </div>
          </div>
        </section>
        <section className={style['buttons-container']}>
          <Button iconName="" className={style['button-save']} type="submit">
            {buttonText}
          </Button>
        </section>
      </form>
    </>
  )
}

export default CreateUserForm
