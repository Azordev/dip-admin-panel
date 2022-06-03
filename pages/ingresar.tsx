import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Login from '@/views/Login'

const LoginPage: NextPage = () => {
  const { push } = useRouter()

  useEffect(() => {
    if (window.sessionStorage.getItem('userId')) {
      push('/eventos')
    }
  }, [push])
  return <Login />
}

export default LoginPage
