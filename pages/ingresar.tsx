import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Login from '@/views/Login'
import ClientOnly from '@/views/Shared/ClientOnly'
import { useSession } from 'next-auth/react'

const LoginPage: NextPage = () => {
  const { push } = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session && status === 'authenticated') {
      push('/eventos')
    }
  }, [push, session, status])
  return (
    <ClientOnly>
      <Login />
    </ClientOnly>
  )
}

export default LoginPage
