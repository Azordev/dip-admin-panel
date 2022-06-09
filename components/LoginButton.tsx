import Button from '@/views/Shared/Button'
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()

  const icon = session ? 'logout-rounded-right--v1' : 'login-rounded-right--v1'
  const text = session ? 'Salir' : 'Ingresar'

  return (
    <Button icon={icon} onClick={() => (session ? signOut() : signIn())}>
      {text}
    </Button>
  )
}

export default LoginButton
