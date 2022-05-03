import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import PasswordInput from '../Shared/Form/PasswordInput'
import SubmitButton from '../Shared/Form/SubmitButton'
import TextInput from '../Shared/Form/TextInput'
import styles from './Login.module.scss'
import { GET_USER_SESSION } from '../../services/GraphQL/queries/users'
import { NextPage } from 'next'

type Inputs = {
  username: string
  password: string
}

const LoginForm: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)

  const onSubmit = handleSubmit(async formData => {
    const { called, error } = await checkUserSession({ variables: formData })
    if (called) {
      console.log(data, error)
      if (error) {
        console.log(error)
        toast('Error al iniciar sesión', { type: 'error' })
      }

      if (!data || data?.users?.length === 0) {
        toast('Usuario o contraseña incorrectos', { type: 'error' })
      }
      if (data?.users?.length > 0) {
        router.push('/eventos/')
      }
    }
  })

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={`text-lg ${styles.title}`}>Ingresa a DID Peru</h1>
      <TextInput placeholder="Código de socio" {...register('username', { required: true })} />
      {errors.username && <small className={styles.error}>El usuario es requerido</small>}
      <PasswordInput placeholder="Contraseña" {...register('password', { required: true })} />
      {errors.password && <small className={styles.error}>La contraseña es requerida</small>}
      <SubmitButton isLoading={loading} disabled={loading} text="Ingresar" />
      <p className={styles.contact}>
        ¿Deseas asociarte a DID Perú? Escribe a
        <a href="mailto:example@email.com" target="_blank" rel="noopener noreferrer">
          example@email.com
        </a>
      </p>
    </form>
  )
}

export default LoginForm
