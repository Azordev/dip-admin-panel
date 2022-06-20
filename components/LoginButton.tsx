import { signIn, signOut, useSession } from 'next-auth/react'

import Button from '@/views/Shared/Button'

const LoginButton = () => {
  const { data: session } = useSession()

  const icon = session ? 'exit' : 'login-rounded-right--v1'
  const text = session ? 'Salir' : 'Ingresar'

  return (
    <Button icon={icon} onClick={() => (session ? signOut() : signIn())}>
      {text}
    </Button>
  )
}

export default LoginButton
