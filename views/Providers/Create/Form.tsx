import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import btnStyles from '@/components/Button/Button.module.scss'
import CustomInput from '@/components/CustomInput'
import { MutableProviderUserFormProps, ProviderUserEditable } from '@/services/GraphQL/users/types'

import styles from './ProviderCreateForm.module.scss'

const CreateProviderForm: FC<MutableProviderUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderUserEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Añadiendo' : 'Añadir'

  return (
    <form onSubmit={submitHandler} className={styles.container} noValidate>
      <div className={styles['input-container']}>
        <CustomInput
          id="name"
          placeholder="Escriba el nombre de la empresa"
          label="Nombre de la empresa"
          register={register}
          name="commercialName"
        >
          {errors.commercialName && <span className={styles['error-message']}>El nombre es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="date"
          placeholder="DD/MM/AA"
          label="Fecha de inicio"
          register={register}
          name="createdAt"
          type="date"
        >
          {errors.createdAt && <span className={styles['error-message']}>La fecha de inicio es requerida.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="userName"
          placeholder="Escriba el usuario"
          label="Usuario"
          register={register}
          name="memberCode"
        >
          {errors.memberCode && <span className={styles['error-message']}>El nombre de usuario es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="email"
          placeholder="Escriba el correo"
          label="Correo Electrónico"
          register={register}
          name="salesEmail"
          type="email"
        >
          {errors.salesEmail && <span className={styles['error-message']}>El correo es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="password"
          placeholder="Escriba la contraseña"
          label="Contraseña"
          register={register}
          name="password"
          type="password"
        >
          {errors.password && <span className={styles['error-message']}>La contraseña es requerida</span>}
        </CustomInput>
      </div>
      <div className={btnStyles['buttons-container']}>
        <Button type="submit" className={btnStyles['button-save']}>
          {buttonText}
        </Button>
        <button onClick={() => reset()} className={`${btnStyles['button-delete']} delete`}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default CreateProviderForm
