import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { GET_USER_SESSION } from '../../services/GraphQL/queries/users'
import { NextPage } from 'next'
import { LoginInput } from '../../services/GraphQL/types/users'
import LoginLayout from './Layout'
import UseError from '../../hooks/useError'

const Login: NextPage = () => {
  const router = useRouter()
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)
  const [createError] = UseError()

  const onSubmit = async (formData: LoginInput) => {
    const { called, error } = await checkUserSession({ variables: formData })
    if (error) {
      createError({
        variables: {
          error: JSON.stringify(error),
          origin: 'ADMIN',
          type: 'UNEXPECTED',
          codeLocation: 'views::Login::L18',
        },
      })
      toast('Error al iniciar sesión', { type: 'error' })
    }
    if (called) {
      if (!data || data?.users?.length === 0) {
        toast('Usuario o contraseña incorrectos', { type: 'error' })
      }
      if (data?.users?.length > 0) {
        router.push('/eventos/')
      }
      createError({
        variables: {
          error: `Unexpected state:\n${JSON.stringify(data)}`,
          origin: 'ADMIN',
          type: 'UNEXPECTED',
          codeLocation: 'views::Login::L40',
        },
      })
    }
  }

  return <LoginLayout onSubmit={onSubmit} loading={loading} />
}

export default Login
