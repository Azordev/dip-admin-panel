import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { LoginInput } from '@/services/GraphQL/types/users'
import PasswordInput from '../Shared/Form/PasswordInput'
import SubmitButton from '../Shared/Form/SubmitButton'
import TextInput from '../Shared/Form/TextInput'
import styles from './Login.module.scss'

interface LoginFormProps {
  onSubmit: (formData: LoginInput) => void
  loading: boolean
}
const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const submitHandler = handleSubmit(onSubmit)

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h1 className={`text-lg ${styles.title}`}>Ingresa a DID Peru - Portal de Administrador</h1>
      <TextInput
        placeholder="Usuario"
        {...register('username', {
          required: true,
        })}
      />
      {errors.username && <small className={styles.error}>El usuario es requerido</small>}
      <PasswordInput placeholder="Contraseña" {...register('password', { required: true })} />
      {errors.password && <small className={styles.error}>La contraseña es requerida</small>}
      <SubmitButton isLoading={loading} disabled={loading} text="Ingresar" />
    </form>
  )
}

export default LoginForm
