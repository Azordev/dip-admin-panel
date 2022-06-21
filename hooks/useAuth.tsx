import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const { push } = useRouter()

  useEffect(() => {
    const unparsedUser = window?.sessionStorage?.getItem('user') ?? null
    if (unparsedUser) {
      setUser(JSON.parse(unparsedUser))
    } else {
      push('/ingresar')
    }
  }, [push])

  const logOut = () => {
    window.sessionStorage.clear()
    push('/ingresar')
  }

  return {
    logOut,
    user,
  }
}

export default useAuth
