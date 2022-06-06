import { useSession } from 'next-auth/react'
import LoginButton from '@/components/LoginButton'

const DIDAdminPanel = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <h1>DID Admin Panel</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'unauthenticated' && <LoginButton />}
      {status === 'authenticated' && (
        <>
          <p>Signed in as {session.user?.email}</p>
        </>
      )}
    </div>
  )
}

export default DIDAdminPanel
