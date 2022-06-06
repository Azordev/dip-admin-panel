import { useLayoutEffect as useEffect } from 'react'
import { NextPage } from 'next'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_SESSION } from '@/services/GraphQL/queries/users'
import { LoginInput } from '@/services/GraphQL/types/users'
import useLogger from '@/hooks/useLogger'
import LoginLayout from './Layout'
import useMagicLink from '@/hooks/useMagicLink'

const Login: NextPage = () => {
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)
  const { log, warn, error } = useLogger()
  const magicLink = useMagicLink()

  useEffect(() => {
    if (data?.users?.length === 1) {
      log('Login:useEffect', 'Usuario encontrado en base de datos, procediendo a verificar sesión...', 'SUCCESS')
      magicLink(data.users[0])
    }
    if (data?.users?.length === 0) {
      warn(
        'Login:useEffect',
        'No se encontró ningún usuario en base de datos, Usuario o contraseña incorrectos...',
        'INPUT',
      )
    }
  }, [data, magicLink, log, warn])

  const onSubmit = async (formData: LoginInput) => {
    const { called, error: requestError } = await checkUserSession({ variables: formData })
    if (requestError) {
      error(requestError, 'Login:onSubmit', 'Error al verificar sesión', 'SERVER_CONNECTION')
    }
    if (!called) {
      warn('Login:onSubmit', 'No se pudo verificar sesión', 'AVAILABILITY')
    }
  }

  return <LoginLayout onSubmit={onSubmit} loading={loading} />
}

export default Login
