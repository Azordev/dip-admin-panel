import { useLayoutEffect as useEffect } from 'react'
import { NextPage } from 'next'
import { useLazyQuery } from '@apollo/client'
import { GET_USER_SESSION } from '@/services/GraphQL/queries/users'
import { LoginInput } from '@/services/GraphQL/types/users'
import useLogger from '@/hooks/useLogger'
import useMagicLink from '@/hooks/useMagicLink'
import LoginLayout from './Layout'

const Login: NextPage = () => {
  const [checkUserSession, { loading, data }] = useLazyQuery(GET_USER_SESSION)
  const { log, warn, error } = useLogger()
  const magicLink = useMagicLink()

  useEffect(() => {
    if (data?.users?.length === 0) {
      warn(
        'Login:useEffect',
        'No se encontró ningún usuario en base de datos, Usuario o contraseña incorrectos...',
        'INPUT',
      )
    } else {
      if (data?.users?.length > 1) {
        warn(
          'Login:useEffect',
          'Se encontraron varios usuarios en base de datos, usando el primer email. Informe al servicio técnico del incidente...',
          'INPUT',
        )
      }
      log('Login:useEffect', 'Usuario encontrado en base de datos, procediendo a verificar sesión...', 'SUCCESS')
      if (data.users[0]?.is_active && data.users[0]?.member_information?.email) {
        magicLink(data.users[0])
      } else {
        warn('Login:useEffect', 'Usuario no activo, contactar con el administrador...', 'AUTHORIZATION')
      }
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
