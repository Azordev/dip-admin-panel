import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [isProvider, setIsProvider] = useState<boolean>(false)
  const { push } = useRouter()

  useEffect(() => {
    const unparsedUser = window?.sessionStorage?.getItem('user') ?? null
    const providerId = window?.sessionStorage?.getItem('providerId')
    if (unparsedUser) {
      setUser(JSON.parse(unparsedUser))
      setIsProvider(!!providerId)
    } else {
      push('/ingresar')
    }
  }, [push])

  const logOut = () => {
    window.sessionStorage.clear()
    push('/ingresar')
  }

  return {
    isProvider,
    logOut,
    user,
  }
}

export default useAuth
