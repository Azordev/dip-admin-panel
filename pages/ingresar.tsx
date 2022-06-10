import { NextPage } from 'next'
import Login from '@/views/Login'
import ClientOnly from '@/views/Shared/ClientOnly'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
