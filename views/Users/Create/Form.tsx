import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'
import styles from '@/styles/FormPartners.module.css'
const CreateUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)

  return (
    <>
      <form className={styles['form-container']} onSubmit={submitHandler}>
        <label className={styles.label} htmlFor="namePartner">
          Nombre del Socio
        </label>
        <input
          className={styles.input}
          id="namePartner"
          type="text"
          placeholder="Escribe el nombre del socio"
          {...register('namePartner', { required: true })}
        />
        {errors.namePartner && <small className="text-red-100">{errors.namePartner.message}</small>}

        <label className={styles.label} htmlFor="memberCode">
          Código del Socio
        </label>
        <input
          className={styles.input}
          id="memberCode"
          type="text"
          placeholder="member_code"
          {...register('memberCode', { required: true })}
        />
        {errors.memberCode && <small className="text-red-100">{errors.memberCode.message}</small>}

        <label className={styles.label} htmlFor="startDate">
          Fecha de Inicio
        </label>
        <input className={styles.input} id="startDate" type="date" {...register('startDate', { required: true })} />
        {errors.startDate && <small className="text-red-100">{errors.startDate.message}</small>}

        <label className={styles.label} htmlFor="email">
          Correo electrónico
        </label>
        <input
          className={styles.input}
          id="email"
          type="text"
          placeholder="Inserte el correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <small className="text-red-500">{errors.email.message}</small>}

        <label className={styles.label} htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="Inserte la contraseña del socio"
          {...register('password')}
        />
        {errors.password && <small className="text-red-500">{errors.password.message}</small>}

        <div className={styles['button-container']}>
          <button className={styles.add} type="submit">
            Añadir
          </button>

          <button className={styles.delete} type="submit">
            Eliminar
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateUserForm
