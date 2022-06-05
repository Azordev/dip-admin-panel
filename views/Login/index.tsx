import { useLayoutEffect as useEffect } from 'react'
import { NextPage } from 'next'
import { useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { GET_USER_SESSION } from '@/services/GraphQL/queries/users'
import { LoginInput } from '@/services/GraphQL/types/users'
import useError from '@/hooks/useError'
import LoginLayout from './Layout'
import useMagicLink from '@/hooks/useMagicLink'

const Login: NextPage = () => {
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)
  const [logError] = useError()
  const magicLink = useMagicLink()

  useEffect(() => {
    if (data?.users?.length === 1) {
      magicLink(data.users[0])
    }
    if (data?.users?.length === 0) {
      toast.error('Usuario o contraseña incorrectos')
    }
  }, [data, magicLink])

  const onSubmit = async (formData: LoginInput) => {
    const { called, error } = await checkUserSession({ variables: formData })
    if (error) {
      logError(error, 'views::Login::L28', 'UNEXPECTED')
      toast.error('Error al iniciar sesión')
    }
    if (!called) {
      logError(Error('Unexpected state'), 'views::Login::L32', 'UNEXPECTED')
    }
    toast.success('Usuario encontrado en base de datos, procediendo a verificar sesión...', {
      theme: 'colored',
    })
  }

  return <LoginLayout onSubmit={onSubmit} loading={loading} />
}

export default Login
