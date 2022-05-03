import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import PasswordInput from '../Shared/Form/PasswordInput'
import SubmitButton from '../Shared/Form/SubmitButton'
import TextInput from '../Shared/Form/TextInput'
import styles from './Login.module.scss'
import { GET_USER_SESSION } from '../../services/GraphQL/queries/users'

type Inputs = {
  username: string
  password: string
}

const LoginForm = () => {
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
      <h1>Ingresa a DID Peru</h1>
      <TextInput placeholder="Usuario" {...register('username', { required: true })} />
      {errors.username && <p className={styles.error}>El usuario es requerido</p>}
      <PasswordInput placeholder="Contraseña" {...register('password', { required: true })} />
      {errors.password && <p className={styles.error}>La contraseña es requerida</p>}
      <SubmitButton isLoading={loading} disabled={loading} text="Ingresar" />
    </form>
  )
}

export default LoginForm
