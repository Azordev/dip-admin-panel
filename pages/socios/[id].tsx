import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { USER_BY_ID } from '@/services/GraphQL/users/queries'
import ClientOnly from '@/views/Shared/ClientOnly'
import UserDetail from '@/views/Users/Detail'

const User: NextPage = () => {
  const { push, query } = useRouter()
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(USER_BY_ID, {
    variables: { id: query.id },
  })
  const { error: logError } = useLogger()

  if (queryError) {
    logError(queryError, 'pages/socios/[id].tsx', 'useQuery(USER_BY_ID)', 'UNEXPECTED')
    push('/socios')
  }

  if (loading) return <Loading className="center-text" />
  if (!data || !data.user) return <EmptyItem text="El usuario esta vacío o es invalido." />

  return (
    <ClientOnly>
      <UserDetail user={data.user} />
    </ClientOnly>
  )
}

export default User
