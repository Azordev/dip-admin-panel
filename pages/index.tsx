import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useAuth from '@/hooks/useAuth'

const DIDAdminPanel = () => {
  const router = useRouter()
  const { user, isProvider } = useAuth()
  useEffect(() => {
    if (isProvider) {
      router.push('/productos')
    }
    if (user?.type === 'ADMIN' || user?.type === 'TEST_ADMIN') {
      router.push('/eventos')
    }
  })
}

export default DIDAdminPanel
