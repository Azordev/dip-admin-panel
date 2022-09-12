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
          required
        >
          {errors.commercialName && <span>El nombre es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="date"
          placeholder="DD/MM/AA"
          label="Fecha de inicio"
          register={register}
          name="createdAt"
          required
          type="date"
        >
          {errors.createdAt && <span>La fecha de inicio es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="userName"
          placeholder="Escriba el usuario"
          label="Usuario"
          register={register}
          name="memberCode"
          required
        >
          {errors.memberCode && <span>El nombre de usuario es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="email"
          placeholder="Escriba el correo"
          label="Correo Electrónico"
          register={register}
          name="salesEmail"
          required
          type="email"
        >
          {errors.salesEmail && <span>El correo es requerido.</span>}
        </CustomInput>
      </div>
      <div className={styles['input-container']}>
        <CustomInput
          id="password"
          placeholder="Escriba la contraseña"
          label="Contraseña"
          register={register}
          name="password"
          required
          type="password"
        >
          {errors.password && <span>La contraseña es requerida</span>}
        </CustomInput>
      </div>
      <div className={btnStyles['buttons-container']}>
        <Button type="submit" className={btnStyles['button-save']}>
          {buttonText}
        </Button>
        <Button type="button" className={btnStyles['button-delete']}>
          Eliminar
        </Button>
      </div>
    </form>
  )
}

export default CreateProviderForm
