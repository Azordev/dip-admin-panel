import { useRouter } from 'next/router'
import { useEffect } from 'react'

import useAuth from '@/hooks/useAuth'

const DIDAdminPanel = () => {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    if (user?.type === 'ADMIN') {
      router.push('/eventos')
    } else if (user?.type === 'PROVIDER') {
      router.push('/productos')
    }
  })
}

export default DIDAdminPanel
