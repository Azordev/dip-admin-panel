import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { GET_USER_SESSION } from '../../services/GraphQL/queries/users'
import { NextPage } from 'next'
import { LoginInput } from '../../services/GraphQL/types/users'
import LoginLayout from './Layout'
import UseError from '../../hooks/useError'
import { useLayoutEffect } from 'react'

const Login: NextPage = () => {
  const router = useRouter()
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)
  const [createError] = UseError()

  useLayoutEffect(() => {
    if (data?.users?.length === 1) {
      window.sessionStorage.setItem('userId', data.users[0].id)
      window.sessionStorage.setItem('user', JSON.stringify(data.users[0]))
      router.push('/eventos/')
    }
    if (data?.users?.length === 0) {
      toast('Usuario o contraseña incorrectos', { type: 'error' })
    }
  }, [data, router])

  const onSubmit = async (formData: LoginInput) => {
    const { called, error } = await checkUserSession({ variables: formData })
    if (error) {
      createError({
        variables: {
          error: JSON.stringify(error),
          origin: 'ADMIN',
          type: 'UNEXPECTED',
          codeLocation: 'views::Login::L30',
        },
      })
      toast('Error al iniciar sesión', { type: 'error' })
    }
    if (!called) {
      createError({
        variables: {
          error: 'Unexpected state',
          origin: 'ADMIN',
          type: 'UNEXPECTED',
          codeLocation: 'views::Login::L41',
        },
      })
    }
  }

  return <LoginLayout onSubmit={onSubmit} loading={loading} />
}

export default Login
