import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Login from '@/views/Login'
import ClientOnly from '@/views/Shared/ClientOnly'

const LoginPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const user = window.sessionStorage.getItem('user')

    if (user) {
      router.push('/')
    }
  }, [router])
  return (
    <ClientOnly>
      <Login />
    </ClientOnly>
  )
}

export default LoginPage
