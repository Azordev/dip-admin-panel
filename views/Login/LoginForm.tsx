import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { LoginFormProps, LoginInput } from '@/services/GraphQL/users/types'

import PasswordInput from '../Shared/Form/PasswordInput'
import SubmitButton from '../Shared/Form/SubmitButton'
import TextInput from '../Shared/Form/TextInput'

import styles from './Login.module.scss'

const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      memberCode: '',
      password: '',
    },
  })

  const submitHandler = handleSubmit(onSubmit)

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className={`text-lg ${styles.title}`}>PANEL ADMINISTRATIVO</h1>
      <TextInput
        placeholder="Usuario"
        {...register('memberCode', {
          required: true,
        })}
      />
      {errors.memberCode && <small className={styles.error}>El código es requerido</small>}
      <PasswordInput placeholder="Contraseña" {...register('password', { required: true })} />
      {errors.password && <small className={styles.error}>La contraseña es requerida</small>}
      <SubmitButton isLoading={loading} disabled={loading} text="Ingresar" />
    </form>
  )
}

export default LoginForm
